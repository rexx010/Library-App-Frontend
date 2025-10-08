import React from 'react'
import logo from "../assets/logo.jpg"
import { NavLink, useNavigate, Link } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

  return (
    <div className='navbar'>
        <img src={logo} alt="#" />
        <ul>
            <NavLink to={"/"}><li>Home</li></NavLink>
            <NavLink to={"/about"}><li>About Us</li></NavLink>
            <NavLink to={"/service"}><li>Service</li></NavLink>
            <NavLink to={"/contact"}><li>Contact us</li></NavLink>
            <NavLink to={"/help"}><li>Help</li></NavLink>
        </ul>
        <div className="left">
        <button onClick={() => navigate('/')}>Get Started</button>
        <Link to="/"><p>Sign Out</p></Link>
        </div>
    </div>
  )
}

export default Navbar