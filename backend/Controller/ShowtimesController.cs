// backend/Controllers/ShowtimesController.cs
using backend.DTO;
using backend.Helpers;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(new ApiResponse<object>(200, "Success", list));
        }

        [HttpGet("{id:long}")]
        //[Authorize]
        public async Task<IActionResult> GetById(long id)
        {
            var item = await _service.GetByIdAsync(id);
            return Ok(ApiResponse<ShowtimeDto>.Success(item));
        }

        [HttpGet("movie/{movieId:long}")]
        //[Authorize]
        public async Task<IActionResult> GetByMovie(long movieId)
        {
            var items = await _service.GetByMovieAsync(movieId);
            return Ok(ApiResponse<IEnumerable<ShowtimeDto>>.Success(items));
        }

        [HttpGet("theater/{theaterId:long}")]
        //[Authorize]
        public async Task<IActionResult> GetByTheater(long theaterId)
        {
            var items = await _service.GetByTheaterAsync(theaterId);
            return Ok(ApiResponse<IEnumerable<ShowtimeDto>>.Success(items));
        }
        [HttpGet("date")]
        //[Authorize]
        public async Task<IActionResult> GetByDate([FromQuery] DateTime date)
        {
            var items = await _service.GetShowtimesByDateAsync(date);
            return Ok(new ApiResponse<IEnumerable<ShowtimeDto>>(200, "Success", items));
        }

        [HttpGet("available")]
        //[Authorize]
        public async Task<IActionResult> GetAvailable([FromQuery] DateTime? date)
        {
            var searchDate = (date ?? DateTime.Today).Date;
            var items = await _service.GetAvailableShowtimesAsync(searchDate);
            return Ok(new ApiResponse<IEnumerable<ShowtimeDto>>(200, "Success", items));
        }


        [HttpGet("available/movies/{movieId:long}")]
        //[Authorize]
        public async Task<IActionResult> GetAvailableForMovie([FromRoute] long movieId, [FromQuery] DateTime? date)
        {
            var searchDate = (date ?? DateTime.Today).Date;
            var items = await _service.GetAvailableShowtimesForMovieAsync(movieId, searchDate);
            return Ok(new ApiResponse<IEnumerable<ShowtimeDto>>(200, "Success", items));
        }

        [HttpPost]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create([FromBody] ShowtimeDto dto)
        {
              var created = await _service.CreateAsync(dto);
              return CreatedAtAction(nameof(GetById), new { id = created.Id }, ApiResponse<ShowtimeDto>.Success(created, "Created", 201));


        }

        [HttpPut("{id:long}")]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(long id, [FromBody] ShowtimeDto dto)
        {

                var updated = await _service.UpdateAsync(id, dto);
                return Ok(ApiResponse<ShowtimeDto>.Success(updated, "Updated", 200));
     

        }

        [HttpDelete("{id:long}")]
        //[Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(long id)
        {
              var ok = await _service.DeleteAsync(id);
              return Ok(ApiResponse<object>.Success(null, "Showtime and its seats deleted", 200));

        }
    }
}
    