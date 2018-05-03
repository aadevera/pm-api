const Comment = require('mongoose').model('Comments');
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

