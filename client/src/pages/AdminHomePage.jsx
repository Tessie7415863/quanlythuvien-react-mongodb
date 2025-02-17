import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin'

export default function AdminHomePage() {
    return (
        <div className='flex h-screen'>
            <SidebarAdmin />
            <div className='p-4 sm:ml-auto'>
                <Outlet />
            </div>
        </div>
    )
}
