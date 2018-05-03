const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// setup mongoose connection
const DBURI = 'mongodb://localhost/';
const DBNAME = 'Server'
// mongoose connect
mongoose.connect(DBURI, { dbName: DBNAME } )
    .then(
        function ()     { console.log ('Database Connected ...') }, 
        function(err)   { console.log (err) }
    );

require('./lib/models/index');
const IndexRouter = require('./lib/routes/index');
const ClassRouter = require('./lib/routes/class');
const CommentRouter = require('./lib/routes/comment');
const ConversationRouter = require('./lib/routes/conversation');
const MessageRouter = require('./lib/routes/message');
const PostRouter = require('./lib/routes/post');
const UserRouter = require('./lib/routes/user');

const app = express();
//app.use(logger('dev'));
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', IndexRouter);
app.use('/class', ClassRouter);
app.use('/comment', CommentRouter);
app.use('/conversation', ConversationRouter);
app.use('/message', MessageRouter);
app.use('/post', PostRouter);
app.use('/user', UserRouter);
app.use("*", (req, res) => {
    res.status(404).send('Error 404. Page not Found');
});
module.exports = app;
