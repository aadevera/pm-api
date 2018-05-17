const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    title: String,
    section: String,
    setting: Number,
    posts: [{ type: Schema.ObjectId, ref: 'Posts' }],
    students: [{ type: Schema.ObjectId, ref: 'Users' }],
    adminid: { type: Schema.ObjectId, ref: 'Users' },
    adminname: String,
    classcode: String
});

mongoose.model('Classes', ClassSchema);