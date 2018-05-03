const User = require('mongoose').model('Users');

exports.edit = (req, res) => {
    const _id = req.body._id;

    User.findOneAndUpdate({ _id }, req.body , (err, user) => {
        if (err) {
        } else {
            res.json (user)
        }
    });
}