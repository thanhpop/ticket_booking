
using backend.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace backend.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;


        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred");
                ApplicationException appException = ex switch
                {
                    ApplicationException ae => new ApplicationException(ae.Message, ae),
                    DbUpdateException dbEx => new ApplicationException("Database update error", dbEx),
                    ValidationException valEx => new ApplicationException("Validation error", valEx),
                    _ => new ApplicationException("An unexpected error occurred", ex)
                };
                await context.Response.WriteAsJsonAsync(new ProblemDetails
                {
                    Type = ex.GetType().Name,
                    Title = "An error occured",
                    Detail = ex.Message,
                });

            }
        }

        
    }
}
