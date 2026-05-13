using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IArticlesService
    {
        Task<List<ArticlesDto>> GetAllAsync();
        Task<List<ArticlesDto>> GetActiveAsync();
        Task<ArticlesDto?> GetByIdAsync(int id);
        Task<ArticlesDto> CreateAsync(ArticlesDto dto);
        Task<ArticlesDto?> UpdateAsync(int id, ArticlesDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
