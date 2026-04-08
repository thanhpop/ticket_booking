using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IDashboardReportService
    {
        byte[] ExportDashboardToPdf(DashboardResponseDTO data);
    }
}
