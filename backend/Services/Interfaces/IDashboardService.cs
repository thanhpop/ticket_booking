using backend.DTO.Dashboard;

namespace backend.Service.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardResponseDTO> GetDashboardAsync();
    }
}