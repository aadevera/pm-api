const Message = require('mongoose').model('Messages');

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
