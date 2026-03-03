'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['client', 'expert', 'admin'], default: 'client' },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    profilePhoto: { type: String },
    bio: { type: String },
    certifications: [{ type: String }],
    portfolio: [{ type: String }],
    specialties: [{ type: String }],
    hourlyRate: { type: Number },
    availability: [{ type: String }],
    serviceRadius: { type: Number, default: 25 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', userSchema);
