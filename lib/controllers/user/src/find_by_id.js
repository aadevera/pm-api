const User = require('mongoose').model('Users');

exports.findById = (req, res) => {
    const _id = req.params._id;

    User.findOne({ _id }, (err, user) => {
        if (err) {
            console.log(err);
            res.send({});
        } else {
            res.send(user);
        }
    });
}