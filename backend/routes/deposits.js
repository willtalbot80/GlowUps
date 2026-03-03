const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');
const auth = require('../middleware/auth');

// POST / - Create deposit
router.post('/', auth, async (req, res) => {
    try {
        const { expertId, appointmentId, amount, paymentMethod, status } = req.body;
        const deposit = new Deposit({
            clientId: req.user.id,
            expertId,
            appointmentId,
            amount,
            paymentMethod,
            status: status || 'pending'
        });
        await deposit.save();
        res.status(201).json(deposit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET / - Get user deposits
router.get('/', auth, async (req, res) => {
    try {
        const deposits = await Deposit.find({ clientId: req.user.id })
            .populate('expertId', 'firstName lastName email')
            .populate('appointmentId');
        res.json(deposits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /:id - Get deposit
router.get('/:id', auth, async (req, res) => {
    try {
        const deposit = await Deposit.findById(req.params.id)
            .populate('expertId', 'firstName lastName email')
            .populate('appointmentId');
        if (!deposit) return res.status(404).json({ message: 'Deposit not found' });
        if (deposit.clientId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(deposit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /:id - Update deposit status
router.put('/:id', auth, async (req, res) => {
    try {
        const deposit = await Deposit.findById(req.params.id);
        if (!deposit) return res.status(404).json({ message: 'Deposit not found' });
        if (deposit.clientId.toString() !== req.user.id && req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (req.body.status) deposit.status = req.body.status;
        await deposit.save();
        res.json(deposit);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
