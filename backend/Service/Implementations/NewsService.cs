using backend.Data;
using backend.DTO;
using backend.Model;
using backend.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Service.Implementations
{
    public class NewsService : INewsService
    {
        private readonly AppDbContext _context;

        public NewsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<NewsDto>> GetAllAsync()
        {
            return await _context.News
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => ToDto(n))
                .ToListAsync();
        }

        public async Task<List<NewsDto>> GetActiveAsync()
        {
            return await _context.News
                .Where(n => n.IsActive)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => ToDto(n))
                .ToListAsync();
        }

        public async Task<NewsDto?> GetByIdAsync(int id)
        {
            var news = await _context.News.FindAsync(id);
            return news == null ? null : ToDto(news);
        }

        public async Task<NewsDto> CreateAsync(NewsDto dto)
        {
            var news = new News
            {
                Title = dto.Title,
                Summary = dto.Summary,
                Content = dto.Content,
                ImageUrl = dto.ImageUrl,
                Category = dto.Category,
                IsActive = dto.IsActive
            };

            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return ToDto(news);
        }

        public async Task<NewsDto?> UpdateAsync(int id, NewsDto dto)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null) return null;

            news.Title = dto.Title;
            news.Summary = dto.Summary;
            news.Content = dto.Content;
            news.ImageUrl = dto.ImageUrl;
            news.Category = dto.Category;
            news.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();
            return ToDto(news);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null) return false;

            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return true;
        }

        private static NewsDto ToDto(News n) => new()
        {
            Id = n.Id,
            Title = n.Title,
            Summary = n.Summary,
            Content = n.Content,
            ImageUrl = n.ImageUrl,
            Category = n.Category,
            CreatedAt = n.CreatedAt,
            IsActive = n.IsActive
        };
    }
}
