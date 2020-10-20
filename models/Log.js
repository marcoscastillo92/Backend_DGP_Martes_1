const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    source: {type: String},
    message: {type: String},
    data: {type: Object},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('logs', logSchema);