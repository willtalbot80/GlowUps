const express = require('express');
const router = express.Router();

// GET endpoint
router.get('/', (req, res) => {
    res.send('GET request to the experts endpoint');
});

// POST endpoint
router.post('/', (req, res) => {
    res.send('POST request to the experts endpoint');
});

module.exports = router;