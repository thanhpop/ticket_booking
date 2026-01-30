export interface News {
  id: number;
  title: string;
  content: string;
  summary: string;  
  imageUrl: string;
  category: "Movie" | "Promotion";
  isActive: boolean;
  createdAt: string;
}

