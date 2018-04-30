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
        function () { console.log('Database Connected ...') }, 
        function(err) { console.log(err) }
    );

require('./lib/models/index');
const indexRouter = require('./lib/routes/index');
const classRouter = require('./lib/routes/class');
const commentRouter = require('./lib/routes/comment');
const conversationRouter = require('./lib/routes/conversation');
const messageRouter = require('./lib/routes/message');
const postRouter = require('./lib/routes/post');
const userRouter = require('./lib/routes/user');

const app = express();
//app.use(logger('dev'));
//app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/class', classRouter);
app.use('/comment', commentRouter);
app.use('/conversation', conversationRouter);
app.use('/message', messageRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

module.exports = app;
