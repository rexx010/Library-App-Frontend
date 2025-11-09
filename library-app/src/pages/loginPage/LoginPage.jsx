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
                if(response.role === "ADMIN"){
                    navigate("/admin")
                }else{
                    navigate("/user")
                }
            }
        }catch(err){
            console.error("Login Failed:", err)
            // Extract the error message from the backend response
            let errorMessage = "Login Failed! Please check your credentials.";
            
            if (err?.data?.error) {
                // Backend returns { error: "Username not found" } or { error: "Incorrect password" }
                errorMessage = err.data.error;
            } else if (err?.data?.username) {
                // Validation error for username field
                errorMessage = err.data.username;
            } else if (err?.data?.password) {
                // Validation error for password field
                errorMessage = err.data.password;
            } else if (err?.message) {
                // Generic error message
                errorMessage = err.message;
            }
            
            setMessage(errorMessage);
            setMessageType("error");
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
                    <input type="text" required placeholder="Enter your username..." onChange={(event) => (setUsername(event.target.value))}/>
                </div>
                <div className="input">
                    <p>Password</p>
                    <input type="password" required placeholder="..." onChange={(event) => (setPassword(event.target.value))}/>
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