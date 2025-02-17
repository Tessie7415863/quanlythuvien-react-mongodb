import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Book from "../components/admin/Book/Book";
import Author from "../components/admin/Author/Author";
import AdminHomePage from '../pages/AdminHomePage.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';
export default function AdminRoutes() {
    return (
        <Routes element={<AdminLayout />}>
            <Route path="/manage/" element={<AdminHomePage />}>
                <Route path="book" element={<Book />} />
                <Route path="author" element={<Author />} />
            </Route>
        </Routes>
    )
}
