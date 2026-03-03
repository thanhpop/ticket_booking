using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/seat-sessions")]
public class SeatSessionController : ControllerBase
{
    private readonly SeatSessionService _service;

    public SeatSessionController(SeatSessionService service)
    {
        _service = service;
    }

    [HttpPost("start")]
    public async Task<IActionResult> Start(
        [FromQuery] int showtimeId,
        [FromQuery] int userId)
    {
        var session = new SeatSession
        {
            ShowtimeId = showtimeId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _service.CreateAsync(session);

        if (!created)
            return BadRequest("Showtime does not exist");

        var savedSession = await _service.GetAsync(showtimeId, userId);

        return Ok(new
        {
            message = "Seat session started",
            expiresInMinutes = 5,
            expireAt = savedSession?.ExpireAt,
            serverTime = DateTime.UtcNow

        });
    }

    
    [HttpPost("{showtimeId}/{userId}/add")]
    public async Task<IActionResult> AddSeats(
        int showtimeId,
        int userId,
        [FromBody] List<long> seatIds)
    {
        await _service.AddSeatsAsync(showtimeId, userId, seatIds);
        return Ok("Seats added");
    }

    [HttpPost("{showtimeId}/{userId}/remove")]
    public async Task<IActionResult> RemoveSeats(
    int showtimeId,
    int userId,
    [FromBody] List<long> seatIds)
    {
        await _service.RemoveSeatsAsync(showtimeId, userId, seatIds);
        return Ok("SeatIds removed");
    }

  
    [HttpGet("{showtimeId}/{userId}")]
    public async Task<IActionResult> Get(
        int showtimeId,
        int userId)
    {
        var session = await _service.GetAsync(showtimeId, userId);
        if (session == null)
            return NotFound("Session expired or not found");

        var ttl = await _service.GetTtlAsync(showtimeId, userId);

        return Ok(new
        {
            session,
            ttlSeconds = ttl
        });
    }
    [HttpGet("{showtimeId}/snapshot")]
    public async Task<IActionResult> Snapshot(
        int showtimeId,
        [FromQuery] int userId)
    {
        var session = await _service.GetAsync(showtimeId, userId);
        var ttl = await _service.GetTtlAsync(showtimeId, userId);
        var holdSeats = await _service.GetAllHoldSeatsByShowtime(showtimeId);

        return Ok(new
        {
            mySeats = session?.SeatIds ?? new List<long>(),
            holdSeats,
            ttl = ttl,
            expireAt = session?.ExpireAt,
            serverTime = DateTime.UtcNow
        });
    }
    [HttpGet("{showtimeId:long}/{userId:long}/ttl")]
    public async Task<IActionResult> GetSessionTtl(long showtimeId, int userId)
    {
        var ttl = await _service.GetTtlAsync(showtimeId, userId);

        return Ok(ttl); 
    }

   
    [HttpDelete("{showtimeId}/{userId}")]
    public async Task<IActionResult> Finish(
        int showtimeId,
        int userId)
    {
        await _service.RemoveAsync(showtimeId, userId);
        return Ok("Seat session removed");
    }
}