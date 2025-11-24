using backend.Data;
using backend.DTO;
using backend.Model;
using backend.Service.Interfaces;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace backend.Service.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
        private readonly int _refreshTokenDays = 7;
        public AuthService(AppDbContext db, IConfiguration config)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }


        public async Task<long> RegisterAsync(RegisterDto dto)
        {
            var username = dto.Username?.Trim();
            var email = dto.Email?.Trim().ToLowerInvariant();
            var exists = await _db.Set<User>().AsNoTracking().AnyAsync(u => u.username == username || u.email == email);
            if (exists)
            {
                throw new ArgumentException("User with the same username or email already exists.");
            }
            var hashed = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User
            {
                username = username,
                email = email,
                password = hashed
            };
            _db.Set<User>().Add(user);
            await _db.SaveChangesAsync();
            return user.id;
        }
        public async Task<JwtResponseDto?> LoginAsync(LoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
                return null;

            var user = await _db.Set<User>()
                .Where(u => u.username == dto.Username)
                .FirstOrDefaultAsync();

            if (user == null) return null;

            var ok = BCrypt.Net.BCrypt.Verify(dto.Password, user.password ?? string.Empty);
            if (!ok) return null;


            var (token, expire) = CreateJwtToken(user);

            var refreshToken = GenerateRefreshToken();
            var refreshEntity = new RefreshToken
            {
                UserId = user.id,
                Token = refreshToken,
                ExpiryDate = DateTime.UtcNow.AddDays(_refreshTokenDays),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _db.RefreshTokens.Add(refreshEntity);
            await _db.SaveChangesAsync();

            var dtoResp = new JwtResponseDto
            {
                AccessToken = token,
                UserId = user.id,
                Username = user.username,
                RefreshToken = refreshToken,
            };

            return dtoResp;

        }
        private string GenerateRefreshToken(int size = 64)
        {
            var bytes = new byte[size];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return Base64UrlEncoder.Encode(bytes);
        }

        public async Task<JwtResponseDto?> RefreshTokenAsync(string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken)) return null;

            var refresh = await _db.RefreshTokens
                .AsTracking()
                .FirstOrDefaultAsync(r => r.Token == refreshToken);

            if (refresh == null) return null;

            if (refresh.ExpiryDate < DateTime.UtcNow)
            {
                _db.RefreshTokens.Remove(refresh);
                await _db.SaveChangesAsync();
                return null;
            }

            var user = await _db.Users.FindAsync(refresh.UserId);
            if (user == null)
            {
                _db.RefreshTokens.Remove(refresh);
                await _db.SaveChangesAsync();
                return null;
            }
            var newRefreshToken = GenerateRefreshToken();
            refresh.Token = newRefreshToken;
            refresh.ExpiryDate = DateTime.UtcNow.AddDays(_refreshTokenDays);
            refresh.UpdatedAt = DateTime.UtcNow;

            _db.RefreshTokens.Update(refresh);
            await _db.SaveChangesAsync();

            var (accessToken, expire) = CreateJwtToken(user);

            var resp = new JwtResponseDto
            {
                AccessToken = accessToken,
                UserId = user.id,
                Username = user.username,
                RefreshToken = newRefreshToken,
            };

            return resp;
        }


        private (string token, DateTime expires) CreateJwtToken(User user)
        {
            var jwtSection = _config.GetSection("Jwt");
            if (!jwtSection.Exists())
                throw new InvalidOperationException("Configuration section 'Jwt' is missing.");

            var secret = jwtSection.GetValue<string>("Key");
            var issuer = jwtSection.GetValue<string>("Issuer");
            var audience = jwtSection.GetValue<string>("Audience");
            var expireMinutes = jwtSection.GetValue<int?>("ExpireMinutes") ?? 60;

            if (string.IsNullOrWhiteSpace(secret))
                throw new InvalidOperationException("JWT secret is not configured.");


            byte[] keyBytes;
            try
            {
                keyBytes = Convert.FromBase64String(secret);
            }
            catch (FormatException)
            {
                keyBytes = Encoding.UTF8.GetBytes(secret);
            }

            if (keyBytes.Length < 32) 
                throw new InvalidOperationException("JWT key too short. It must be at least 256 bits (32 bytes). Use a longer secret or a base64-encoded 32-byte key.");

            var symmetricKey = new SymmetricSecurityKey(keyBytes);
            var credentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.username ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var expires = DateTime.UtcNow.AddMinutes(expireMinutes);

            var jwt = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(jwt);
            return (tokenString, expires);
        }
        public async Task<bool> RevokeRefreshTokenAsync(string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken)) return false;

            var refresh = await _db.RefreshTokens.FirstOrDefaultAsync(r => r.Token == refreshToken);
            if (refresh == null) return false;

            _db.RefreshTokens.Remove(refresh);
            await _db.SaveChangesAsync();
            return true;
        }

    }
}
