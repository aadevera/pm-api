const Comment = require('mongoose').model('Comments');
exports.delete = (req, res) => {
  const _id = req.body._id;

  Comment.remove({ _id }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
}

