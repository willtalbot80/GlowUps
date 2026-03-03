const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Pricing', pricingSchema);
