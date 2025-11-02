using backend.DTO;
using System.Threading.Tasks;

namespace backend.Service.Interfaces
{
    public interface ISeatService
    {
        Task<IEnumerable<SeatDto>> GetByShowtimeAsync(long showtimeId);
        Task<IEnumerable<SeatDto>> GetAvailableByShowtimeAsync(long showtimeId);
        Task<bool> DeleteByShowtimeAsync(long showtimeId);
    }
}
