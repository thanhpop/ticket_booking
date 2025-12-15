import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  showDate: string | null; // ISO date
  showTime: string | null; // "HH:mm"
  price: number;
  totalSeats: number;
  availableSeats: number;
}

interface ShowtimeState {
  items: Showtime[];
}

const initialState: ShowtimeState = {
  // sample data seeded here (you can remove / replace)
  items: [
    {
      id: 7,
      movieId: 1,
      theaterId: 1,
      showDate: "2025-10-30T00:00:00",
      showTime: "17:30",
      price: 120000.5,
      totalSeats: 40,
      availableSeats: 40,
    },
  ],
};

const slice = createSlice({
  name: "showtimes",
  initialState,
  reducers: {
    setShowtimes(state, action: PayloadAction<Showtime[]>) {
      state.items = action.payload;
    },
    addShowtime(state, action: PayloadAction<Omit<Showtime, "id">>) {
      const nextId = state.items.length ? Math.max(...state.items.map((s) => s.id)) + 1 : 1;
      const item: Showtime = { id: nextId, ...action.payload };
      state.items.unshift(item); // newest first
    },
    updateShowtime(state, action: PayloadAction<{ id: number; changes: Partial<Showtime> }>) {
      const { id, changes } = action.payload;
      const idx = state.items.findIndex((s) => s.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...changes };
      }
    },
    removeShowtime(state, action: PayloadAction<number>) {
      state.items = state.items.filter((s) => s.id !== action.payload);
    },
    // optional helper to reset to initial sample
    resetShowtimes(state) {
      state.items = initialState.items.slice();
    },
  },
});

export const { setShowtimes, addShowtime, updateShowtime, removeShowtime, resetShowtimes } = slice.actions;
export default slice.reducer;
