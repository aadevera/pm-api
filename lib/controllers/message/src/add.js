const Message = require('mongoose').model('Messages');
exports.add = (req, res) => {
  const newMessage = new Message(req.body);

  newMessage.save((err, message) => {
    if (err) { res.send({}); }
    else {
      res.json(message);
    }
  });
}
