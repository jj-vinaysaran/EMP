import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Paper, Typography } from '@mui/material';
import { AddCircleOutline, DoneOutline, AssignmentLate } from '@mui/icons-material';
import axios from 'axios';
import './TasksCreated.css';

const TasksCreated = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <Container>
      <Button
        component={Link}
        to="/createtask"
        variant="contained"
        startIcon={<AddCircleOutline />}
        className="add-task-button"
      >
        Add Task
      </Button>
      <div className="task-container">
        <div className="task-section">
          <Typography variant="h4" gutterBottom>Untaken Tasks</Typography>
          {tasks.map((task) => (
            !task.taken_emp_id && !task.is_completed && (
              <Paper key={task.id} className="task-item">
                <Typography className="task-title">{task.title}</Typography>
                <Typography className="task-description">{task.description}</Typography>
                <div className="task-details">
                  <Typography className="task-detail-item">Department: {task.department_req}</Typography>
                  <Typography className="task-detail-item">Earning: {task.bounty}</Typography>
                  <Typography className="task-detail-item">Due Date: {task.due_date}</Typography>
                </div>
              </Paper>
            )
          ))}
        </div>
        <div className="task-section">
          <Typography variant="h4" gutterBottom>Taken Tasks</Typography>
          {tasks.map((task) => (
            task.taken_emp_id && !task.is_completed && (
              <Paper key={task.id} className="task-item">
                <Typography className="task-title">{task.title}</Typography>
                <Typography className="task-description">{task.description}</Typography>
                <div className="task-details">
                  <Typography className="task-detail-item">Department: {task.department_req}</Typography>
                  <Typography className="task-detail-item">Earning: {task.bounty}</Typography>
                  <Typography className="task-detail-item">Due Date: {task.due_date}</Typography>
                  <Typography className="task-detail-item">Taken By: {task.taken_emp_id}</Typography>
                </div>
              </Paper>
            )
          ))}
        </div>
        <div className="task-section">
          <Typography variant="h4" gutterBottom>Completed Tasks</Typography>
          {tasks.map((task) => (
            task.is_completed ? (
              <Paper key={task.id} className="task-item">
                <Typography className="task-title">{task.title}</Typography>
                <Typography className="task-description">{task.description}</Typography>
                <div className="task-details">
                  <Typography className="task-detail-item">Department: {task.department_req}</Typography>
                  <Typography className="task-detail-item">Bounty: {task.bounty}</Typography>
                  <Typography className="task-detail-item">Due Date: {task.due_date}</Typography>
                  <Typography className="task-detail-item">Completed  by : {task.taken_emp_id}</Typography>
                </div>
              </Paper>
            ) : null
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TasksCreated;
