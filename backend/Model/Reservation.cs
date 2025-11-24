using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("reservation")]
    public class Reservation
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        [Column("user_id")]
        public long UserId { get; set; }
        [Column("showtime_id")]
        public long ShowtimeId { get; set; }

        [Column("reservation_time")]
        public DateTime ReservationTime { get; set; } = DateTime.UtcNow;

        [Column("status_id")]
        public int StatusId { get; set; } = 1;

        [Column("total_price")]
        public decimal TotalPrice { get; set; }
        [Column("paid")]
        public bool Paid { get; set; }

        public ICollection<Seat> Seats { get; set; } = new List<Seat>();
        public Showtime? Showtime { get; set; }
    }
}
