const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    paymentMethod: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deposit', depositSchema);
