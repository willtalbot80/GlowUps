const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const expertRoutes = require('./routes/experts');
const appointmentRoutes = require('./routes/appointments');
const reviewRoutes = require('./routes/reviews');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/glowups', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
