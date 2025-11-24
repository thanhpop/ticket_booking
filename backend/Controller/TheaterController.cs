using AutoMapper;
using backend.DTO;
using backend.Helpers;
using backend.Model;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TheaterController : ControllerBase
    {
        private readonly ITheaterService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<TheaterController> _logger;

        public TheaterController(ITheaterService service, IMapper mapper, ILogger<TheaterController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _service.GetAllAsync();
            var dtos = _mapper.Map<IEnumerable<TheaterDto>>(list);
            var resp = ApiResponse<IEnumerable<TheaterDto>>.Success(dtos);
            return Ok(resp);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var item = await _service.GetByIdAsync(id);
            var dto = _mapper.Map<TheaterDto>(item);

            return Ok(ApiResponse<TheaterDto>.Success(dto));
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetByLocation([FromQuery] string location)
        {
            if (string.IsNullOrWhiteSpace(location))
                return BadRequest("Query parameter 'location' is required.");

            var list = await _service.GetByLocationAsync(location);
            var dtos = list.Select(t => new TheaterDto { id = t.id, name = t.name, location = t.location, capacity = t.capacity });
            return Ok(ApiResponse<IEnumerable<TheaterDto>>.Success(dtos));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TheaterDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var theater = _mapper.Map<Theater>(dto);
            var newId = await _service.CreateAsync(theater);
            var resultDto = _mapper.Map<TheaterDto>(theater);
            var resp = ApiResponse<TheaterDto>.Success(resultDto, "Created", 201);
            return CreatedAtAction(nameof(Get), new { id = newId }, resp);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] TheaterDto dto)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound(ApiResponse<TheaterDto>.Fail("Not found", 404));
            _mapper.Map(dto, existing);
            var ok = await _service.UpdateAsync(id, existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
