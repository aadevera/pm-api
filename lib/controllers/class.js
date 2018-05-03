const Class = require('mongoose').model('Classes');
const request = require('request');

exports.findAll = (req, res) => {
    Class.find({}, (err, cl) => {
        if (err) {
            console.log(err);
            res.send({});
        } else {
            res.send(cl);
        }
    });
}

exports.findById = (req, res) => {
    const _id = req.params._id;

    Class.findOne({ _id }, (err, cl) => {
        if (err) {
            console.log(err);
            res.send({});
        } else {
            res.send(cl);
        }
    });
}

exports.add = (req, res) => {
    const newClass = new Class(req.body);

    newClass.save((err, cl) => {
        if (err) { 
            res.status(403).send('Error Adding new class'); 
        }
        else {
            res.json(cl);
        }
    });
}

exports.delete = (req, res) => {
    const _id = req.body._id;

    Class.remove({ _id }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
}

exports.edit = (req, res) => {
    const _id = req.params._id;

    Class.findOne({ _id }, (err, cl) => {
        if (err) {
            console.log(err);
            res.send({});
        } else {
            // edit class content here
        }
    });
}