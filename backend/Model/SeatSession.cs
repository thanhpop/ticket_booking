public class SeatSession
{
    public int UserId { get; set; }
    public int ShowtimeId { get; set; }
    public List<long> SeatIds { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime ExpireAt { get; set; }
}