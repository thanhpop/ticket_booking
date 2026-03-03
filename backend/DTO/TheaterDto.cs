using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class TheaterDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "The theater name is required.")]
        public string? Name { get; set; }

        public string? Location { get; set; }

        [Required(ErrorMessage = "Capacity is required")]
        [Range(0, 1000, ErrorMessage = "Capacity must be a number between 0 and 1000.")]
        public int Capacity { get; set; }
    }
}
