const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// POST / - Create appointment
router.post('/', auth, async (req, res) => {
    try {
        const { expertId, date, time, duration, service, notes, location } = req.body;
        const appointment = new Appointment({
            clientId: req.user.id,
            expertId,
            date,
            time,
            duration,
            service,
            notes,
            location
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET / - Get user appointments
router.get('/', auth, async (req, res) => {
    try {
        const { userType, id } = req.user;
        let appointments;
        if (userType === 'expert') {
            appointments = await Appointment.find({ expertId: id })
                .populate('clientId', 'firstName lastName email phone profilePhoto')
                .populate('expertId', 'firstName lastName email profilePhoto');
        } else {
            appointments = await Appointment.find({ clientId: id })
                .populate('expertId', 'firstName lastName email phone profilePhoto specialties');
        }
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /:id - Get appointment
router.get('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('clientId', 'firstName lastName email phone')
            .populate('expertId', 'firstName lastName email phone specialties');
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const userId = req.user.id;
        if (appointment.clientId._id.toString() !== userId && appointment.expertId._id.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /:id - Update appointment status
router.put('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const userId = req.user.id;
        if (appointment.clientId.toString() !== userId && appointment.expertId.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        Object.assign(appointment, req.body);
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /:id - Cancel appointment
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const userId = req.user.id;
        if (appointment.clientId.toString() !== userId && appointment.expertId.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        res.json({ message: 'Appointment cancelled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;