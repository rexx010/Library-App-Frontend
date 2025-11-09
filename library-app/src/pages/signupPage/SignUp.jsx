import { NavLink, useNavigate } from "react-router-dom"
import { usePostRegisterRequestMutation } from "../../api/authentication";
import { useState } from "react";

export default function SignUp() {

    const navigate = useNavigate();
    const [postRegisterRequest, {isLoading, error}] = usePostRegisterRequestMutation();

    const [userName, setUsername] = useState();
    const [Email, setEmail] = useState();
    const [Role, setRole] = useState();
    const [Password, setPassword] = useState();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const regDetails = {
        username: userName,
        email: Email,
        role: Role,
        password: Password
    }

    const handleUserRegister = async (event) => {
        event.preventDefault();
        setMessage("");
        setMessageType("");
        try {
            const response = await postRegisterRequest(regDetails).unwrap();
            console.log("Registration successful:", response);
            setMessage("Registration Successful! Please login.");
            setMessageType("success");
            navigate("/login");
        } catch (err) {
            console.error("Registration failed:", err);
            let errorMessage = "Registration Failed! Please try again.";
            
            if (err?.data?.error) {
                // Backend returns { error: "message" }
                errorMessage = err.data.error;
            } else if (err?.data?.username) {
                // Validation error for username field
                errorMessage = err.data.username;
            } else if (err?.data?.email) {
                // Validation error for email field
                errorMessage = err.data.email;
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
        <div className="group">
            <div className="log">
                <h2>Sign Up</h2>
                

                <div className="input">
                    <p>User Name</p>
                    <input type="text" required placeholder="Enter your username..." onChange={(event)=>(setUsername(event.target.value))}/>
                </div>
                <div className="input">
                    <p>Email</p>
                    <input type="email" required placeholder="Ladiesman@gmail.com" onChange={(event)=>(setEmail(event.target.value))}/>
                </div>
                <div className="input">
                    <p>Role</p>
                    <select onChange={(event) => setRole(event.target.value)} required defaultValue="" className="role-select">
                        <option value="" disabled>Select a role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>
                <div className="input">
                    <p>Password</p>
                    <input type="password" required placeholder="..." onChange={(event)=>(setPassword(event.target.value))}/>
                </div>
                {/* <a href="#"><p>Forget Password?</p></a>  */}

                <button onClick={handleUserRegister} disabled={isLoading}>{isLoading ? "Registering..." : "Sign up"}</button>
                {message && (
                    <p style={{color: messageType === "success" ? "green" : "red", marginTop: "10px",}}>
                        {message}
                    </p>
                )}
                <p>Already a member? <NavLink to='/login'>Login</NavLink></p>
            </div>
        </div>
        </>
    )
}