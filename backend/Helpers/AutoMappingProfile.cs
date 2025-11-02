using AutoMapper;
using backend.DTO;
using backend.Model;

namespace backend.Helpers
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            CreateMap<Theater, TheaterDto>().ReverseMap();
            CreateMap<Movie, MovieDto>().ReverseMap();

        }
    }
}