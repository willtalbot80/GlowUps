const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Pricing = require('../models/Pricing');
const Appointment = require('../models/Appointment');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// GET / - List experts with filters
router.get('/', async (req, res) => {
    try {
        const { specialty, city, state, zipCode, maxPrice, minRating } = req.query;
        const filter = { userType: 'expert' };

        if (city) filter.city = new RegExp(city, 'i');
        if (state) filter.state = new RegExp(state, 'i');
        if (zipCode) filter.zipCode = zipCode;
        if (specialty) filter.specialties = { $in: [new RegExp(specialty, 'i')] };
        if (maxPrice) filter.hourlyRate = { $lte: Number(maxPrice) };

        let experts = await User.find(filter).select('-password');

        if (minRating) {
            const ratingFilter = Number(minRating);
            const expertIds = experts.map(e => e._id);
            const reviews = await Review.find({ expertId: { $in: expertIds } });
            const avgRatings = {};
            reviews.forEach(r => {
                if (!avgRatings[r.expertId]) avgRatings[r.expertId] = { sum: 0, count: 0 };
                avgRatings[r.expertId].sum += r.rating;
                avgRatings[r.expertId].count += 1;
            });
            experts = experts.filter(e => {
                const data = avgRatings[e._id];
                if (!data) return false;
                return (data.sum / data.count) >= ratingFilter;
            });
        }

        res.json(experts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /search - Search by query string
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        const regex = new RegExp(q, 'i');
        const experts = await User.find({
            userType: 'expert',
            $or: [
                { firstName: regex },
                { lastName: regex },
                { specialties: { $in: [regex] } },
                { city: regex }
            ]
        }).select('-password');

        res.json(experts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /nearby - Find experts near coordinates
router.get('/nearby', async (req, res) => {
    try {
        const { lat, lng, radius = 25 } = req.query;
        if (!lat || !lng) return res.status(400).json({ message: 'lat and lng are required' });

        const experts = await User.find({
            userType: 'expert',
            'coordinates.lat': { $exists: true },
            'coordinates.lng': { $exists: true }
        }).select('-password');

        const userLat = Number(lat);
        const userLng = Number(lng);
        const radiusKm = Number(radius);

        const nearby = experts.filter(expert => {
            if (!expert.coordinates || !expert.coordinates.lat) return false;
            const dLat = (expert.coordinates.lat - userLat) * (Math.PI / 180);
            const dLng = (expert.coordinates.lng - userLng) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(userLat * Math.PI / 180) * Math.cos(expert.coordinates.lat * Math.PI / 180) *
                Math.sin(dLng / 2) ** 2;
            const distKm = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return distKm <= radiusKm;
        });

        res.json(nearby);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /:id - Get expert by user ID
router.get('/:id', async (req, res) => {
    try {
        const expert = await User.findOne({ _id: req.params.id, userType: 'expert' }).select('-password');
        if (!expert) return res.status(404).json({ message: 'Expert not found' });

        const pricing = await Pricing.find({ expertId: req.params.id });
        const portfolio = await Portfolio.find({ expertId: req.params.id });
        const reviews = await Review.find({ expertId: req.params.id }).populate('clientId', 'firstName lastName profilePhoto');

        res.json({ ...expert.toObject(), pricingItems: pricing, portfolioItems: portfolio, reviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /:id/profile - Update expert profile
router.put('/:id/profile', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const updates = req.body;
        delete updates.password;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /:id/portfolio - Add portfolio item
router.post('/:id/portfolio', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const item = new Portfolio({ expertId: req.params.id, ...req.body });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /:id/portfolio/:portfolioId - Delete portfolio item
router.delete('/:id/portfolio/:portfolioId', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await Portfolio.findByIdAndDelete(req.params.portfolioId);
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /:id/pricing - Add/update pricing
router.post('/:id/pricing', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { serviceType } = req.body;
        const existing = await Pricing.findOne({ expertId: req.params.id, serviceType });
        let item;
        if (existing) {
            item = await Pricing.findByIdAndUpdate(existing._id, req.body, { new: true });
        } else {
            item = new Pricing({ expertId: req.params.id, ...req.body });
            await item.save();
        }
        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /:id/appointments - Get expert appointments
router.get('/:id/appointments', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const appointments = await Appointment.find({ expertId: req.params.id })
            .populate('clientId', 'firstName lastName email phone profilePhoto');
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /:id/availability - Set availability
router.put('/:id/availability', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { availability: req.body.availability },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /:id/location - Update location and service radius
router.put('/:id/location', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const { city, state, zipCode, address, serviceRadius, coordinates } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { city, state, zipCode, address, serviceRadius, coordinates },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;