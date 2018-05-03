const Post = require('mongoose').model('Posts');
exports.add = (req, res) => {
  const newPost = new Post(req.body);

    newPost.save((err, post) => {
        if (err) { res.send({}); }
        else {
            res.json(post);
        }
    });
}
