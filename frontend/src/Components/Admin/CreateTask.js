import React, { useState } from 'react';
import axios from 'axios';
import './CreateTask.css';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department_req: '',
    bounty: '',
    due_date: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('https://emp-1bhc.onrender.com/createtask', formData);
        alert('Task created successfully!');
        setFormData({
          title: '',
          description: '',
          department_req: '',
          bounty: '',
          due_date: ''
        });
      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.');
      }
    }
  };

  const validateForm = () => {
    const { title, description, department_req, bounty, due_date } = formData;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!department_req) {
      newErrors.department_req = 'Department is required';
    }

    if (!/^\d+$/.test(bounty.trim()) || parseInt(bounty) <= 0) {
      newErrors.bounty = 'Bounty must be a positive integer';
    }

    if (!due_date) {
      newErrors.due_date = 'Due date is required';
    } else if (new Date(due_date) <= new Date()) {
      newErrors.due_date = 'Due date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="form-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            maxLength={255}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <select
            name="department_req"
            value={formData.department_req}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            {/* Add more options as needed */}
          </select>
          {errors.department_req && <span className="error">{errors.department_req}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="bounty"
            value={formData.bounty}
            onChange={handleChange}
            placeholder="Earnings"
            required
          />
          {errors.bounty && <span className="error">{errors.bounty}</span>}
        </div>
        <div className="form-group">
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
          {errors.due_date && <span className="error">{errors.due_date}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTask;
