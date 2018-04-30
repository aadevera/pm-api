const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   author: { type: Schema.ObjectId, ref: 'User' },
   content: String,
   timestamp: { type: Date, default: Date.now },
   comments: [{ type: Schema.ObjectId, ref: 'Comment' }]
});

mongoose.model('Post', PostSchema);