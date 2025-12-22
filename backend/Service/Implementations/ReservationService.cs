using backend.Data;
using backend.DTO;
using backend.Model;
using backend.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Service.Implementations
{
    public class ReservationService : IReservationService
    {
        private readonly AppDbContext _db;
        private readonly ILogger<ReservationService> _log;

        public ReservationService(AppDbContext db, ILogger<ReservationService> log)
        {
            _db = db;
            _log = log;
        }
        private static string GenerateHexId()
        {
            long time = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            string hexTime = time.ToString("X");

            string random = Random.Shared.Next(0, int.MaxValue).ToString("X");

            return $"{hexTime}{random}";
        }

        public async Task<IEnumerable<ReservationDto>> GetAllAsync()
        {
            return await _db.Reservations.AsNoTracking()
               .Select(r => new ReservationDto
               {
                   Id = r.Id,
                   UserId = r.UserId,
                   ShowtimeId = r.ShowtimeId,
                   ReservationTime = r.ReservationTime,
                   StatusId = r.StatusId,
                   StatusValue = MapStatus(r.StatusId),
                   TotalPrice = r.TotalPrice,
                   Paid = r.Paid,
                   Seats = r.Seats.Select(s => new SeatDto
                   {
                       Id = s.Id,
                       ShowtimeId = s.ShowtimeId,
                       SeatNumber = s.SeatNumber,
                       IsReserved = s.IsReserved
                   }).ToList()
               }).ToListAsync();
        }
        public async Task<ReservationDto?> GetByIdAsync(string id)
        {
            var reservation = await _db.Reservations
        .AsNoTracking()
        .Where(r => r.Id == id)
        .Select(r => new ReservationDto
        {
            Id = r.Id,
            UserId = r.UserId,
            ShowtimeId = r.ShowtimeId,
            ReservationTime = r.ReservationTime,
            StatusId = r.StatusId,
            StatusValue = MapStatus(r.StatusId),
            TotalPrice = r.TotalPrice,
            Paid = r.Paid,
            Seats = r.Seats.Select(s => new SeatDto
            {
                Id = s.Id,
                ShowtimeId = s.ShowtimeId,
                SeatNumber = s.SeatNumber,
                IsReserved = s.IsReserved
            }).ToList()
        })
        .FirstOrDefaultAsync();

            return reservation;
        }
        public async Task<ReservationDto?> CreateReservationAsync(ReservationRequestDto dto)
        {
            if (dto.UserId <= 0)
                throw new Exception("UserId cannot be null");

            var user = await _db.Users.FindAsync(dto.UserId);
            if (user == null)
                throw new Exception("User not found");

            var showtime = await _db.Showtimes.FindAsync(dto.ShowtimeId);
            if (showtime == null)
                throw new Exception("Showtime not found");

            if (dto.SeatIds == null || dto.SeatIds.Count == 0)
                throw new ArgumentException("At least one seat must be selected", nameof(dto.SeatIds));

            await using var tx = await _db.Database.BeginTransactionAsync(System.Data.IsolationLevel.ReadCommitted);

        
            var distinctSeatIds = dto.SeatIds.Distinct().ToList();
            if (distinctSeatIds.Count != dto.SeatIds.Count)
                throw new ArgumentException("Duplicate seat ids in request");

            var idsCsv = string.Join(", ", distinctSeatIds);

            var sql = $"SELECT * FROM seat WHERE id IN ({idsCsv}) AND showtime_id = {{0}} FOR UPDATE";
            var seats = await _db.Seats
                                 .FromSqlRaw(sql, dto.ShowtimeId)
                                 .ToListAsync();

            if (seats.Count != distinctSeatIds.Count)
            {
                var foundIds = seats.Select(s => s.Id).ToHashSet();
                var notFound = distinctSeatIds.Where(id => !foundIds.Contains(id)).ToList();
                throw new KeyNotFoundException($"Seats not found with IDs: {string.Join(", ", notFound)}");
            }
            var wrong = seats.Where(s => s.ShowtimeId != dto.ShowtimeId).ToList();
            if (wrong.Any())
            {
                var wrongNums = string.Join(", ", wrong.Select(s => s.SeatNumber));
                throw new ArgumentException($"Seats {wrongNums} do not belong to the requested showtime");
            }

            var alreadyReserved = seats.Where(s => s.IsReserved).ToList();
            if (alreadyReserved.Any())
            {
                var reservedNums = string.Join(", ", alreadyReserved.Select(s => s.SeatNumber));
                throw new InvalidOperationException($"Seats already reserved: {reservedNums}");
            }

       
            var reservation = new Reservation
            {
                Id = GenerateHexId(),
                UserId = dto.UserId,
                ShowtimeId = dto.ShowtimeId,
                ReservationTime = DateTime.Now,
                StatusId = 1, 
                TotalPrice = showtime.Price * seats.Count,
                Paid = false
            };

            _db.Reservations.Add(reservation);
            await _db.SaveChangesAsync(); 


            foreach (var seat in seats)
            {
                seat.IsReserved = true;
                seat.ReservationId = reservation.Id;
                _db.Seats.Update(seat);
            }

            showtime.AvailableSeats -= seats.Count;
            _db.Showtimes.Update(showtime);

            await _db.SaveChangesAsync();

            await tx.CommitAsync();

            var reservationDto = new ReservationDto
            {
                Id = reservation.Id,
                UserId = reservation.UserId,
                ShowtimeId = reservation.ShowtimeId,
                ReservationTime = reservation.ReservationTime,
                StatusId = reservation.StatusId,
                StatusValue = MapStatus(reservation.StatusId),
                TotalPrice = reservation.TotalPrice,
                Paid = reservation.Paid,

                Seats = seats.Select(s => new SeatDto
                {
                    Id = s.Id,
                     ShowtimeId = s.ShowtimeId,
                    SeatNumber = s.SeatNumber,
                    IsReserved = s.IsReserved
                }).ToList()
            };

            return reservationDto;
        }

        public async Task<bool> ConfirmReservationAsync(string reservationId)
        {
            var reservation = await _db.Reservations
                .FirstOrDefaultAsync(r => r.Id == reservationId);

            if (reservation == null)
                return false;

            if (reservation.StatusId == 3)
                throw new InvalidOperationException("Cannot confirm a canceled reservation");

            // Đã confirm rồi thì thôi
            if (reservation.StatusId == 2 && reservation.Paid)
                return true;

            reservation.StatusId = 2; 
            reservation.Paid = true;

            _db.Reservations.Update(reservation);
            await _db.SaveChangesAsync();

            return true;
        }


        public async Task<bool> CancelReservationAsync(string reservationId)
        {
            var reservation = await _db.Reservations.Include(r => r.Showtime) 
        .Include(r => r.Seats)    
        .FirstOrDefaultAsync(r => r.Id == reservationId);
            if (reservation == null)
                return false;
            await using var tx = await _db.Database.BeginTransactionAsync();
            try
            {
        
                reservation.StatusId = 3;

             
                var seats = reservation.Seats;
                foreach (var seat in seats)
                {
                    seat.IsReserved = false;
                    seat.ReservationId = null;
                }
                _db.Seats.UpdateRange(seats);

                var showtime = reservation.Showtime!; 
                showtime.AvailableSeats += seats.Count;
                _db.Showtimes.Update(showtime);

                _db.Reservations.Update(reservation);
                await _db.SaveChangesAsync();
                await tx.CommitAsync();

                return true;
            }
            catch
            {
                await tx.RollbackAsync();
                throw;
            }
        }
        public async Task<IEnumerable<ReservationDto>> GetReservationsByUserAsync(long? userId)
        {
            if (userId == null)
                throw new ArgumentNullException(nameof(userId), "UserId cannot be null");


            var reservations = await _db.Reservations
                .AsNoTracking()
                .Where(r => r.UserId == userId)
                .Select(r => new ReservationDto
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    ShowtimeId = r.ShowtimeId,
                    ReservationTime = r.ReservationTime,
                    StatusId = r.StatusId,
                    StatusValue = MapStatus(r.StatusId),
                    TotalPrice = r.TotalPrice,
                    Paid = r.Paid,
                    Seats = r.Seats.Select(s => new SeatDto
                    {
                        Id = s.Id,
                        ShowtimeId = s.ShowtimeId,
                        SeatNumber = s.SeatNumber,
                        IsReserved = s.IsReserved
                    }).ToList()
                })
                .ToListAsync();

            return reservations;
        }
        public async Task<bool> DeleteAsync(string id)
        {
            var reservation = await _db.Reservations.FindAsync(id);
            if (reservation == null) return false;

                var show = await _db.Showtimes.FindAsync(reservation.ShowtimeId);
                if (show != null)
                {
                    show.AvailableSeats += 1;
                    _db.Showtimes.Update(show);
                }

                _db.Reservations.Remove(reservation);
                await _db.SaveChangesAsync();
                return true;

        }

        private static string MapStatus(int statusId)
        {
            return statusId switch
            {
                1 => "PENDING",
                2 => "CONFIRMED",
                3 => "CANCELED",
                _ => "UNKNOWN"
            };
        }
    }

}
