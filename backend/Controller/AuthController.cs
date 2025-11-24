using backend.DTO;
using backend.Helpers;
using backend.Service.Implementations;
using backend.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService auth, ILogger<AuthController> logger)
        {
            _auth = auth;
            _logger = logger;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var result = await _auth.RegisterAsync(dto);
            if(result > 0)
            {
                return Ok(ApiResponse<RegisterDto>.Success(dto));
            }
            return BadRequest();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {


             var auth = await _auth.LoginAsync(dto);
             if (auth == null) return Unauthorized(ApiResponse<object>.Fail("Invalid username/email or password"));

             return Ok(ApiResponse<JwtResponseDto>.Success(auth));
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
        {
            var res = await _auth.RefreshTokenAsync(dto.RefreshToken);
            if (res == null) return Unauthorized(new { message = "Invalid or expired refresh token" });
            return Ok(ApiResponse<JwtResponseDto>.Success(res));
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] RefreshRequestDto dto)
        {
            var ok = await _auth.RevokeRefreshTokenAsync(dto.RefreshToken);
            if (!ok) return NotFound(new { message = "Token not found" });
            return NoContent();
        }
    }
}
