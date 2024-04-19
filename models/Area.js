const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    coordinates: { type: [[Number]], required: true }, // Array of coordinates for polygon
    imageUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Area', AreaSchema);
