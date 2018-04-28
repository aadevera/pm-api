const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
   title: String,
   section: String,
   setting: Number,
   posts: [{ type: Schema.ObjectId, ref: 'Post' }],
   students: [{ type: Schema.ObjectId, ref: 'User' }],
   admin: [{ type: Schema.ObjectId, ref: 'User' }],
   classcode: String
});

mongoose.model('Class', ClassSchema);