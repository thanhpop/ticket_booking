
import instance from '@/config/axios';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const res = await instance.get<ApiResponse<User[]>>("/users");
    return res.data.data;
  },
};
