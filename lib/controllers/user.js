// exports.findAll = require('./src/find_all').findAll;
// exports.findById = require('./src/find_by_id').findById;
const User = require('mongoose').model('Users');

module.exports = {
    findAll: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                console.log(err);
                res.send({});
            } else {
                res.json(users);
            }
        });
    },
    findById: (req, res) => {
        return User.findById({ _id: req.params.userid }).exec()
    },
    add: (req, res) => {

        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) { 
                res.status(400).json({
                    success: false
                })
            } else {
                res.status(200).json({
                    success: true,
                    user
                })
            }
        });
    },
    delete: (req, res) => {
        const _id = req.body._id;
    
        User.remove({ _id }, (err) => {
            if (err) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    },
    edit: (req, res) => {
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
}