const Post = require('mongoose').model('Posts');

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
