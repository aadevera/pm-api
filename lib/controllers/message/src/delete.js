const Message = require('mongoose').model('Messages');
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