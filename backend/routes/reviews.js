const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Review = require('../models/Review');

const reviewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests, please try again later.' }
});

// GET endpoint to retrieve all reviews
router.get('/', reviewLimiter, async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve reviews', error: err.message });
    }
});

// POST endpoint to create a new review
router.post('/', async (req, res) => {
    const { expertId, rating, comment } = req.body;
    if (!expertId || rating == null || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'expertId is required and rating must be between 1 and 5' });
    }
    try {
        const review = new Review({ expertId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create review', error: err.message });
    }
});

module.exports = router;