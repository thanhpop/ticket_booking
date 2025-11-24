using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IShowtimeService
    {
        Task<IEnumerable<ShowtimeDto>> GetByMovieAsync(long movieId);
        Task<IEnumerable<ShowtimeDto>> GetByTheaterAsync(long theaterId);
        Task<ShowtimeDto?> GetByIdAsync(long id);

        Task<IEnumerable<ShowtimeDto>> GetShowtimesByDateAsync(DateTime date);

        Task<IEnumerable<ShowtimeDto>> GetAvailableShowtimesAsync(DateTime? fromDate = null);
        Task<IEnumerable<ShowtimeDto>> GetAvailableShowtimesForMovieAsync(long movieId, DateTime? fromDate = null);

        Task<ShowtimeDto> CreateAsync(ShowtimeDto dto);
        Task<bool> UpdateAsync(long id, ShowtimeDto dto);
        Task<bool> DeleteAsync(long id);
    }
}
