
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

  // validation..

    return passport.authenticate('local-signup', (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Unable to sign up'
            })
        }
        //successful sign up
        return res.status(200).json({
            success: true,
            message: 'Successfully signed up!'
        });

    }) (req, res, next)
}

exports.login = (req, res, next) => {

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err || !token) {
            return res.status(400).json({
                success: false,
                message: err || 'Required Valid Email and Password to Sign-in'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Successfully logged in!',
            token: token,
            userData: userData
        })
    }) (req, res, next)
}

exports.getData = (req, res, next) => {
    const authToken = req.cookies['auth-token']

    // if token exists, decode it
    return jwt.verify(authToken, 'secretcode', (err, decoded) => {
        if (err) return res.status(401).json({ success: false })
        
        return res.json({
            success: true,
            data: decoded
        })
    })
}