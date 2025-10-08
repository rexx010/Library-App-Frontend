import { useState } from "react"
import React from "react"
import "./Login.css"
import { NavLink, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    const [userName, setUsername] = useState("");
    const [passWord, setPassword] = useState("");

    const handleUserLogin = () => {
        navigate("/user")
    }

    const loginDetails = {
        username: userName,
        password: passWord
    }

    console.log(loginDetails)
    return(
    <>
        <div className="cent">
            <div className="log">
                <h2>Login</h2>
                <p>Welcome back! Please login to your account.</p>

                <div className="input">
                    <p>User Name</p>
                    <input type="text" placeholder="Enter your username..." onChange={(event) => (setUsername(event.target.value))}/>
                </div>
                <div className="input">
                    <p>Password</p>
                    <input type="password" placeholder="..." onChange={(event) => (setPassword(event.target.value))}/>
                </div>
                <a href="#"><p>Forget Password?</p></a> 

                <button onClick={handleUserLogin}>Login</button>
                <p>New User? <NavLink to={'/sign'}><a>Signup</a></NavLink></p>
            </div>
        </div>
    </>
)

}

export default Login;