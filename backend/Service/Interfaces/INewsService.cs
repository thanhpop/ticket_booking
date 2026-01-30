using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface INewsService
    {
        Task<List<NewsDto>> GetAllAsync();
        Task<List<NewsDto>> GetActiveAsync();
        Task<NewsDto?> GetByIdAsync(int id);
        Task<NewsDto> CreateAsync(NewsDto dto);
        Task<NewsDto?> UpdateAsync(int id, NewsDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
