const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    title: String,
    section: String,
    setting: Number,
    posts: [{ type: Schema.ObjectId, ref: 'Posts' }],
    students: [{ type: Schema.ObjectId, ref: 'Users' }],
    admin: [{ type: Schema.ObjectId, ref: 'Users' }],
    classcode: String
});

mongoose.model('Classes', ClassSchema);