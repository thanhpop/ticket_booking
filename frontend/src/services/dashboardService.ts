import instance from "../config/axios";

export interface Summary {
  totalRevenue: number;
  ticketsSold: number;
  totalShowtimes: number;
  occupancyRate: number;
}

export interface RevenueChart {
  date: string;
  revenue: number;
}

export interface TopMovie {
  id: number;
  title: string;
  revenue: number;
  image: string;
}

export interface TheaterPerformance {
  theaterName: string;
  location: string;
  revenue: number;
  ticketsSold: number;
  occupancyRate: number;
}

export interface MoviePerformance {
  movieName: string;
  showtimes: number;
  ticketsSold: number;
  revenue: number;
}

export interface DashboardResponse {
  summary: Summary;
  revenueChart: RevenueChart[];
  topMovies: TopMovie[];
  theaterPerformance: TheaterPerformance[];
  moviePerformance: MoviePerformance[];
}


export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const res = await instance.get("/admin/dashboard");
    return res.data;
  },
  exportPdf: async (): Promise<Blob> => {
    const res = await instance.get("/report/dashboard-pdf", {
      responseType: "blob", 
    });
    return res.data;
  },
};
