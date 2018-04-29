// import stuff
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// --- end of import --- //

// initialize express
const app = express();

const DBURI = 'mongodb://localhost/Server';
// mongoose connect with promises instead of callback
mongoose.connect(DBURI, { useMongoClient: true})
  .then(
    () => { console.log ("DB Connected at "+ DBURI + " ...");},
    err => { console.log ("Error connecting to DB at "+ DBURI + " ...") }
  );

// for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Mongoose models
require('./models/index');

// Setup Routes
const UserRouter = require('./routes/user-router');
const ClassRouter = require('./routes/class-router');
const PostRouter = require('./routes/post-router');
const CommentRouter = require('./routes/comment-router');
const MessageRouter = require('./routes/message-router');
const ConversationRouter = require('./routes/conversation-router');

app.use('/user', UserRouter);
app.use('/class', ClassRouter);
app.use('/post', PostRouter);
app.use('/comment', CommentRouter);
app.use('/message', MessageRouter);
app.use('/conversation', ConversationRouter);

// Homepage message
app.get('/', (req, res) => {
  res.send('API is working! And you have nothing to do here.');
});

app.listen(3001, (err) => {
  if (err) { 
    console.log(err); 
  }
  else { 
    console.log('\nMoogle server is running at http://localhost:3001'); 
  }
});

