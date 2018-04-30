const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
   author: { type: Schema.ObjectId, ref: 'User' },
   content: String,
   timestamp: { type: Date, default: Date.now },
   like_count: [{ type: Schema.ObjectId, ref: 'User' }]
});

mongoose.model('Comment', CommentSchema);