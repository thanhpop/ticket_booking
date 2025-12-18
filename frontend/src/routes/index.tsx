import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../pages/admin/AdminLayout";
import MoviePage from "../pages/admin/Movie";

import NotFoundPage from "../pages/error/error_404.tsx";
import PaymentResult from "../pages/home/PaymentResult.tsx";
import TheaterPage from "../pages/admin/Theater.tsx";
import Showtime from "../pages/admin/Showtime.tsx";
import HomePage from "../pages/home/Home.tsx";
import Auth from "../pages/home/Auth.tsx";
import MovieDetailPage from "../pages/home/MovieDetail.tsx";
import BookingPage from "../pages/home/Booking.tsx";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/booking/:showtimeId" element={<BookingPage />} />
      <Route path="/paymentResult" element={<PaymentResult />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="movie" element={<MoviePage />} />
        <Route path="theater" element={<TheaterPage />} />
        <Route path="showtime" element={<Showtime />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
