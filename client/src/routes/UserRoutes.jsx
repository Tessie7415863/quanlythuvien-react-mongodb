import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Book from "../features/user/Book.jsx";
import BorrowBook from "../features/user/BorrowBook.jsx";
import BorrowHistory from "../features/user/BorrowHistory.jsx";
import ExportTopic from "../features/user/ExportTopic.jsx";
export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="book" element={<Book />} />
        <Route path="borrow-book/:id" element={<BorrowBook />} />
        <Route path="borrow-history" element={<BorrowHistory />} />
        <Route path="de-xuat" element={<ExportTopic />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}
