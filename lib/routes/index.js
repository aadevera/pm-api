var router = require('express').Router()

/* GET home page. */

router.get('/', function(req, res, next) {
    res.send ('Root route. Nothing to do here.');
});

module.exports = {
    IndexRouter : router,
    ClassRouter : require('./src/class'),
    CommentRouter : require('./src/comment'),
    ConversationRouter : require('./src/conversation'),
    MessageRouter : require('./src/message'),
    PostRouter : require('./src/post'),
    UserRouter : require('./src/user')
}
