import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { empId } = useContext(UserContext);
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noTasks, setNoTasks] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setIsLoading(true);
      try {
        // Fetch employee details
        const employeeResponse = await axios.get(`https://emp-1bhc.onrender.com/employee/details/${empId}`);
        setEmployeeDetails(employeeResponse.data);

        // Fetch employee tasks
        const tasksResponse = await axios.get(`https://emp-1bhc.onrender.com/employee/tasks/${empId}`);
        setEmployeeTasks(tasksResponse.data);
        
        setNoTasks(tasksResponse.data.length === 0);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
      setIsLoading(false);
    };

    fetchEmployeeData();
  }, [empId]);

  const handleViewTasks = () => {
    navigate('/tasks');
  };

  const handleMarkCompleted = async (taskId) => {
    const confirmMarkCompleted = window.confirm('Are you sure you want to mark this task as completed?');
    if (confirmMarkCompleted) {
      try {
        await axios.put(`https://emp-1bhc.onrender.com/tasks/${taskId}`, { is_completed: true });
        const updatedTasks = employeeTasks.map(task => task.id === taskId ? { ...task, is_completed: true } : task);
        setEmployeeTasks(updatedTasks);
      } catch (error) {
        console.error('Error marking task as completed:', error);
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Employee Profile</h2>
      {isLoading && <p className="loading-message">Loading...</p>}
      <div className="details-container">
        <h3>Employee Details</h3>
        <p><strong>Name:</strong> {employeeDetails.name}</p>
        <p><strong>Employee ID:</strong> {employeeDetails.employeeId}</p>
        <p><strong>Department:</strong> {employeeDetails.department}</p>
        <p><strong>Date of Birth:</strong> {employeeDetails.dob}</p>
        <p><strong>Gender:</strong> {employeeDetails.gender}</p>
        <p><strong>Designation:</strong> {employeeDetails.designation}</p>
        <p><strong>Salary:</strong> {employeeDetails.salary}</p>
        {/* Add more details as needed */}
      </div>
      <div className="tasks-container">
        <h3>Employee Tasks</h3>
        {noTasks ? (
          <p className="no-tasks-message">No tasks available.</p>
        ) : (
          <ul>
            {employeeTasks.map(task => (
              <li key={task.id}>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <p><strong>Department Required:</strong> {task.department_req}</p>
                <p><strong>Bounty:</strong> {task.bounty}</p>
                <p><strong>Due Date:</strong> {task.due_date}</p>
                {/* Add more task details as needed */}
                {task.is_completed ? (
                  <span className="completed-label">Completed</span>
                ) : (
                  <button className="mark-completed-button" onClick={() => handleMarkCompleted(task.id)}>
                    Mark as Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="view-tasks-button" onClick={handleViewTasks}>View Tasks</button>
    </div>
  );
};

export default ProfilePage;
