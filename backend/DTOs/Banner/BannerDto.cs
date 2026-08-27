namespace backend.DTO.Banner
{
    public class BannerDto
    {
        public int Id { get; set; }         
        public string ImageUrl { get; set; } = string.Empty;
        public string? Title { get; set; }
        public bool IsActive { get; set; } = true;
        public int DisplayOrder { get; set; }
    }
}
