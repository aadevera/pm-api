const Post = require('mongoose').model('Posts');
exports.edit = (req, res) => {
    const _id = req.body._id;

    Post.findOneAndUpdate({ _id }, req.body , (err, post) => {
        if (err) {
        } else {
            res.json (post)
        }
    });
}