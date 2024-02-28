import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Load empId from localStorage if available, otherwise default to null
  const [empId, setEmpId] = useState(localStorage.getItem('empId') || null);

  // Update localStorage whenever empId changes
  useEffect(() => {
    if (empId) {
      localStorage.setItem('empId', empId);
    } else {
      localStorage.removeItem('empId');
    }
  }, [empId]);

  return (
    <UserContext.Provider value={{ empId, setEmpId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
