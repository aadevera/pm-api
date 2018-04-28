const Post = require('mongoose').model('Post');

exports.findAll = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(posts);
    }
  });
}

exports.findById = (req, res) => {
  const _id = req.params._id;

  Post.findOne({ _id }, (err, post) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(post);
    }
  });
}

exports.add = (req, res) => {
  const newPost = new Post(req.body);

  newPost.save((err, post) => {
    if (err) { res.send({}); }
    else {
      res.json(post);
    }
  });
}

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