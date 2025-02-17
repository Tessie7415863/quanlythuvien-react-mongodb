import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
export default function UserRoutes() {
    return (
        <Routes element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}
