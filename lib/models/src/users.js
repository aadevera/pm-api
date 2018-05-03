const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    name: String,
    password: String,
    usertype: Number,
    classes: [{ type: Schema.ObjectId, ref: 'Classes' }],
    messages: [{ type: Schema.ObjectId, ref: 'Messages' }]
});

mongoose.model('Users', UserSchema);