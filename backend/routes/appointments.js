const express = require('express');
const router = express.Router();

// Sample data store for appointments
let appointments = [];

// GET endpoint to retrieve all appointments
router.get('/', (req, res) => {
    res.json(appointments);
});

// POST endpoint to create a new appointment
router.post('/', (req, res) => {
    const { date, time, description } = req.body;
    const newAppointment = { date, time, description };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

module.exports = router;