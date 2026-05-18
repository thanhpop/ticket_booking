import instance from "@/config/axios";


export const seatService = {
  getSeatStatus: async (showtimeId: number) => {
    const res = await instance.get(
      `/seats/showtime/${showtimeId}/status`
    );
    return res.data;
  },
};