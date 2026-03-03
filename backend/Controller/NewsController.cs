using backend.DTO;
using backend.Helpers;
using backend.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/news")]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _service;

        public NewsController(INewsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAllAsync();
            return Ok(ApiResponse<List<NewsDto>>.Success(data));
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            var data = await _service.GetActiveAsync();
            return Ok(ApiResponse<List<NewsDto>>.Success(data));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _service.GetByIdAsync(id);
            if (news == null)
            {
                return NotFound(ApiResponse<NewsDto>.Fail("Không tìm thấy bài viết", 404));
            }

            return Ok(ApiResponse<NewsDto>.Success(news));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewsDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return Ok(ApiResponse<NewsDto>.Success(created, "Tạo bài viết thành công"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] NewsDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (updated == null)
            {
                return NotFound(ApiResponse<NewsDto>.Fail("Không tìm thấy bài viết", 404));
            }

            return Ok(ApiResponse<NewsDto>.Success(updated, "Cập nhật thành công"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok)
            {
                return NotFound(ApiResponse<object>.Fail("Không tìm thấy bài viết", 404));
            }

            return Ok(ApiResponse<object>.Success(null, "Xóa thành công"));
        }
    }
}
