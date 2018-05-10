
const passport = require('passport');

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

    //validate form....

    return passport.authenticate('local-login', (err, token, userData) => {
        if (err || !token) {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: err || 'Required Valid Email and Password to Sign-in'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully logged in!',
            token,
            userData
        })
    }) (req, res, next)
}

