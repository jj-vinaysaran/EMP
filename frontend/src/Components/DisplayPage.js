import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayPage.css';
import { useNavigate } from 'react-router-dom';

const DisplayPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filter, setFilter] = useState({ name: '', employeeId: '', department: '', gender: '', designation: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchEmployees();
  }, [filter]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://emp-1bhc.onrender.com/employees', { params: filter });
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };
 // Function to sort employees by salary
 const sortEmployeesBySalary = () => {
  const sortedEmployees = [...filteredEmployees].sort((a, b) => a.salary - b.salary);
  setFilteredEmployees(sortedEmployees);
};

// Function to sort employees by name
const sortEmployeesByName = () => {
  const sortedEmployees = [...filteredEmployees].sort((a, b) => a.name.localeCompare(b.name));
  setFilteredEmployees(sortedEmployees);
};



  return (
    <div className='display-page'>
       <div className="top-right">
        <button className="add-employee-button" onClick={()=>navigate('/form')}>Add Employee</button>
        </div>
      <h2>Employee Details</h2>
      <div className="filter-options">
        <label>
          Name:
          <input id='filter-input' type="text" name="name" value={filter.name} onChange={handleFilterChange} />
        </label>
        <label>
          Employee ID:
          <input id='filter-input' type="text" name="employeeId" value={filter.employeeId} onChange={handleFilterChange} />
        </label>
        <label>
          Department:
          <select id='filter-input' name="department" value={filter.department} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </label>
        <label>
          Gender:
          <select id='filter-input' name="gender" value={filter.gender} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Designation:
          <select id='filter-input' name="designation" value={filter.designation} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Manager">Manager</option>
          </select>
        </label>
      </div>

      <div className="sort-options">
        <button onClick={sortEmployeesByName}>Sort by Name</button>
        <button onClick={sortEmployeesBySalary}>Sort by Salary</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Designation</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.employeeId}>
              <td>{employee.name}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.department}</td>
              <td>{formatDate(employee.dob)}</td>
              <td>{employee.gender}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredEmployees.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default DisplayPage;
