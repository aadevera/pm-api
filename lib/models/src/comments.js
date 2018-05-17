const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: Schema.ObjectId, ref: 'Users' },
    authorname: String,
    content: String,
    timestamp: { type: Date, default: new Date().toLocaleString() },
    like_count: [{ type: Schema.ObjectId, ref: 'Users' }]
});

mongoose.model('Comments', CommentSchema);