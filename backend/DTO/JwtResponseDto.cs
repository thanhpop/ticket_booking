namespace backend.DTO
{
    public class JwtResponseDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public long UserId { get; set; }
        public string? Username { get; set; }

        public string? RefreshToken { get; set; }
    }
}
