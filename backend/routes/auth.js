'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: { message: 'Too many requests, please try again later.' }
});

// Register endpoint
router.post('/register', authLimiter, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

// Login endpoint
router.post('/login', authLimiter, async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not set' });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            secret,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

module.exports = router;