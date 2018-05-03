const Class = require('mongoose').model('Classes');
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

