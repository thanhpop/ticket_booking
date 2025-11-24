namespace backend.DTO
{
    public class CreateReservationDto
    {
        public long UserId { get; set; }
        public long ShowtimeId { get; set; }
        public List<long> SeatIds { get; set; }
    }
}
