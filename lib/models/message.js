const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
   sender: { type: Schema.ObjectId, ref: 'User' },
   recipient: { type: Schema.ObjectId, ref: 'User' },
   title: String,
   conversation: [{ type: Schema.ObjectId, ref: 'Conversation' }],
   unread: Boolean
});

mongoose.model('Message', MessageSchema);