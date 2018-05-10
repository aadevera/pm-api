const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('THIS IS A SECRET'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(function(req, res, next) {
// the value of this header can't be a wildcard when header credentials are included
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', Routers.IndexRouter);
app.use('/class', Routers.ClassRouter);
app.use('/comment', Routers.CommentRouter);
app.use('/conversation', Routers.ConversationRouter);
app.use('/message', Routers.MessageRouter);
app.use('/post', Routers.PostRouter);
app.use('/user', Routers.UserRouter);

// passport
const localSignUp = require('./passport/local-signup')
const localLogIn = require('./passport/local-login')
passport.use('local-signup', localSignUp)
passport.use('local-login', localLogIn)
// login routes
const authController = require('./passport/authController');
app.post('/signup', authController.signup)

app.post('/login', authController.login)

module.exports = app;
