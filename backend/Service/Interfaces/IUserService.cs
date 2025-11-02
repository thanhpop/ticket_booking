using backend.DTO;

namespace backend.Service.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto?> GetByIdAsync(long id);
        Task<bool> DeleteAsync(long id);
    }
}
