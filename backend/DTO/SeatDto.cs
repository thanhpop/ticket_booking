using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class SeatDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "ShowtimeId is required.")]
        public long ShowtimeId { get; set; }


        public string? SeatNumber { get; set; }

        public string Status { get; set; } = "AVAILABLE";


    }
}
