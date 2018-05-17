const jwt = require('jsonwebtoken');
const User = require('mongoose').model('Users');
const Cookies = require('universal-cookie');

module.exports = (req, res, next) => { 
    // check if preflight request
    if (req.method === 'OPTIONS') return next();

    // check if token is present
    // console.log('@/auth check')

    const authToken = req.cookies['auth-token']
    if (!authToken) res.status(401).json({ success: false, message: 'auth-token does not exist'});

    // if token exists, decode it
    return jwt.verify(authToken, 'secretcode', (err, decoded) => {

        if (err) return res.status(401).json({ success: false, message: 'cannot decode token' })
        return User.findById ({ _id: decoded._id } , (err, user) => {
            if (err || !user) {
                return res.status(401).json({ success: false, message: 'user does not exist'})
            }         
            console.log('Success: GetData')
            return next()
        })
    })
}
