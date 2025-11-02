import React from 'react'
import logo from "../assets/logo.jpg"
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { usePostLogoutUserRequestMutation } from '../api/authentication'

const Navbar = () => {

    const navigate = useNavigate()
    const [logoutUser, { isLoading, error }] = usePostLogoutUserRequestMutation();
    const handleSignOut = async () => {
      try{
        const response = await logoutUser().unwrap();
        console.log("Logout successful:", response);
        navigate("/login");
      }catch(err){
        console.error("Logout failed:", err);
      }
    }
      

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
        <p onClick={handleSignOut} style={{ cursor: "pointer"}}>{isLoading ? "Signing Out..." : "Sign Out"}</p>
        </div>
    </div>
  )
}

export default Navbar