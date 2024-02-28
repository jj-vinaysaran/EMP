import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
    const navigate = useNavigate();
    return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to the Employee Management System</h1>
        <div className="options">
        <button onClick={()=>navigate('/adminlogin')} className="home-but">
            {/* <i className="fas fa-book-open"></i> */}
            Admin Login
          </button>
          <button onClick={()=>navigate('/login')} className="home-but">
            {/* <i className="fas fa-user-lock"></i> */}
            Employee Login
          </button>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default LandingPage;
