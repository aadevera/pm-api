const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: { type: Schema.ObjectId, ref: 'Users' },
    recipient: { type: Schema.ObjectId, ref: 'Users' },
    title: String,
    conversation: [{ type: Schema.ObjectId, ref: 'Conversations' }],
    unread: Boolean
});

mongoose.model('Messages', MessageSchema);