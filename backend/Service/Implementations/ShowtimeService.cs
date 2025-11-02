
using backend.Data;
using backend.DTO;
using backend.Model;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace backend.Services.Implementations
{
    public class ShowtimeService : IShowtimeService
    {
        private readonly AppDbContext _db;
        private readonly ISeatService _seatService;

        public ShowtimeService(AppDbContext db, ISeatService seatService)
        {
            _db = db;
            _seatService = seatService;
        }
        public async Task<ShowtimeDto?> GetByIdAsync(long id)
        {
            var s = await _db.Showtimes.AsNoTracking()
                        .Include(x => x.Seats)
                        .FirstOrDefaultAsync(x => x.Id == id);

            if (s == null) return null;

            return new ShowtimeDto
            {
                Id = s.Id,
                MovieId = s.MovieId,
                TheaterId = s.TheaterId,
                ShowDate = s.ShowDate,
                ShowTime = s.ShowTime.ToString(@"hh\:mm"),
                Price = s.Price,
                TotalSeats = s.TotalSeats,
                AvailableSeats = s.AvailableSeats,
                Seats = s.Seats?.Select(se => new SeatDto
                {
                    Id = se.Id,
                    ShowtimeId = se.ShowtimeId,
                    SeatNumber = se.SeatNumber,
                    Status = se.Status.ToString()
                }).ToList(),
            };
        }

        public async Task<IEnumerable<ShowtimeDto>> GetByMovieAsync(long movieId)
        {
            var list = await _db.Showtimes.AsNoTracking()
                            .Where(x => x.MovieId == movieId)
                            .OrderBy(x => x.ShowDate).ThenBy(x => x.ShowTime)
                            .ToListAsync();

            return list.Select(s => new ShowtimeDto
            {
                Id = s.Id,
                MovieId = s.MovieId,
                TheaterId = s.TheaterId,
                ShowDate = s.ShowDate,
                ShowTime = s.ShowTime.ToString(@"hh\:mm"),
                Price = s.Price,
                TotalSeats = s.TotalSeats,
                AvailableSeats = s.AvailableSeats,
            });
        }

        public async Task<IEnumerable<ShowtimeDto>> GetByTheaterAsync(long theaterId)
        {
            var list = await _db.Showtimes.AsNoTracking()
                            .Where(x => x.TheaterId == theaterId)
                            .OrderBy(x => x.ShowDate).ThenBy(x => x.ShowTime)
                            .ToListAsync();

            return list.Select(s => new ShowtimeDto
            {
                Id = s.Id,
                MovieId = s.MovieId,
                TheaterId = s.TheaterId,
                ShowDate = s.ShowDate,
                ShowTime = s.ShowTime.ToString(@"hh\:mm"),
                Price = s.Price,
                TotalSeats = s.TotalSeats,
                AvailableSeats = s.AvailableSeats,
            });
        }
        public async Task<IEnumerable<ShowtimeDto>> GetShowtimesByDateAsync(DateTime date)
        {
            var targetDate = date.Date;
            var list = await _db.Showtimes
                                .AsNoTracking()
                                .Where(s => s.ShowDate == targetDate)
                                .OrderBy(s => s.ShowTime)
                                .ToListAsync();

            return list.Select(s => new ShowtimeDto
            {
                Id = s.Id,
                MovieId = s.MovieId,
                TheaterId = s.TheaterId,
                ShowDate = s.ShowDate,
                ShowTime = s.ShowTime.ToString(@"hh\:mm"),
                Price = s.Price,
                TotalSeats = s.TotalSeats,
                AvailableSeats = s.AvailableSeats,
            });
        }
        public async Task<int?> GetTotalSeatsAsync(long showtimeId)
        {
            var totalSeats = await _db.Showtimes
                .Where(s => s.Id == showtimeId)
                .Select(s => (int?)s.TotalSeats)
                .FirstOrDefaultAsync();

            return totalSeats;
        }

        public async Task<IEnumerable<ShowtimeDto>> GetAvailableShowtimesAsync(DateTime? fromDate = null)
        {
            var date = (fromDate ?? DateTime.Today).Date;

            var list = await _db.Showtimes
                .AsNoTracking()
                .Where(s => s.ShowDate >= date && s.AvailableSeats > 0)
                .OrderBy(s => s.ShowDate).ThenBy(s => s.ShowTime)
                .Select(s => new ShowtimeDto
                {
                    Id = s.Id,
                    MovieId = s.MovieId,
                    TheaterId = s.TheaterId,
                    ShowDate = s.ShowDate,
                    ShowTime = s.ShowTime.ToString(@"hh\:mm"),
                    Price = s.Price,
                    TotalSeats = s.TotalSeats,
                    AvailableSeats = s.AvailableSeats
                })
                .ToListAsync();

            return list;
        }

        public async Task<IEnumerable<ShowtimeDto>> GetAvailableShowtimesForMovieAsync(long movieId, DateTime? fromDate = null)
        {
            var date = (fromDate ?? DateTime.Today).Date;

            var list = await _db.Showtimes
                .AsNoTracking()
                .Where(s => s.MovieId == movieId && s.ShowDate >= date && s.AvailableSeats > 0)
                .OrderBy(s => s.ShowDate).ThenBy(s => s.ShowTime)
                .Select(s => new ShowtimeDto
                {
                    Id = s.Id,
                    MovieId = s.MovieId,
                    TheaterId = s.TheaterId,
                    ShowDate = s.ShowDate,
                    ShowTime = s.ShowTime.ToString(@"hh\:mm"),
                    Price = s.Price,
                    TotalSeats = s.TotalSeats,
                    AvailableSeats = s.AvailableSeats
                })
                .ToListAsync();

            return list;
        }


        public async Task<ShowtimeDto> CreateAsync(ShowtimeDto dto)
        {
            var movieExists = await _db.Movies.AnyAsync(m => m.id == dto.MovieId);
            if (!movieExists) throw new KeyNotFoundException($"Movie {dto.MovieId} not found.");

            var theater = await _db.Theaters.FirstOrDefaultAsync(t => t.id == dto.TheaterId);
            if (theater == null) throw new KeyNotFoundException($"Theater {dto.TheaterId} not found.");
            if (dto.TotalSeats > theater.capacity)
            {
                throw new ArgumentException($"TotalSeats ({dto.TotalSeats}) cannot be greater than theater capacity ({theater.capacity}).");
            }


            if (!TimeSpan.TryParseExact(dto.ShowTime, "hh\\:mm", CultureInfo.InvariantCulture, out var time))
            {
                if (!TimeSpan.TryParse(dto.ShowTime, out time))
                    throw new ArgumentException("ShowTime must be in HH:mm format.");
            }

            var entity = new Showtime
            {
                MovieId = dto.MovieId,
                TheaterId = dto.TheaterId,
                ShowDate = dto.ShowDate.Date,
                ShowTime = time,
                Price = dto.Price,
                TotalSeats = dto.TotalSeats,
                AvailableSeats = dto.TotalSeats 
            };

    
            _db.Showtimes.Add(entity);
            await _db.SaveChangesAsync(); 
            var createdSeats = await CreateSeatsForShowtimeAsync(entity.Id);

            int createdCount = createdSeats.Count();
            entity.AvailableSeats = Math.Min(dto.TotalSeats, createdCount);
            entity.TotalSeats = dto.TotalSeats; 

            _db.Showtimes.Update(entity);
            await _db.SaveChangesAsync();

            var result = new ShowtimeDto
            {
                Id = entity.Id,
                MovieId = entity.MovieId,
                TheaterId = entity.TheaterId,
                ShowDate = entity.ShowDate,
                ShowTime = entity.ShowTime.ToString(@"hh\:mm"),
                Price = entity.Price,
                TotalSeats = entity.TotalSeats,
                AvailableSeats = entity.AvailableSeats,
                Seats = createdSeats.ToList(),
            };

            return result;
        }


        private async Task<List<SeatDto>> CreateSeatsForShowtimeAsync(long showtimeId) {
            var anyExisting = await _db.Seats.AsNoTracking().AnyAsync(s => s.ShowtimeId == showtimeId);
            if (anyExisting) { throw new InvalidOperationException($"Seats for showtime {showtimeId} already exist. Remove them first or use a recreate method.");
            }
            var totalSeats = await GetTotalSeatsAsync(showtimeId);
            List<Seat> seats = new List<Seat>();
            for(int i = 1;i <= totalSeats; i++)
            {
                var seat = new Seat
                {
                    ShowtimeId = showtimeId,
                    SeatNumber = $"{(char)('A' + ((i - 1) / 10))}{((i - 1) % 10) + 1}",
                    Status = SeatStatus.AVAILABLE
                };
                seats.Add(seat);
            }

            await _db.Seats.AddRangeAsync(seats);
            await _db.SaveChangesAsync();
            var seatDtos = seats.Select(s => new SeatDto
            {
                Id = s.Id,
                ShowtimeId = s.ShowtimeId,
                SeatNumber = s.SeatNumber,
                Status = s.Status.ToString()
            }).ToList();

            return seatDtos;
        }


        public async Task<bool> UpdateAsync(long id, ShowtimeDto dto)
        {
            await using var tx = await _db.Database.BeginTransactionAsync();
            try
            {
                var existing = await _db.Showtimes
                                        .FirstOrDefaultAsync(s => s.Id == id);

                if (existing == null)
                {
                    await tx.RollbackAsync();
                    return false;
                }

                var theater = await _db.Theaters.FirstOrDefaultAsync(t => t.id == dto.TheaterId);
                if (theater == null)
                {
                    await tx.RollbackAsync();
                    throw new KeyNotFoundException($"Theater {dto.TheaterId} not found.");
                }

                if (theater.capacity < existing.TotalSeats)
                {
                    await tx.RollbackAsync();
                    throw new ArgumentException($"The target theater capacity ({theater.capacity}) is smaller than current TotalSeats ({existing.TotalSeats}).");
                }

                if (!TimeSpan.TryParseExact(dto.ShowTime, "hh\\:mm", System.Globalization.CultureInfo.InvariantCulture, out var parsedTime))
                {
                    if (!TimeSpan.TryParse(dto.ShowTime, out parsedTime))
                    {
                        await tx.RollbackAsync();
                        throw new ArgumentException("ShowTime must be in HH:mm format.");
                    }
                }

                existing.MovieId = dto.MovieId;
                existing.TheaterId = dto.TheaterId;
                existing.ShowDate = dto.ShowDate.Date;
                existing.ShowTime = parsedTime;
                existing.Price = dto.Price;

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
        public async Task<bool> DeleteAsync(long id)
        {
    
            await using var tx = await _db.Database.BeginTransactionAsync();
            try
            {

                await _seatService.DeleteByShowtimeAsync(id);

       
                var entity = await _db.Showtimes.FindAsync(id);
                if (entity == null)
                {
                    await tx.RollbackAsync();
                    return false;
                }

                _db.Showtimes.Remove(entity);
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
    }
}
