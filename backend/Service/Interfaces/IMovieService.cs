using backend.DTO;

public interface IMovieService
{
    Task<IEnumerable<MovieDto>> GetAllAsync();
    Task<MovieDto?> GetByIdAsync(long id);
    Task<MovieDto> CreateAsync(MovieDto dto);
    Task<MovieDto?> UpdateAsync(long id, MovieDto dto);
    Task<bool> DeleteAsync(long id);
}
