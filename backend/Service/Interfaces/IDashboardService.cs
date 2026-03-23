using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardResponseDTO> GetDashboardAsync();
    }
}