using backend.DTO;
using backend.Helpers;
using backend.Model.Vnpay;
using backend.Service.Vnpay;
using Microsoft.AspNetCore.Mvc;



namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {

        private readonly IVnPayService _vnPayService;
        public PaymentController(IVnPayService vnPayService)
        {

            _vnPayService = vnPayService;
        }
        [HttpPost("vnpay")]
        public IActionResult CreatePaymentUrlVnpay(PaymentInformationModel model)
        {
            var url = _vnPayService.CreatePaymentUrl(model, HttpContext);

            var dto = new PaymentDto { PaymentUrl = url };

            return Ok(ApiResponse<PaymentDto>.Success(dto));

        }
        [HttpGet]
        public IActionResult PaymentCallbackVnpay()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);

            return new JsonResult(response);
        }


    }
}
