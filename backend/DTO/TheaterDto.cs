using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class TheaterDto
    {
        public long id { get; set; }

        [Required(ErrorMessage = "The theater name is required.")]
        public string? name { get; set; }

        public string? location { get; set; }

        [Required(ErrorMessage = "Capacity is required")]
        [Range(0, 1000, ErrorMessage = "Capacity must be a number between 0 and 1000.")]
        public int capacity { get; set; }
    }
}
