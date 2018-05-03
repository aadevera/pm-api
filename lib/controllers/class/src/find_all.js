const Class = require('mongoose').model('Classes');

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
