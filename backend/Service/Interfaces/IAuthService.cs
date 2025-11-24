using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IAuthService
    {
        Task<long> RegisterAsync(RegisterDto dto);
        Task<JwtResponseDto?> LoginAsync(LoginDto dto);
        Task<bool> RevokeRefreshTokenAsync(string refreshToken);
        Task<JwtResponseDto?> RefreshTokenAsync(string refreshToken);
    }
}
