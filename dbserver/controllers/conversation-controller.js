const Conversation = require('mongoose').model('Conversation');

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

exports.add = (req, res) => {
  const newConversation = new Conversation(req.body);

  newConversation.save((err, conversation) => {
    if (err) { res.send({}); }
    else {
      res.json(conversation);
    }
  });
}

exports.delete = (req, res) => {
  const _id = req.body._id;

  Conversation.remove({ _id }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}