using System.ComponentModel.DataAnnotations;
using backend.Model;

namespace backend.DTO
{
    public class MovieDto : AbstractMappedEntity
    {
        public long id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        public string? title { get; set; }
        [Url(ErrorMessage = "Poster must be a valid URL.")]
        public string? poster { get; set; }

        public string? overview { get; set; }

        public List<string> genres { get; set; } = new();

        [Range(0, 1000, ErrorMessage = "Duration must be a number between 0 and 1000.")]
        public int duration { get; set; }

        public string? language { get; set; }


        [Required(ErrorMessage = "Release date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Release date must be a valid date.")]
        public DateTime release_date { get; set; }

        [Required(ErrorMessage = "IMDB id is required.")]
        public string imdb_id { get; set; } = null!;

        [Required(ErrorMessage = "Film id is required.")]
        public string film_id { get; set; } = null!;
    }
}
