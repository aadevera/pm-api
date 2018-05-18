// exports.findAll = require('./src/find_all').findAll;
// exports.findById = require('./src/find_by_id').findById;
const User = require('mongoose').model('Users');
const Class = require('mongoose').model('Classes');
const Post = require('mongoose').model('Posts')
const Com = require('mongoose').model('Comments')
const mongoose = require('mongoose')

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
        
        const userEdit = await User.findOneAndUpdate({ _id: userid }, { $set: data }, {new: true})
        const classUpdate = await Class.update({adminid: userEdit._id}, {adminname: userEdit.name}, {multi:true})
        const postUpdate = await Post.update({author: userEdit._id}, {authorname: userEdit.name}, {multi:true})
        const commUpdate = await Com.update({author: userEdit._id}, {authorname: userEdit.name}, {multi:true})
        Promise.all([classUpdate, postUpdate, commUpdate])
            .then ( val => {
                return res.status(200).json({
                    success: true,
                    message: 'Profile edited Successfully'
                })
            })
            // .then(async user => {
            //     console.log(user)
            //     await Class.update({adminid: user._id}, {adminname: user.name}, {multi:true})
            //     await Post.update({author: user._id}, {authorname: user.name}, {multi: true})
            //     await Com.update({author: user._id}, {authorname: user.name}, {multi:true})
                
            //     return res.status(200).json({
            //         success: true,
            //         message: 'Profile edited Successfully'
            //     })
            // })

    }
}