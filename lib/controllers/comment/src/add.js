const Comment = require('mongoose').model('Comments');
exports.add = (req, res) => {
  const newComment = new Comment(req.body);

  newComment.save((err, comment) => {
    if (err) { res.send({}); }
    else {
      res.json(comment);
    }
  });
}
