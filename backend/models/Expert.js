'use strict';

const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String },
    profilePhoto: { type: String },
    certifications: [{ type: String }],
    portfolio: [{ type: String }],
    specialties: [{ type: String }],
    hourlyRate: { type: Number },
    availability: [{ type: String }],
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    address: { type: String },
    serviceRadius: { type: Number, default: 25 },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expert', expertSchema);
