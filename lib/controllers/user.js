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
    findById: async (req, res) => {
        console.log(req.params.userid)
        const findUser = await User.findById({ _id: req.params.userid }).exec()
        return res.status(200).json({
            success: true,
            data: findUser
        })
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
    edit: async (req, res) => {
        const userid= req.body.userid;
        const data = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
    
        return await User.findOneAndUpdate({ _id: userid }, { $set: data });

    }
}