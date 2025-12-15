import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import cinemaHallsReducer from '../features/cinemaHalls/cinemaHallsSlice';
import authReducer from "../features/auth/authSlice";
import theatersReducer from '../features/theater/theaterSlice';
import showtimeReducer from "../features/showtime/showtimeSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    cinemaHalls: cinemaHallsReducer,
    auth: authReducer, 
    theaters: theatersReducer,
    showtimes: showtimeReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
