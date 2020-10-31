const mongoose = require('mongoose');
var Message = require('Message');

const forumSchema = new mongoose.Schema({
    idTarget: {type: Schema.Types.ObjectId, ref: 'Group' },
    messages: [Message],
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('foro', forumSchema);