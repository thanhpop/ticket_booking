using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/seat-stream")]
public class SeatStreamController : ControllerBase
{
    private readonly SeatEventService _eventService;

    public SeatStreamController(SeatEventService eventService)
    {
        _eventService = eventService;

    }

    [HttpGet("{showtimeId}")]
    public async Task Stream(long showtimeId)
    {
        Response.Headers["Content-Type"] = "text/event-stream";
        Response.Headers["Cache-Control"] = "no-cache";
        Response.Headers["Connection"] = "keep-alive";

        _eventService.AddClient(showtimeId, Response);

        try
        {
            await Task.Delay(Timeout.Infinite, HttpContext.RequestAborted);
        }
        catch (TaskCanceledException)
        {
            _eventService.RemoveClient(showtimeId, Response);
        }
    }
}