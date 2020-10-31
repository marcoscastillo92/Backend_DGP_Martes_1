const mongoose = require('mongoose');

const messagemessageSchema = new mongoose.Schema({
    body: {type: String },
    author: {type: Schema.Types.ObjectId, ref: 'User' },
    mimeType,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('message', messageSchema);