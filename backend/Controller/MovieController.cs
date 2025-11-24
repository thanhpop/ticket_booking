using AutoMapper;
using backend.DTO;
using backend.Helpers;
using backend.Middleware;
using backend.Model;
using backend.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _service;
        private readonly IMapper _mapper;
        public MovieController(IMovieService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var entities = await _service.GetAllAsync();
            var dtos = _mapper.Map<IEnumerable<MovieDto>>(entities);
            var resp = ApiResponse<IEnumerable<MovieDto>>.Success(dtos);

            return Ok(resp);
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> Get(long id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null) return NotFound();
            var dto = _mapper.Map<MovieDto>(entity);
            return Ok(ApiResponse<MovieDto>.Success(dto));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MovieDto dto)
        {
            var entity = _mapper.Map<Movie>(dto);
            var id = await _service.CreateAsync(entity);
            var resultDto = _mapper.Map<MovieDto>(entity);
            var resp = ApiResponse<MovieDto>.Success(resultDto);
            return CreatedAtAction(nameof(Get), new { id }, resp);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] MovieDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var entity = _mapper.Map<Movie>(dto);
            var ok = await _service.UpdateAsync(id, entity);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
