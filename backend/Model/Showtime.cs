using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("showtime")]
    public class Showtime
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Column("movie_id")]
        public long MovieId { get; set; }

        [Column("theater_id")]
        public long TheaterId { get; set; }

        [Column("show_date", TypeName = "date")]
        public DateTime ShowDate { get; set; }

        [Column("show_time", TypeName = "time")]
        public TimeSpan ShowTime { get; set; }

        [Column("price", TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Column("total_seats")]
        public int TotalSeats { get; set; }

        [Column("available_seats")]
        public int AvailableSeats { get; set; }


        public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();


    }
}
