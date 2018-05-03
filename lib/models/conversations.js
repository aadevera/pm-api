const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    author: { type: Schema.ObjectId, ref: 'Users' },
    content: String,
    timestamp: { type: Date, default: Date.now }
});

mongoose.model('Conversations', ConversationSchema);