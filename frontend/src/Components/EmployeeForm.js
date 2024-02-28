import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const newErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('https://emp-1bhc.onrender.com/api/employees', formData);
        alert('Employee added successfully!');
        // Clear form fields after successful submission
        setFormData({
          name: '',
          employeeId: '',
          department: '',
          dob: '',
          gender: '',
          designation: '',
          salary: ''
        });
      } catch (error) {
        console.log(error);
        alert('Failed to add employee. Please try again.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Employee Name"
            maxLength={20}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input
            type="number"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            required
          />
          {errors.employeeId && <span className="error">{errors.employeeId}</span>}
        </div>
        <div className="form-group">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Logistics">Logistics</option>
            <option value="Designing">Designing</option>
          </select>
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
              />{' '}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                required
              />{' '}
              Female
            </label>
          </div>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="form-group">
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Manager">Manager</option>
            <option value="Tester">Tester</option>
          </select>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>
        <div className="form-group">
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
          />
          {errors.salary && <span className="error">{errors.salary}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
