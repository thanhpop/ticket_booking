// backend/Controllers/ShowtimesController.cs
using backend.DTO;
using backend.Helpers;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShowtimesController : ControllerBase
    {
        private readonly IShowtimeService _service;
        private readonly ILogger<ShowtimesController> _logger;

        public ShowtimesController(IShowtimeService service, ILogger<ShowtimesController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // GET api/showtimes/{id}
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        {
            var item = await _service.GetByIdAsync(id);
            return Ok(ApiResponse<ShowtimeDto>.Success(item));
        }

        [HttpGet("movie/{movieId:long}")]
        public async Task<IActionResult> GetByMovie(long movieId)
        {
            var items = await _service.GetByMovieAsync(movieId);
            return Ok(ApiResponse<IEnumerable<ShowtimeDto>>.Success(items));
        }

        [HttpGet("theater/{theaterId:long}")]
        public async Task<IActionResult> GetByTheater(long theaterId)
        {
            var items = await _service.GetByTheaterAsync(theaterId);
            return Ok(ApiResponse<IEnumerable<ShowtimeDto>>.Success(items));
        }
        [HttpGet("date")]
        public async Task<IActionResult> GetByDate([FromQuery] DateTime date)
        {
            var items = await _service.GetShowtimesByDateAsync(date);
            return Ok(new ApiResponse<IEnumerable<ShowtimeDto>>(200, "Success", items));
        }

        [HttpGet("available")]
        public async Task<IActionResult> GetAvailable([FromQuery] DateTime? date)
        {
            var searchDate = (date ?? DateTime.Today).Date;
            var items = await _service.GetAvailableShowtimesAsync(searchDate);
            return Ok(new ApiResponse<IEnumerable<ShowtimeDto>>(200, "Success", items));
        }


        [HttpGet("available/movies/{movieId:long}")]
        public async Task<IActionResult> GetAvailableForMovie([FromRoute] long movieId, [FromQuery] DateTime? date)
        {
            var searchDate = (date ?? DateTime.Today).Date;
            var items = await _service.GetAvailableShowtimesForMovieAsync(movieId, searchDate);
            return Ok(new ApiResponse<IEnumerable<ShowtimeDto>>(200, "Success", items));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ShowtimeDto dto)
        {
              var created = await _service.CreateAsync(dto);
              return CreatedAtAction(nameof(GetById), new { id = created.Id }, ApiResponse<ShowtimeDto>.Success(created, "Created", 201));


        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] ShowtimeDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse<object>(400, "Invalid request", ModelState));
                var ok = await _service.UpdateAsync(id, dto);
                if (!ok) return NotFound(new ApiResponse<object>(404, "Showtime not found", null));
                return NoContent();


        }
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
              var ok = await _service.DeleteAsync(id);
              return Ok(ApiResponse<object>.Success(null, "Showtime and its seats deleted", 200));

        }
    }
}
    