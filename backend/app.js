// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'bde4zoi3bbkeqcmansvo-mysql.services.clever-cloud.com',
  user: 'uota7nkpcyuxj8le',
  password: 'UZtkeO7inb06rx1OhzO1',
  database: 'bde4zoi3bbkeqcmansvo'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});




// Admin credentials
const adminCredentials = {
  username: 'admin',
  password: 'admin123',
  email: 'vinayjayjay12@gmail.com' // Change to the admin's email address
};

// Track login attempts
let loginAttempts = {};

// Endpoint for admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Get IP address
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('IP:', ip);

  // Check if credentials match
  if (username === adminCredentials.username && password === adminCredentials.password) {
    // Successful login, grant access
    res.status(200).json({ message: 'Login successful' });

    // Reset login attempts
    loginAttempts[ip] = 0;
  } else {
    // Invalid credentials, increment login attempt count
    loginAttempts[ip] = loginAttempts[ip] ? loginAttempts[ip] + 1 : 1;

    // Send security alert if login attempts exceed threshold
    if (loginAttempts[ip] >= 1) {
      sendSecurityAlert(ip, adminCredentials.email);
    }

    // Display error message
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Function to send security alert email
function sendSecurityAlert(ip, adminEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vinay05saran03@gmail.com', // your email
      pass: 'nhhj vwzn tprh jrga' // your password
    }
  });

  const mailOptions = {
    from: 'vinay05saran03@gmail.com',
    to: adminEmail,
    subject: 'Security Alert: Multiple Login Attempts Detected',
    text: `Multiple failed login attempts detected from IP address ${ip} at ${new Date()}.`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

const generateRandomPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
};

// POST endpoint for adding employees
app.post('/api/employees', async (req, res) => {
  const { name, employeeId, department, dob, gender, designation, salary } = req.body;
  if (!name || !employeeId || !department || !dob || !gender || !designation || !salary) {
    return res.status(400).json({ message: 'Incomplete data' });
  }
  if (name.length > 30 || salary.length > 8) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  
  const password = generateRandomPassword(); // Generate random password
  const sql =
    'INSERT INTO employees (name, employeeId, department, dob, gender, designation, salary, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [name, employeeId, department, dob, gender, designation, salary, password],
    async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to add employee' });
      }
      
      // Send email to the dummy account
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'vinay05saran03@gmail.com',
            pass: 'nhhj vwzn tprh jrga'
          }
        });

        const mailOptions = {
          from: 'vinay05saran03@gmail.com',
          to: 'jjvinaysaran.it2021@citchennai.net',
          subject: 'Welcome to the company sector',
          html: `<p>Hello,</p><p>Welcome to the company sector. Your employee ID is ${employeeId} and your password is ${password}. Kindly login to the website.</p><p>Website Link: <a href="https://emp.azurewebsites.net/login">Login</a></p>`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }

      res.status(201).json({ message: 'Employee added successfully', password });
    }
  );
});


app.post('/createtask', (req, res) => {
  const { title, description, department_req, bounty, due_date } = req.body;
  const sql = 'INSERT INTO tasks (title, description, department_req, bounty, due_date) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, department_req, bounty, due_date], (err, result) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ message: 'Failed to create task' });
    }
    console.log('Task created successfully');
    res.status(201).json({ message: 'Task created successfully' });
  });
});


// Route to handle GET request for retrieving all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      return res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
    console.log('Tasks retrieved successfully');
    res.status(200).json(results);
  });
});


app.get('/employee/details/:empId', (req, res) => {
  // Assuming the employee ID is passed as a query parameter
  console.log(req.params)
  const employeeId = req.params.empId;
  const sql = 'SELECT * FROM employees WHERE employeeId = ?';
  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(results[0]); // Assuming only one employee with this ID
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;

  const sql = 'UPDATE tasks SET is_completed = ? WHERE id = ?';
  db.query(sql, [is_completed, id], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ message: 'Failed to update task' });
    }
    console.log('Task updated successfully');
    res.json({ message: 'Task updated successfully' });
  });
});

app.get('/employees', (req, res) => {
  const { name, employeeId, department, gender, designation } = req.query;

  // Construct the SQL query dynamically based on the provided query parameters
  let sql = 'SELECT * FROM employees WHERE 1';

  if (name) sql += ` AND name = '${name}'`;
  if (employeeId) sql += ` AND employeeId = '${employeeId}'`;
  if (department) sql += ` AND department = '${department}'`;
  if (gender) sql += ` AND gender = '${gender}'`;
  if (designation) sql += ` AND designation = '${designation}'`;

  // Execute the SQL query and send the results back
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching filtered employees:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(result);
  });
});


app.get('/employee/tasks/:empId', (req, res) => {
  // Assuming the employee ID is passed as a query parameter
  const employeeId = req.params.empId;
  console.log("profile",employeeId);
  const sql = 'SELECT * FROM tasks WHERE taken_emp_id = ?';
  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    console.log(results)
    res.json(results);
  });
});
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { taken_emp_id } = req.body;

  const sql = 'UPDATE tasks SET taken_emp_id = ? WHERE id = ?';

  db.query(sql, [taken_emp_id, id], (err, result) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ message: 'Failed to update task' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully' });
  });
});


app.post('/employee/login', (req, res) => {
  const { employeeId, password } = req.body;

  // Perform database query to check if employeeId and password match
  const sql = 'SELECT employeeId FROM employees WHERE employeeId = ? AND password = ?';
  db.query(sql, [employeeId, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid employee ID or password' });
    }
    res.json({ employeeId: results[0].employeeId });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
