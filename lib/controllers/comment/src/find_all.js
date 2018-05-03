const Comment = require('mongoose').model('Comments');

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

