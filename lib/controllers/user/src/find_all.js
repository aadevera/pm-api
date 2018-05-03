const User = require('mongoose').model('Users');

exports.findAll = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
            res.send({});
        } else {
            res.json(users);
        }
    });
}