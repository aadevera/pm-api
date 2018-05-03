const Conversation = require('mongoose').model('Conversations');
exports.add = (req, res) => {
  const newConversation = new Conversation(req.body);

  newConversation.save((err, conversation) => {
    if (err) { res.send({}); }
    else {
        res.json(conversation);
    }
  });
}
