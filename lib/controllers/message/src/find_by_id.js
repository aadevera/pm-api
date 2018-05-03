const Message = require('mongoose').model('Messages');
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
