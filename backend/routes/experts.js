'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const Expert = require('../models/Expert');

const router = express.Router();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' }
});

// GET all experts (supports optional ?name= filter)
router.get('/', apiLimiter, async (req, res) => {
    try {
        const filter = {};
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }
        const experts = await Expert.find(filter).sort({ createdAt: -1 });
        res.json(experts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET single expert by ID
router.get('/:id', apiLimiter, async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.json(expert);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create a new expert
router.post('/', apiLimiter, async (req, res) => {
    try {
        const { name, bio, expertise, contactInfo } = req.body;
        if (!name || !bio || !expertise || !contactInfo) {
            return res.status(400).json({ message: 'name, bio, expertise, and contactInfo are required' });
        }
        const expert = new Expert({ name, bio, expertise, contactInfo });
        await expert.save();
        res.status(201).json(expert);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
