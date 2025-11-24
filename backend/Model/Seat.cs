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

        [Column("is_reserved")]
        public bool IsReserved { get; set; } = false;

        [Column("reservation_id")]
        public long? ReservationId { get; set; }


        [ForeignKey("ReservationId")]
        public Reservation? Reservation { get; set; }

        [ForeignKey("ShowtimeId")]
        public Showtime? Showtime { get; set; }

    }
}
