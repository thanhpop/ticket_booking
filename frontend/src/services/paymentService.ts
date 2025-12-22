import instance from "../config/axios";

export interface VnPayRequest {
  reservationId: string;
  amount: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const paymentService = {
  createVnPayPayment: async (data: VnPayRequest): Promise<string> => {
    const res = await instance.post("/payment/vnpay", data);
    return res.data.data.paymentUrl;
  },
  confirmReservation: async (reservationId: string): Promise<string> => {
    const res = await instance.put<ApiResponse<string>>(
      `/reservation/confirm/${reservationId}`
    );
    return res.data.data; 
  },
};
