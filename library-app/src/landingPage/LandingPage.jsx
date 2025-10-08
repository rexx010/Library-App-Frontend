import { useNavigate } from "react-router-dom"
import "./landingPage.css"
import React from 'react'

const LandingPage = () => {

    const navigate = useNavigate()

  return (
    <div>
      <div className="main">
        <p>Discover. Learn. Grow</p>
        <h2>Learning</h2>
        <h3>Hub</h3>
        <p>Thousands of books, journals, and digital resources at your fingertips.</p>
      </div>

      <div className="login">
        <p>Already have an account?</p>
        <button onClick={() => navigate('/login')}>Log In</button>
      </div>
      <div className="signup">
        <button onClick={() => navigate('/sign')}>Sign Up</button>
        <p>New here?</p>
      </div>
    </div>
  )
}

export default LandingPage