using backend.DTO;
using backend.Helpers;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeatsController : ControllerBase
    {
        private readonly ISeatService _service;
        private readonly ILogger<SeatsController> _logger;

        public SeatsController(ISeatService service, ILogger<SeatsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet("showtime/{showtimeId:long}")]
        public async Task<IActionResult> GetByShowtime(long showtimeId)
        {
            var items = await _service.GetByShowtimeAsync(showtimeId);
            return Ok(ApiResponse<IEnumerable<SeatDto>>.Success(items));
        }

        [HttpGet("showtime/{showtimeId:long}/available")]
        public async Task<IActionResult> GetAvailableByShowtime(long showtimeId)
        {
            var items = await _service.GetAvailableByShowtimeAsync(showtimeId);
            return Ok(ApiResponse<IEnumerable<SeatDto>>.Success(items));
        }


    }
}
