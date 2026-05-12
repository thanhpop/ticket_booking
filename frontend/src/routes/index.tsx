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
import NewsPage from "@/pages/home/NewsPage.tsx";
import BannerPage from "@/pages/admin/Banner.tsx";
import NewsManagementPage from "@/pages/admin/News.tsx";
import NewsDetailPage from "@/pages/home/NewsDetailPage.tsx";
import AdminDashboard from "@/pages/admin/Dashboard.tsx";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

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
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Route>
      <Route path="/paymentResult" element={<PaymentResult />} />
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
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
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
