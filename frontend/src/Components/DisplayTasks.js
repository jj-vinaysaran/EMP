import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
// import './EmployeeTasks.css';
import { UserContext } from './UserContext';


const EmployeeTasks = () => {
  const [tasks, setTasks] = useState([]);
  const {empId} = useContext(UserContext);

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
    <Container>
      <h1 style={{color:"white"}}>Available Tasks</h1>
      <div className="task-container">
        {tasks.map((task) => (
          <Paper key={task.id} className="task-item">
            <Typography className="task-title">{task.title}</Typography>
            <Typography className="task-description">{task.description}</Typography>
            <div className="task-details">
              <Typography className="task-detail-item">Department: {task.department_req}</Typography>
              <Typography className="task-detail-item">Bounty: {task.bounty}</Typography>
              <Typography className="task-detail-item">Due Date: {task.due_date}</Typography>
              {task.taken_emp_id ? (
                <Typography className="task-detail-item">Taken By: {task.taken_emp_id}</Typography>
              ) : (
                <Button
                  variant="contained"
                  disabled={!!task.taken_emp_id}
                  onClick={() => handleTakeTask(task.id, task.department_req)}
                  className="take-task-button"
                >
                  Take Task
                </Button>
              )}
            </div>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default EmployeeTasks;
