using backend.Data;
using backend.DTO;
using backend.Model;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Implementations
{
    public class SeatService : ISeatService
    {
        private readonly AppDbContext _db;

        public SeatService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<SeatDto>> GetAvailableByShowtimeAsync(long showtimeId)
        {
            var list = await _db.Seats.AsNoTracking()
                        .Where(s => s.ShowtimeId == showtimeId && s.Status == SeatStatus.AVAILABLE)
                        .OrderBy(s => s.SeatNumber)
                        .ToListAsync();

            return list.Select(s => new SeatDto
            {
                Id = s.Id,
                ShowtimeId = s.ShowtimeId,
                SeatNumber = s.SeatNumber,
                Status = s.Status.ToString()
            });
        }

        public async Task<IEnumerable<SeatDto>> GetByShowtimeAsync(long showtimeId)
        {
            var list = await _db.Seats.AsNoTracking()
                        .Where(s => s.ShowtimeId == showtimeId)
                        .OrderBy(s => s.SeatNumber)
                        .ToListAsync();

            return list.Select(s => new SeatDto
            {
                Id = s.Id,
                ShowtimeId = s.ShowtimeId,
                SeatNumber = s.SeatNumber,
                Status = s.Status.ToString()
            });
        }
        public async Task<bool> DeleteByShowtimeAsync(long showtimeId)
        {
            var items = _db.Seats.Where(s => s.ShowtimeId == showtimeId);

            if (!await items.AnyAsync())
                return false;


            _db.Seats.RemoveRange(items);
            await _db.SaveChangesAsync();
            return true;
        }

    }
}
