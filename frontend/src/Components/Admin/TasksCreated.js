import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="container">
      <Link to='/createtask'>
      <button
        className="add-task-button"
      >
        Add Task
      </button>
      </Link>
      <div className="task-container">
        <div className="task-section">
          <h4>Untaken Tasks</h4>
          {tasks.map((task) => (
            !task.taken_emp_id && !task.is_completed && (
              <div key={task.id} className="task-item">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-details">
                  <p className="task-detail-item">Department: {task.department_req}</p>
                  <p className="task-detail-item">Earning: {task.bounty}</p>
                  <p className="task-detail-item">DeadLine: {task.due_date}</p>
                </div>
              </div>
            )
          ))}
        </div>
        <div className="task-section">
          <h4>Taken Tasks</h4>
          {tasks.map((task) => (
            task.taken_emp_id && !task.is_completed && (
              <div key={task.id} className="task-item">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-details">
                  <p className="task-detail-item">Department: {task.department_req}</p>
                  <p className="task-detail-item">Earning: {task.bounty}</p>
                  <p className="task-detail-item">DeadLine: {task.due_date}</p>
                  <p className="task-detail-item">Taken By: {task.taken_emp_id}</p>
                </div>
              </div>
            )
          ))}
        </div>
        <div className="task-section">
          <h4>Completed Tasks</h4>
          {tasks.map((task) => (
            task.is_completed ? (
              <div key={task.id} className="task-item">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-details">
                  <p className="task-detail-item">Department: {task.department_req}</p>
                  <p className="task-detail-item">Earning: {task.bounty}</p>
                  <p className="task-detail-item">DeadLine: {task.due_date}</p>
                  <p className="task-detail-item">Completed by: {task.taken_emp_id}</p>
                </div>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksCreated;
