using backend.Data;
using backend.Model;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Implementations
{
    public class TheaterService : ITheaterService
    {
        private readonly AppDbContext _db;
        public TheaterService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<Theater>> GetAllAsync()
        {
            return await _db.Theaters.AsNoTracking().ToListAsync();
        }

        public async Task<Theater?> GetByIdAsync(long id)
        {
            return await _db.Theaters.AsNoTracking().FirstOrDefaultAsync(t => t.id == id);
        }
        public async Task<IEnumerable<Theater>> GetByLocationAsync(string location)
        {
            if (string.IsNullOrWhiteSpace(location))
                return Enumerable.Empty<Theater>();

            var q = location.Trim().ToLowerInvariant();

            return await _db.Theaters
                            .AsNoTracking()
                            .Where(t => !string.IsNullOrEmpty(t.location) && t.location.ToLower().Contains(q))
                            .ToListAsync();
        }

        public async Task<long> CreateAsync(Theater theater)
        {
            _db.Theaters.Add(theater);
            await _db.SaveChangesAsync();
            return theater.id;
        }

        public async Task<bool> UpdateAsync(long id, Theater theater)
        {
            var existing = await _db.Theaters.FindAsync(id);
            if (existing == null) return false;

            existing.name = theater.name;
            existing.location = theater.location;
            existing.capacity = theater.capacity;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _db.Theaters.FindAsync(id);
            if (existing == null) return false;

            _db.Theaters.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
