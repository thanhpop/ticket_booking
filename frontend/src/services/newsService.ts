import instance from "../config/axios";
import type { News } from "../types/News";

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const newsService = {
  getAll() {
    return instance.get<ApiResponse<News[]>>("/news");
  },


  getActive() {
    return instance.get<ApiResponse<News[]>>("/news/active");
  },


  getById(id: number) {
    return instance.get<ApiResponse<News>>(`/news/${id}`);
  },


  create(data: Omit<News, "id" | "createdAt">) {
    return instance.post<ApiResponse<News>>("/news", data);
  },


  update(id: number, data: Omit<News, "id" | "createdAt">) {
    return instance.put<ApiResponse<News>>(`/news/${id}`, data);
  },

  delete(id: number) {
    return instance.delete<ApiResponse<null>>(`/news/${id}`);
  },
};
