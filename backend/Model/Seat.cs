using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("seat")]
    public class Seat
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("showtime_id")]
        public long ShowtimeId { get; set; }

        [Column("seat_number")]
        public string? SeatNumber { get; set; }

        [Column("status")]
        public SeatStatus Status { get; set; } = SeatStatus.AVAILABLE;


    }
}
