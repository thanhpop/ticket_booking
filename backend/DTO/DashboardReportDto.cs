namespace backend.DTO
{
    public class DashboardReportDto
    {
        public decimal TotalRevenue { get; set; }
        public int TicketsSold { get; set; }
        public int TotalShowtimes { get; set; }
        public double OccupancyRate { get; set; }
        public List<RevenuePointDto> ChartData { get; set; } = new();
    }

    public class RevenuePointDto
    {
        public DateTime Date { get; set; }
        public double Revenue { get; set; }
    }
}
