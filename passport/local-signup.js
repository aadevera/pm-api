const mongoose = require('mongoose');
const User = mongoose.model('Users');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {

    // Ideally validate email, password, other inputs

    const userData = {
        username: username.trim(),
        password: password,
        name: req.body.name.trim()
    }

    const newUser = new User(userData)

    newUser.save((err) => {
        if (err) return next(err)

        return next(null)
    })

})
