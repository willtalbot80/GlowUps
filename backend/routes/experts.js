const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Expert = require('../models/Expert');

const expertLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests, please try again later.' }
});

// GET endpoint - retrieve all experts
router.get('/', expertLimiter, async (req, res) => {
    try {
        const experts = await Expert.find();
        res.json(experts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve experts', error: err.message });
    }
});

// POST endpoint - create a new expert
router.post('/', async (req, res) => {
    const { name, bio, expertise, contactInfo } = req.body;
    if (!name || !bio || !expertise || !contactInfo || !contactInfo.email) {
        return res.status(400).json({ message: 'name, bio, expertise, and contactInfo.email are required' });
    }
    try {
        const expert = new Expert({ name, bio, expertise, contactInfo });
        await expert.save();
        res.status(201).json(expert);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create expert', error: err.message });
    }
});

module.exports = router;