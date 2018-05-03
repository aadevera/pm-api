const User = require('mongoose').model('Users');

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