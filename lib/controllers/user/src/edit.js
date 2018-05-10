const User = require('mongoose').model('Users');

exports.edit = (req, res) => {
    const _id = req.body._id;
    const data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }

    User.findOneAndUpdate({ _id }, { $set: data }, (err, user) => {
        if (err) return err;
        res.send (user)        
    });
}