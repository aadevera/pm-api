const User = require('mongoose').model('Users');

exports.add = (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) { 
            res.status(400).json({
                success: false,
                message: "Error Signing Up"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Signed Up Successfully!",
                user
            })
        }
    });
}