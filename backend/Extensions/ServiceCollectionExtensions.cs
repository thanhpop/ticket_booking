using backend.Service.Interfaces;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITheaterService, TheaterService>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<ISeatService, SeatService>();
            services.AddScoped<IShowtimeService, ShowtimeService>();

            return services;
        }
    }
}
