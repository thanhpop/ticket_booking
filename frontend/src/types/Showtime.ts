// src/types/Showtime.ts

export interface Seat {
  id: number;
  showtimeId: number;
  seatNumber: string;
  isReserved: boolean;
}

export interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  showDate: string; 
  showTime: string; 
  price: number;
  totalSeats: number;
  availableSeats: number;
  seats?: Seat[]; 
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}