import instance from '@/config/axios';
import type { Movie } from '@/types/Movie';
import moment from 'moment';

function normalizeGenres(m: any): string[] {
    if (!m) return [];
    if (Array.isArray(m.genres)) return m.genres.map((g: any) => (typeof g === 'string' ? g : g?.name)).filter(Boolean);
    return [];
}

function formatDateToUI(rawDate: any): string | undefined {
    if (!rawDate) return undefined;
    const mm = moment(rawDate);
    if (mm.isValid()) return mm.format('DD/MM/YYYY');
    return String(rawDate);
}

function formatDateForApi(dateStr?: string | null): string | null {
    if (!dateStr) return null; // Quan trọng: Trả về null để backend biết là xóa ngày
    const formats = [
        'DD/MM/YYYY', 'DD-MM-YYYY',
        'YYYY-MM-DD', 'YYYY/MM/DD',
        'MM/DD/YYYY', 'MM-DD-YYYY',
    ];
    let mm = moment(dateStr, formats, true);
    if (mm.isValid()) return mm.format('YYYY-MM-DD');
    mm = moment(dateStr);
    if (mm.isValid()) return mm.format('YYYY-MM-DD');
    return dateStr;
}

function toMovie(m: any): Movie {
    let rawDate = m.release_date ?? m.releaseDate ?? m.release;
    let formattedDate: string | undefined;
    const imdbId = m.imdbId ?? m.imdb_id ?? m.imdbID ?? undefined;
    const filmId = m.filmId ?? m.film_id ?? m.filmid ?? undefined;
    if (rawDate) {
        const mm = moment(rawDate);
        if (mm.isValid()) formattedDate = mm.format('DD/MM/YYYY');
        else formattedDate = String(rawDate);
    }
    return {
        id: Number(m.id),
        title: m.title,
        overview: m.overview,
        genres: normalizeGenres(m),
        duration: typeof m.duration === 'number' ? m.duration : (Number(m.duration) || 0),
        language: m.language ?? m.originalLanguage ?? m.original_language,
        releaseDate: formatDateToUI(m.release_date ?? m.releaseDate ?? m.release),
        endDate: formatDateToUI(m.endDate ?? m.end_date),
        poster: m.poster ?? m.poster_path,
        imdbId: imdbId ?? undefined,
        filmId: filmId ?? undefined,
        trailer: m.trailer ?? undefined,
    };
}


export const movieService = {
    
    async getMovies(title?: string): Promise<Movie[]> {
        const params = title ? { title } : undefined;
        const res = await instance.get('/movie', { params },);
        const list = res.data.data;
        return list.map(toMovie);
    },
    async getMovieById(id: number) {
        const res = await instance.get(`/movie/${id}`);
        return toMovie(res.data.data);
    },

    async createMovie(payload: Omit<Movie, 'id'>): Promise<Movie> {
        const body = { 
            ...payload, 
            releaseDate: formatDateForApi(payload.releaseDate) ?? payload.releaseDate,
            endDate: formatDateForApi(payload.endDate)
        };
        const res = await instance.post('/movie', body);
        const movie = res.data.data ;
        return toMovie(movie);
    },

    async updateMovie(id: number, payload: Omit<Movie, 'id'>): Promise<Movie> {
        const body = { 
            ...payload, 
            id: Number(id), 
            releaseDate: formatDateForApi(payload.releaseDate) ?? payload.releaseDate,
            endDate: formatDateForApi(payload.endDate)
        };
        const res = await instance.put(`/movie/${encodeURIComponent(String(id))}`, body);
        const movie = res.data.data;
        return toMovie(movie);
    },

    async deleteMovie(id: number): Promise<void> {
        await instance.delete(`/movie/${encodeURIComponent(String(id))}`);
    },
};

export default movieService;
