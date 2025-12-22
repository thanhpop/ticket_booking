using backend.DTO;
using backend.Model;

namespace backend.Service.Interfaces
{
    public interface IReservationService
    {
        Task<IEnumerable<ReservationDto>> GetAllAsync();
        Task<ReservationDto?> GetByIdAsync(string id);
        Task<ReservationDto?> CreateReservationAsync(ReservationRequestDto dto);

        Task<bool> CancelReservationAsync(string reservationId);

        Task<bool> ConfirmReservationAsync(string reservationId);

        Task<IEnumerable<ReservationDto>> GetReservationsByUserAsync(long? userId);
        Task<bool> DeleteAsync(string id);

    }
}
