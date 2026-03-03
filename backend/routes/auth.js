'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'glowups_secret';

// POST /register
router.post('/register', async (req, res) => {
    try {
        const { email, password, userType, firstName, lastName, phone, city, state, zipCode } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Email, password, first name and last name are required' });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email: email.toLowerCase(),
            password: hashedPassword,
            userType: userType || 'client',
            firstName,
            lastName,
            phone: phone || '',
            city: city || '',
            state: state || '',
            zipCode: zipCode || ''
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user._id, email: user.email, userType: user.userType, firstName: user.firstName, lastName: user.lastName }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email, userType: user.userType, firstName: user.firstName, lastName: user.lastName }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /profile
router.put('/profile', auth, async (req, res) => {
    try {
        const updates = req.body;
        delete updates.password;
        delete updates.email;

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /logout
router.post('/logout', auth, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;