using backend.DTO.Dashboard;

namespace backend.Service.Interfaces
{
    public interface IDashboardReportService
    {
        byte[] ExportDashboardToPdf(DashboardResponseDTO data);
    }
}
