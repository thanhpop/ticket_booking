
export interface Banner {
  id: number;
  imageUrl: string;
  title?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
