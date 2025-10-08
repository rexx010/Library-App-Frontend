import React from 'react'
import UserNav from '../components/UserNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <UserNav/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default UserLayout