using backend.Data;
using backend.DTO.Payment;
using backend.Helpers;
using backend.Model.Vnpay;
using backend.Service.Vnpay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace backend.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {

        private readonly IVnPayService _vnPayService;
        private readonly SeatSessionService _seatSessionService;
        private readonly AppDbContext _context;
        public PaymentController(IVnPayService vnPayService, SeatSessionService seatSessionService, AppDbContext context)
        {

            _vnPayService = vnPayService;
            _seatSessionService = seatSessionService;
            _context = context;
        }
        [HttpPost("vnpay")]
        public async Task<IActionResult> CreatePaymentUrlVnpay(PaymentInformationDto model)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.Id == model.ReservationId);

            if (reservation == null)
                return BadRequest("Reservation not found");

            var extended = await _seatSessionService
                .ExtendTtlAsync(reservation.ShowtimeId, reservation.UserId, 15);

            if (!extended)
                return BadRequest("Seat session expired.");
            var paymentModel = new PaymentInformationModel
            {
                ReservationId = model.ReservationId,
                Amount = model.Amount,
            };

            var url = _vnPayService.CreatePaymentUrl(paymentModel, HttpContext);

            return Ok(ApiResponse<PaymentDto>.Success(
                new PaymentDto { PaymentUrl = url }
            ));
        }
        [HttpGet]
        public IActionResult PaymentCallbackVnpay()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);

            return new JsonResult(response);
        }


    }
}
