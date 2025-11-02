using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class ShowtimeDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "MovieId is required.")]
        public long MovieId { get; set; }

        [Required(ErrorMessage = "TheaterId is required.")]
        public long TheaterId { get; set; }


        public DateTime ShowDate { get; set; }

        public string ShowTime { get; set; } = null!;


        public decimal Price { get; set; }


        public int TotalSeats { get; set; }


        public int AvailableSeats { get; set; }

        public List<SeatDto>? Seats { get; set; }

    }
}
