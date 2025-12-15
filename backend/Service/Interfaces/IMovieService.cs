using backend.Model;

namespace backend.Service.Interfaces
{
    public interface IMovieService
    {
        Task<IEnumerable<Movie>> GetAllAsync();
        Task<Movie?> GetByIdAsync(long id);
        Task<long> CreateAsync(Movie movie);
        Task<Movie?> UpdateAsync(long id, Movie movie);
        Task<bool> DeleteAsync(long id);
    }
}
