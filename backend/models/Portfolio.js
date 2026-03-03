const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    category: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
