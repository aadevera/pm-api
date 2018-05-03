const Class = require('mongoose').model('Classes');

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

