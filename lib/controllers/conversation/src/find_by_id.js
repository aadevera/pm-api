const Conversation = require('mongoose').model('Conversations');
exports.findById = (req, res) => {
  const _id = req.params._id;

  Conversation.findOne({ _id }, (err, conversation) => {
    if (err) {
        console.log(err);
        res.send({});
    } else {
        res.send(conversation);
    }
  });
}
