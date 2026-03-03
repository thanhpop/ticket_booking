
import instance from "../config/axios";


export const seatSessionService = {
  startSession: async (showtimeId: number, userId: number) => {
    const res = await instance.post(
      `/seat-sessions/start`,
      null,
      {
        params: { showtimeId, userId },
      }
    );
    return res.data;
  },

  addSeats: async (
    showtimeId: number,
    userId: number,
    seatIds: number[]
  ) => {
    const res = await instance.post(
      `/seat-sessions/${showtimeId}/${userId}/add`,
      seatIds
    );
    return res.data;
  },

  
  removeSeats: async (
    showtimeId: number,
    userId: number,
    seatIds: number[]
  ) => {
    const res = await instance.post(
      `/seat-sessions/${showtimeId}/${userId}/remove`,
      seatIds
    );
    return res.data;
  },
  
  getSnapshot: async (showtimeId: number, userId: number) => {
    const res = await instance.get(
      `/seat-sessions/${showtimeId}/snapshot`,
      {
        params: { userId },
      }
    );
    return res.data;
  },
};