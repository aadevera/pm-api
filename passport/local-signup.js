const mongoose = require('mongoose');
const User = mongoose.model('Users');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, next) => {

    // Ideally validate email, password, other inputs
    
    const userData = {
        email: email.trim(),
        password: password,
        name: req.body.name.trim(),
        usertype: req.body.usertype,
        messages: [],
        classes: []
    }

    const newUser = new User(userData)

    newUser.save((err) => {
        if (err) return next(err)
        return next(null)
    })

})
