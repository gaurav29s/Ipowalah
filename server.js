// server.js - New Backend Setup for IPOWALAH with MySQL

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// User Registration
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(401).json({ error: 'User not found' });
        
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
});

// Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Message submitted successfully' });
    });
});

// Feedback Submission
app.post('/api/feedback', (req, res) => {
    const { user_id, feedback } = req.body;
    const sql = "INSERT INTO feedback (user_id, feedback) VALUES (?, ?)";
    db.query(sql, [user_id, feedback], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Feedback submitted successfully' });
    });
});

// Search Functionality
app.get('/api/search', (req, res) => {
    const { query } = req.query;
    const sql = "SELECT * FROM stocks WHERE name LIKE ?";
    db.query(sql, [`%${query}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Modify Table Data
app.put('/api/table/:id', (req, res) => {
    const { id } = req.params;
    const { column, value } = req.body;
    const sql = `UPDATE stocks SET ${column} = ? WHERE id = ?`;
    db.query(sql, [value, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Data updated successfully' });
    });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
