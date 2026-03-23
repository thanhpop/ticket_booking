namespace backend.DTO
{
    public class DashboardResponseDTO
    {
        public SummaryDTO Summary { get; set; } = new();
        public List<RevenueChartDTO> RevenueChart { get; set; } = new();
        public List<TopMovieDTO> TopMovies { get; set; } = new();
        public List<TheaterPerformanceDTO> TheaterPerformance { get; set; } = new();
        public List<MoviePerformanceDTO> MoviePerformance { get; set; } = new();
    }
    public class SummaryDTO
    {
        public decimal TotalRevenue { get; set; }
        public int TicketsSold { get; set; }
        public int TotalShowtimes { get; set; }
        public double OccupancyRate { get; set; }
    }

    public class RevenueChartDTO
    {
        public string Date { get; set; } = "";
        public decimal Revenue { get; set; }
    }
    public class TopMovieDTO
    {
        public long Id { get; set; }
        public string Title { get; set; } = "";
        public decimal Revenue { get; set; }
        public string? Image { get; set; }
    }
    public class TheaterPerformanceDTO
    {
        public string TheaterName { get; set; } = "";
        public string Location { get; set; } = "";
        public decimal Revenue { get; set; }
        public int TicketsSold { get; set; }
        public double OccupancyRate { get; set; }
    }
    public class MoviePerformanceDTO
    {
        public string MovieName { get; set; } = "";
        public int Showtimes { get; set; }
        public int TicketsSold { get; set; }
        public decimal Revenue { get; set; }
    }
}