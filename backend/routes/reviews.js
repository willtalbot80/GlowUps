const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// POST / - Create review
router.post('/', auth, async (req, res) => {
    try {
        const { expertId, appointmentId, rating, comment } = req.body;
        const review = new Review({
            clientId: req.user.id,
            expertId,
            appointmentId,
            rating,
            comment
        });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /expert/:expertId - Get expert reviews
router.get('/expert/:expertId', async (req, res) => {
    try {
        const reviews = await Review.find({ expertId: req.params.expertId })
            .populate('clientId', 'firstName lastName profilePhoto');
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /:id - Get specific review
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('clientId', 'firstName lastName profilePhoto');
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /:id - Update review
router.put('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { rating, comment } = req.body;
        if (rating) review.rating = rating;
        if (comment !== undefined) review.comment = comment;
        await review.save();
        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;