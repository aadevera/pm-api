const Post = require('mongoose').model('Posts');
exports.delete = (req, res) => {
  const _id = req.body._id;

  Post.remove({ _id }, (err) => {
    if (err) {
        res.send(false);
    } else {
        res.send(true);
    }
  });
}

