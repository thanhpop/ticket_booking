import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../pages/admin/AdminLayout";
import MoviePage from "../pages/admin/Movie";

import NotFoundPage from "../pages/error/error_404.tsx";
import PaymentResult from "../pages/home/PaymentResult.tsx";
import TheaterPage from "../pages/admin/TheaterPage.tsx";
import Showtime from "../pages/admin/Showtime.tsx";
import NewHomePage from "../pages/home/NewHomePage.tsx";
import NewAuth from "../pages/home/NewAuth.tsx";
import MovieDetailPage from "../pages/home/MovieDetailPage.tsx";
import BookingPage from "../pages/home/BookingPage.tsx";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<NewAuth />} />
      <Route path="/" element={<NewHomePage />} />
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
