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

exports.add = (req, res) => {
    const newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) { 
            res.send({}); 
        }
        else {
            res.json(user);
        }
    });
}

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

exports.edit = (req, res) => {
    const _id = req.params._id;

    Users.findOne({ _id }, (err, user) => {
        if (err) {
            console.log(err);
            res.send({});
        } else {
            // edit user content here
        }
    });
}