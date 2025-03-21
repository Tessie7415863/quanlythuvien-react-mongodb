import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin'

export default function AdminHomePage() {
    return (
        <div className='flex h-screen overflow-x-hidden w-full'>
            <div className="sm:w-[15%]">
                <SidebarAdmin />
            </div>
            <div className='p-4 sm:w-[85%]'>
                <Outlet />
            </div>
        </div>
    )
}
