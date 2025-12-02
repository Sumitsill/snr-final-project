require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for Data URLs
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('.')); // Serve static files from current directory

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// --- Routes ---

// Signup
app.post('/api/signup', (req, res) => {
    const { name, email, userId, password } = req.body;
    const sql = 'INSERT INTO users (name, email, userId, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, userId, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Signup failed' });
        }
        res.json({ message: 'User registered successfully' });
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { userId, password } = req.body;
    const sql = 'SELECT * FROM users WHERE userId = ? AND password = ?';
    db.query(sql, [userId, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Login failed' });
        }
        if (results.length > 0) {
            const user = results[0];
            // Don't send password back
            delete user.password;
            res.json({ user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Get User Profile
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Fetch failed' });
        }
        if (results.length > 0) {
            const user = results[0];
            delete user.password;
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Update User Profile
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, bio, contactEmail, phone, instagram, linkedin, profilePic } = req.body;
    const sql = `UPDATE users SET 
        name = ?, bio = ?, contactEmail = ?, phone = ?, instagram = ?, linkedin = ?, profilePic = ? 
        WHERE userId = ?`;

    db.query(sql, [name, bio, contactEmail, phone, instagram, linkedin, profilePic, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Update failed' });
        }
        res.json({ message: 'Profile updated successfully' });
    });
});

// Upload Media
app.post('/api/media', (req, res) => {
    const { userId, type, category, title, description, src, isBest, contributor } = req.body;
    const sql = `INSERT INTO media 
        (user_id, type, category, title, description, src, is_best, contributor) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [userId, type, category, title, description, src, isBest, contributor], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Upload failed' });
        }
        res.json({ message: 'Media uploaded successfully', id: result.insertId });
    });
});

// Get Media
app.get('/api/media', (req, res) => {
    const sql = 'SELECT * FROM media ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Fetch failed' });
        }
        // Convert is_best from 0/1 to boolean for frontend compatibility
        const media = results.map(item => ({
            ...item,
            isBest: !!item.is_best,
            userId: item.user_id // Map back to camelCase for frontend
        }));
        res.json(media);
    });
});

// Delete Media
app.delete('/api/media/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM media WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Delete failed' });
        }
        res.json({ message: 'Media deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
