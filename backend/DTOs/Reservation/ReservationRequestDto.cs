namespace backend.DTO.Reservation
{
    public class ReservationRequestDto
    {
        public long UserId { get; set; }
        public long ShowtimeId { get; set; }
        public List<long> SeatIds { get; set; } = new();
    }
}
