const Conversation = require('mongoose').model('Conversations');

exports.findAll = (req, res) => {
  Conversation.find({}, (err, conversations) => {
    if (err) {
        console.log(err);
        res.send({});
    } else {
        res.send(conversations);
    }
  });
}

