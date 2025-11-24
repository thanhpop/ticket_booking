namespace backend.DTO
{
    public class ReservationDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long ShowtimeId { get; set; }
        public DateTime ReservationTime { get; set; }
        public int StatusId { get; set; }
        public string StatusValue { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public bool Paid { get; set; }
        public List<SeatDto> Seats { get; set; } = new List<SeatDto>();
    }
}
