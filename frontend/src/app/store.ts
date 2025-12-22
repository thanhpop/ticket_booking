import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';

import theatersReducer from '../features/theater/theaterSlice';
import showtimeReducer from "../features/showtime/showtimeSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    theaters: theatersReducer,
    showtimes: showtimeReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
