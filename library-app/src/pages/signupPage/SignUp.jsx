import { NavLink, useNavigate } from "react-router-dom"

export default function SignUp() {

    const navigate = useNavigate()

    return(
        <>
        <div className="group">
            <div className="log">
                <h2>Sign Up</h2>
                

                <div className="input">
                    <p>User Name</p>
                    <input type="text" placeholder="Enter your username..."/>
                </div>
                <div className="input">
                    <p>Email</p>
                    <input type="email" placeholder="Ladiesman@gmail.com"/>
                </div>
                <div className="input">
                    <p>Role</p>
                    <input type="text" placeholder="Admin/user"/>
                </div>
                <div className="input">
                    <p>Password</p>
                    <input type="password" placeholder="..."/>
                </div>
                {/* <a href="#"><p>Forget Password?</p></a>  */}

                <button>Sign up</button>
                <p>Already a member? <NavLink to='/login'><a>Login</a></NavLink></p>
            </div>
        </div>
        </>
    )
}