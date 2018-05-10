const User = require('mongoose').model('Users');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({usernameField:'email', passReqToCallback: true }, (req, email, password, next) => {

    // 1. Check if user exists
    // 2. Check if the password is correct
    const userData = {
        email: email.trim(),
        password
    }

    return User.findOne({ email }, (err, user) => {
        if (err) return next(err)
        //no user found
        if (!user) return next('User not found', null, null)
        //wrong password
        if (user.password !== password) return next('Invalid Credentials', null, null)
        //create token
        const tokenPayload = {
            _id: user._id
        }

        const data = {
            name: user.name,
            usertype: user.usertype
        }
        const token = jwt.sign(tokenPayload, 'THIS IS A SECRET')
        return next(null, token, data)
    })
});
