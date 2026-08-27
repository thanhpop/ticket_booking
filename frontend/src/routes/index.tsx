import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import MoviePage from "@/pages/admin/Movie";

import NotFoundPage from "@/pages/error/error_404.tsx";
import PaymentResult from "@/pages/home/PaymentResult.tsx";
import TheaterPage from "@/pages/admin/Theater.tsx";
import Showtime from "@/pages/admin/Showtime.tsx";
import HomePage from "@/pages/home/Home.tsx";
import Auth from "@/pages/auth/Auth.tsx";
import MovieDetailPage from "@/pages/home/MovieDetail.tsx";
import BookingPage from "@/pages/home/Booking.tsx";
import ReservationPage from "@/pages/admin/Reservation.tsx";
import ProfilePage from "@/pages/home/ProfilePage.tsx";
import UserManagementPage from "@/pages/admin/User.tsx";
import ArticlePage from "@/pages/home/ArticlePage";
import BannerPage from "@/pages/admin/Banner.tsx";
import NewsManagementPage from "@/pages/admin/Article";
import ArticleDetailPage from "@/pages/home/ArticleDetailPage";
import AdminDashboard from "@/pages/admin/Dashboard.tsx";
import MainLayout from "@/layouts/UserLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />

        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/booking/:showtimeId" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
      </Route>
      <Route path="/paymentResult" element={<PaymentResult />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="movie" element={<MoviePage />} />
        <Route path="theater" element={<TheaterPage />} />
        <Route path="showtime" element={<Showtime />} />
        <Route path="reservations" element={<ReservationPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="banner" element={<BannerPage />} />
        <Route path="news" element={<NewsManagementPage />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
