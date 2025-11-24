using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class RegisterDto
    {
        [Required]
        [StringLength(100)]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters.")]
        public string? Password { get; set; }
    }
}
