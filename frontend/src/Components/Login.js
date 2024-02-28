import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from './UserContext';

const EmployeeLogin = () => {
    const { empId , setEmpId} = useContext(UserContext);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/employee/login', { employeeId, password });
      // Assuming backend responds with a token or user object upon successful login
      // Redirect user to dashboard or another page
      setEmpId(employeeId);
      console.log("in lofgin",empId);
      navigate('/profile');
    } catch (error) {
      setError('Invalid employee ID or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Employee Login</h2>
      <div className="form-group">
        <label>Employee ID:</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="login-input"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
      </div>
      {error && <div className="login-error">{error}</div>}
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
  );
};

export default EmployeeLogin;
