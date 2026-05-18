import instance from "@/config/axios";
import type { Article } from "@/types/Article";

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const articleService = {
  getAll() {
    return instance.get<ApiResponse<Article[]>>("/articles");
  },


  getActive() {
    return instance.get<ApiResponse<Article[]>>("/articles/active");
  },


  getById(id: number) {
    return instance.get<ApiResponse<Article>>(`/articles/${id}`);
  },


  create(data: Omit<Article, "id" | "createdAt">) {
    return instance.post<ApiResponse<Article>>("/articles", data);
  },


  update(id: number, data: Omit<Article, "id" | "createdAt">) {
    return instance.put<ApiResponse<Article>>(`/articles/${id}`, data);
  },

  delete(id: number) {
    return instance.delete<ApiResponse<null>>(`/articles/${id}`);
  },
};
