'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const Review = require('../models/Review');

const router = express.Router();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' }
});

// GET all reviews (supports optional ?expertId= filter)
router.get('/', apiLimiter, async (req, res) => {
    try {
        const filter = {};
        if (req.query.expertId) {
            filter.expertId = req.query.expertId;
        }
        const reviews = await Review.find(filter).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create a new review
router.post('/', apiLimiter, async (req, res) => {
    try {
        const { expertId, rating, comment } = req.body;
        if (!expertId || rating === undefined) {
            return res.status(400).json({ message: 'expertId and rating are required' });
        }
        const review = new Review({ expertId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
