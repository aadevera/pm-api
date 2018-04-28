const Message = require('mongoose').model('Message');

exports.findAll = (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(messages);
    }
  });
}

exports.findById = (req, res) => {
  const _id = req.params._id;

  Message.findOne({ _id }, (err, message) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(message);
    }
  });
}

exports.add = (req, res) => {
  const newMessage = new Message(req.body);

  newMessage.save((err, message) => {
    if (err) { res.send({}); }
    else {
      res.json(message);
    }
  });
}

exports.delete = (req, res) => {
  const _id = req.body._id;

  Message.remove({ _id }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}