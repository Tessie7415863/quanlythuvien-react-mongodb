import React from 'react'
import NavBar from '../pages/Navbar'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}
