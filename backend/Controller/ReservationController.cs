using backend.DTO;
using backend.Helpers;
using backend.Model;
using backend.Service.Implementations;
using backend.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _service;

        public ReservationController(IReservationService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(string id)
        {
            var reservation = await _service.GetByIdAsync(id);
            if (reservation == null)
                return NotFound(new { message = "Reservation not found" });

            return Ok(reservation);
        }
        [HttpPost]
        public async Task<IActionResult> CreateReservation(ReservationRequestDto dto)
        {

                var reservation = await _service.CreateReservationAsync(dto);
                return Ok(ApiResponse<ReservationDto>.Success(reservation));


        }
        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmReservation(string id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(ApiResponse<string>.Fail("Reservation not found", 404));

            await _service.ConfirmReservationAsync(id);
            return Ok(ApiResponse<string>.Success("Reservation confirmed"));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(ApiResponse<ReservationDto>.Fail("Not found", 404));

            var ok = await _service.CancelReservationAsync(id);
            return NoContent();
        }
        [HttpGet("user/{userId:long}")]
        public async Task<IActionResult> GetByUser(long? userId)
        {
            if (userId == null)
                return BadRequest(new { message = "userId is required" });

            if (userId <= 0)
                return BadRequest(new { message = "userId must be greater than zero" });
            var reservations = await _service.GetReservationsByUserAsync(userId.Value);
            return Ok(ApiResponse<IEnumerable<ReservationDto>>.Success(reservations));


        }
    }
}
