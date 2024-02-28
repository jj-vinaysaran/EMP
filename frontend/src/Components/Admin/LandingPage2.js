import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage2.css'; // Import CSS file for styling

const LandingPage2 = () => {
    const navigate = useNavigate();
    return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to the Employee Management System</h1>
        <div className="options">
        <button onClick={()=>navigate('/display')} className="home-but">
            {/* <i className="fas fa-book-open"></i> */}
            Employee Details
          </button>
          <button onClick={()=>navigate('/taskscreated')} className="home-but">
            {/* <i className="fas fa-user-lock"></i> */}
            Task Details
          </button>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default LandingPage2;
