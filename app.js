const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
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
const Routers = require('./lib/routes/index');
const app = express();
//app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Routers.IndexRouter);
app.use('/class', Routers.ClassRouter);
app.use('/comment', Routers.CommentRouter);
app.use('/conversation', Routers.ConversationRouter);
app.use('/message', Routers.MessageRouter);
app.use('/post', Routers.PostRouter);
app.use('/user', Routers.UserRouter);
app.use("*", (req, res) => {
    res.status(404).send('Error 404. Page not Found');
});
module.exports = app;
