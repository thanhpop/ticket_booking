using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IBannerService
    {
        Task<List<BannerDto>> GetActiveBannersAsync();

        Task<List<BannerDto>> GetAllAsync();
        Task<BannerDto> CreateAsync(BannerDto dto);
        Task<BannerDto> UpdateAsync(int id, BannerDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
