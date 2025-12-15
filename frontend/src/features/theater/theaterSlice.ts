import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Theater } from "../../types/Theater";

interface TheaterState {
    items: Theater[];
}

const initialState: TheaterState = {
    items: [],
};

const theaterSlice = createSlice({
    name: "theaters",
    initialState,
    reducers: {
        setTheaters(state, action: PayloadAction<Theater[]>) {
            state.items = action.payload;
        },
        addTheater(state, action: PayloadAction<Theater>) {
            state.items.push(action.payload);
        },
        updateTheater(state, action: PayloadAction<Theater>) {
            state.items = state.items.map(t =>
                t.id === action.payload.id ? action.payload : t
            );
        },
        removeTheater(state, action: PayloadAction<number>) {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        clearAllTheaters(state) {
            state.items = [];
        },
    },
});

export const {
    setTheaters,
    addTheater,
    updateTheater,
    removeTheater,
    clearAllTheaters,
} = theaterSlice.actions;

export default theaterSlice.reducer;
