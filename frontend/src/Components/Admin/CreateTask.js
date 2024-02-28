import React, { useState } from 'react';
import axios from 'axios';
import './CreateTask.css';

const CreateTask = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const validateStep = () => {
    const { title, description, department_req, bounty, due_date } = formData;
    let isValid = true;
    const newErrors = {};

    if (currentStep === 1 && !title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (currentStep === 2 && !description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (currentStep === 3 && !department_req) {
      newErrors.department_req = 'Department is required';
      isValid = false;
    }

    if (currentStep === 4 && !/^\d+$/.test(bounty.trim()) || parseInt(bounty) <= 0) {
      newErrors.bounty = 'Bounty must be a positive integer';
      isValid = false;
    }

    if (currentStep === 5 && !due_date) {
      newErrors.due_date = 'Due date is required';
      isValid = false;
    } else if (currentStep === 5 && new Date(due_date) <= new Date()) {
      newErrors.due_date = 'Due date must be in the future';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
        try {
            // Send form data to the server
            axios.post('http://localhost:5000/createtask',formData).then(()=>{
            // Reset form data and display success message or redirect
                alert('Task created successfully!');
                setFormData({
                title: '',
                description: '',
                department_req: '',
                bounty: '',
                due_date: ''
                });
                setCurrentStep(1);
            } )
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        }
        }
    }

  return (
    <div className="form-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        {currentStep === 1 && (
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
            <br/>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="form-group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task Description"
              required
            />
            {errors.description && <span className="error">{errors.description}</span>}
            <br/>
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}
        {currentStep === 3 && (
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
            <br/>
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}
        {currentStep === 4 && (
          <div className="form-group">
            <input
              type="text"
              name="bounty"
              value={formData.bounty}
              onChange={handleChange}
              placeholder="Bounty"
              required
            />
            {errors.bounty && <span className="error">{errors.bounty}</span>}
            <br/>
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}
        {currentStep === 5 && (
          <div className="form-group">
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
            {errors.due_date && <span className="error">{errors.due_date}</span>}
            <br/>
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTask;
