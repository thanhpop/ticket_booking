export interface Showtime {
    id?: number;
    movieId: number;
    theaterId: number;
    showDate: string;
    showTime: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
}