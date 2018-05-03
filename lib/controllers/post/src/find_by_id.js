const Post = require('mongoose').model('Posts');
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

