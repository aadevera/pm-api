const User = require('mongoose').model('Users');

exports.delete = (req, res) => {
    const _id = req.body._id;

    User.remove({ _id }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
}