using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    public class News
    {
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; } = null!;

        [Required]
        public string Summary { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        [Column("image_url")]
        public string? ImageUrl { get; set; }

        [Required]
        public string Category { get; set; } = null!;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("is_active")]
        public bool IsActive { get; set; } = true;
    }
}
