using backend.Data;
using backend.Model;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly AppDbContext _db;
        public MovieService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<Movie>> GetAllAsync()
        {
            return await _db.Movies.AsNoTracking().ToListAsync();
        }

        public async Task<Movie?> GetByIdAsync(long id)
        {
            return await _db.Movies.AsNoTracking().FirstOrDefaultAsync(m => m.id == id);
        }

        public async Task<long> CreateAsync(Movie movie)
        {
            _db.Movies.Add(movie);
            await _db.SaveChangesAsync();
            return movie.id;
        }

        public async Task<bool> UpdateAsync(long id, Movie movie)
        {
            var existing = await _db.Movies.FindAsync(id);
            if (existing == null) return false;

            existing.title = movie.title;
            existing.poster = movie.poster;
            existing.overview = movie.overview;
            existing.genres = movie.genres ?? new List<string>();
            existing.duration = movie.duration;
            existing.language = movie.language;
            existing.release_date = movie.release_date;
            existing.imdb_id = movie.imdb_id;
            existing.film_id = movie.film_id;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _db.Movies.FindAsync(id);
            if (existing == null) return false;
            _db.Movies.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
