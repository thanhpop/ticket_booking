using backend.DTO.Seat;
using backend.Helpers;
using backend.Service.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SeatsController : ControllerBase
    {
        private readonly ISeatService _service;
        private readonly ILogger<SeatsController> _logger;
        private readonly SeatSessionService _seatSessionService;

        public SeatsController(
    ISeatService service,
    ILogger<SeatsController> logger,
    SeatSessionService seatSessionService)
{
    _service = service;
    _logger = logger;
    _seatSessionService = seatSessionService;
}
        [HttpGet("showtime/{showtimeId:long}/status")]
        public async Task<IActionResult> GetSeatStatus(long showtimeId)
        {
            //var seats = await _service.GetByShowtimeAsync(showtimeId);

            var holdSeats = await _seatSessionService
                .GetAllHoldSeatsByShowtime(showtimeId);

            //var result = new
            //{
            //    seats,
            //    holdSeats
            //};

            return Ok(holdSeats);
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
