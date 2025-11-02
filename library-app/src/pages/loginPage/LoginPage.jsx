import { useState } from "react"
import React from "react"
import "./Login.css"
import { NavLink, useNavigate } from "react-router-dom";
import { usePostLoginRequestMutation } from "../../api/authentication";

function Login() {

    const navigate = useNavigate()
    const [postLoginRequest, {isLoading}] = usePostLoginRequestMutation()

    const [userName, setUsername] = useState("");
    const [passWord, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const loginDetails = {
        username: userName,
        password: passWord
    }

    const handleUserLogin = async(event)=>{
        event.preventDefault()
        setMessage("")
        setMessageType("")

        try{
            const response = await postLoginRequest(loginDetails).unwrap()
            setMessage("Login Successful! Redirecting...")
            setMessageType("success")
            console.log(response)

            if(!response.error){
                console.log("Login Successful:", response)
                if(response.role === "Admin"){
                    navigate("/admin")
                }else{
                    navigate("/user")
                }
            }
        }catch(err){
            console.error("Login Failed:", err)
            setMessage("Login Failed! Please check your credentials.")
            setMessageType("error")
        }
    }

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

                <button onClick={handleUserLogin} disabled={isLoading}>{isLoading ? "Login in..." : "Login"}</button>
                {message && <p className={messageType === "success" ? "success-message" : "error-message"}
                style={{
                color: messageType === "success" ? "green" : "red",
                marginTop: "10px",
              }} >{message}</p>}
                <p>New User? <NavLink to={'/sign'}>Signup</NavLink></p>
            </div>
        </div>
    </>
)

}

export default Login;

// export const userLoader = async () => {
//     const response = await fetch("http://localhost:8080/login");
//     if(!response.ok){
//       throw Error('Could not found job list')
//     }
//     return response.json();
// }