import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import Book from "../features/admin/Book/Book";
import Author from "../features/admin/Author/Author";
import Subject from "../features/admin/Subject/Subject.jsx";
import Department from "../features/admin/Department/Department.jsx";
import Major from "../features/admin/Major/Major.jsx";
import User from "../features/admin/User/User.jsx";
import Borrow from "../features/admin/Borrow/Borrow.jsx";
import AdminExportTopic from "../features/admin/ExportTopic/ExportTopic.jsx";
export default function AdminRoutes() {
  return (
    <Routes element={<AdminLayout />}>
      <Route path="/" element={<AdminHomePage />}>
        <Route path="book" element={<Book />} />
        <Route path="author" element={<Author />} />
        <Route path="subject" element={<Subject />} />
        <Route path="department" element={<Department />} />
        <Route path="major" element={<Major />} />
        <Route path="user" element={<User />} />
        <Route path="borrow" element={<Borrow />} />
        <Route path="exporttopic" element={<AdminExportTopic />} />

      </Route>
    </Routes>
  );
}
