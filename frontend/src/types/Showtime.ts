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
  showDate: string; // "2025-11-20T00:00:00"
  showTime: string; // "20:00"
  price: number;
  totalSeats: number;
  availableSeats: number;
  seats?: Seat[]; // Có thể có hoặc không tùy endpoint
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}