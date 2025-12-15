using backend.Model;

namespace backend.Services.Interfaces
{
    public interface ITheaterService
    {
        Task<IEnumerable<Theater>> GetAllAsync();
        Task<Theater?> GetByIdAsync(long id);
        Task<IEnumerable<Theater>> GetByLocationAsync(string location);
        Task<long> CreateAsync(Theater theater);
        Task<Theater?> UpdateAsync(long id, Theater theater);
        Task<bool> DeleteAsync(long id);
    }
}
