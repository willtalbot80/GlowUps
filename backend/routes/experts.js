const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Expert = require('../models/Expert');

const expertLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

// GET endpoint - retrieve all experts
router.get('/', expertLimiter, async (req, res) => {
    try {
        const experts = await Expert.find();
        res.json(experts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST endpoint - create a new expert
router.post('/', async (req, res) => {
    try {
        const expert = new Expert(req.body);
        const saved = await expert.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PATCH endpoint - update allowBooking preference for an expert
router.patch('/:id/booking-preference', expertLimiter, async (req, res) => {
    try {
        const { allowBooking } = req.body;
        if (typeof allowBooking !== 'boolean') {
            return res.status(400).json({ error: 'allowBooking must be a boolean' });
        }
        const expert = await Expert.findByIdAndUpdate(
            req.params.id,
            { allowBooking },
            { new: true }
        );
        if (!expert) {
            return res.status(404).json({ error: 'Expert not found' });
        }
        res.json(expert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;