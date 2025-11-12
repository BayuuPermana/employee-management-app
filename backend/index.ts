import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Employee from './models/Employee'; // Import the Employee model

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_management')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Routes ---
app.get('/', (req, res) => {
  res.send('Employee Management API is running');
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(employee);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  const { name, position, department } = req.body;
  const newEmployee = new Employee({ name, position, department });
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, position, department } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, position, department },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(updatedEmployee);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ message: 'Employee deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
