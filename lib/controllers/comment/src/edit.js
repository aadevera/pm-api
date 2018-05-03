const Comment = require('mongoose').model('Comments');
exports.edit = (req, res) => {
    const _id = req.body._id;

    Comment.findOneAndUpdate({ _id }, req.body , (err, comment) => {
        if (err) {
        } else {
            res.json (comment)
        }
    });
}