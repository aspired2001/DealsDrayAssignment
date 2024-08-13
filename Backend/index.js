const express = require('express');
const cors = require('cors'); // Import the cors middleware
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE_PATH = path.join(__dirname, 'employee_data.json');

// Middleware to enable CORS
app.use(cors());

app.use(express.json());

const readDataFromFile = () => {
    try {
        const data = fs.readFileSync(DATA_FILE_PATH);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return [];
    }
};

const writeDataToFile = (data) => {
    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
        console.log('JSON data saved successfully');
        return true;
    } catch (err) {
        console.error('Error writing JSON file:', err);
        return false;
    }
};

app.post('/api/employes', (req, res) => {
    const newEmployee = req.body;
    const employees = readDataFromFile();
    employees.push(newEmployee);
    if (writeDataToFile(employees)) {
        res.status(201).json({ message: 'Employee created successfully' });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/employes', (req, res) => {
    const employees = readDataFromFile();
    res.json(employees);
});

app.get('/api/employes/:id', (req, res) => {
    const id = req.params.id;
    const employees = readDataFromFile();
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

app.put('/api/employes/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const employees = readDataFromFile();
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updateData };
        if (writeDataToFile(employees)) {
            res.json({ message: 'Employee updated successfully' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

app.delete('/api/employes/:id', (req, res) => {
    const id = req.params.id;
    const employees = readDataFromFile();
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    if (employees.length !== updatedEmployees.length) {
        if (writeDataToFile(updatedEmployees)) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
