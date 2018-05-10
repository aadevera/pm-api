const User = require('mongoose').model('Users');

exports.findById = (req, res) => {
    const _id = req.params._id;

    User.findOne({ _id }, (err, user) => {
        if (err) return err
        res.send (user)
    });
    // User.update({ _id }, {$set: {email: 'test@test.com', password: 'test'}}, (err, updatedUser) => {
    //     if (err) return err;
    //     res.send(updatedUser)
    // })
}