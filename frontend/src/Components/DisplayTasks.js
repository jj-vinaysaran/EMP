import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './DisplayTasks.css'; // Import CSS file for styling
import { UserContext } from './UserContext';

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { empId } = useContext(UserContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTakeTask = async (taskId, departmentReq) => {
    const response = await axios.get(`http://localhost:5000/${empId}`);
    const employeeDepartment = response.data.department;

    // Check if the employee's department matches the department required by the task
    if (employeeDepartment !== departmentReq) {
      alert('Choose tasks of your department.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { taken_emp_id: getCurrentUserId() });
      fetchTasks();
    } catch (error) {
      console.error('Error taking task:', error);
    }
  };

  const getCurrentUserId = () => {
    // Logic to get current user id (employee id) goes here
    return empId; // For demonstration, replace this with actual logic
  };

  return (
    <div className="container">
      <h1 className="heading">Available Tasks</h1>
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h2 className="task-title">{task.title}</h2>
            <p className="task-description">{task.description}</p>
            <div className="task-details">
              <p className="task-detail-item">Department: {task.department_req}</p>
              <p className="task-detail-item">Earning: {task.bounty}</p>
              <p className="task-detail-item">Deadline: {task.due_date}</p>
              {task.taken_emp_id ? (
                <p className="task-detail-item">Taken By: {task.taken_emp_id}</p>
              ) : (
                <button
                  className="take-task-button"
                  disabled={!!task.taken_emp_id}
                  onClick={() => handleTakeTask(task.id, task.department_req)}
                >
                  Take Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTasks;
