import React from 'react'
import AdminNav from '../components/AdminNav'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <AdminNav/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout