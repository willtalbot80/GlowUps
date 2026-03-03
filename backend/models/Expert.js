'use strict';

const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    expertise: {
        type: [String],
        required: true
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
