const Comment = require('mongoose').model('Comment');

exports.findAll = (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(comments);
    }
  });
}

exports.findById = (req, res) => {
  const _id = req.params._id;

  Comment.findOne({ _id }, (err, comment) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(comment);
    }
  });
}

exports.add = (req, res) => {
  const newComment = new Comment(req.body);

  newComment.save((err, comment) => {
    if (err) { res.send({}); }
    else {
      res.json(comment);
    }
  });
}

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