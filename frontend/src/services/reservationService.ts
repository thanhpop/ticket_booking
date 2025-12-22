import instance from "../config/axios";

export interface CreateReservationRequest {
  userId: number;
  showtimeId: number;
  seatIds: number[];
}

export interface ReservationResponse {
  id: string;
  userId: number;
  showtimeId: number;
  reservationTime: string;
  statusId: number;
  statusValue: string;
  totalPrice: number;
  paid: boolean;
}

export const reservationService = {
  createReservation: async (
    data: CreateReservationRequest
  ): Promise<ReservationResponse> => {
    const res = await instance.post("/reservation", data);
    return res.data.data; 
  },
    cancelReservation: async (reservationId: string): Promise<void> => {
    await instance.put(`/reservation/${reservationId}`);

  },
};
