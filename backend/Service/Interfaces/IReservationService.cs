using backend.DTO;
using backend.Model;

namespace backend.Service.Interfaces
{
    public interface IReservationService
    {
        Task<IEnumerable<ReservationDto>> GetAllAsync();
        Task<ReservationDto?> GetByIdAsync(long id);
        Task<ReservationDto?> CreateReservationAsync(ReservationRequestDto dto);

        Task<bool> CancelReservationAsync(long reservationId);

        Task<IEnumerable<ReservationDto>> GetReservationsByUserAsync(long? userId);
        Task<bool> DeleteAsync(long id);

    }
}
