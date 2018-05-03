const Class = require('mongoose').model('Classes');

exports.edit = (req, res) => {
    const _id = req.body._id;
    Class.findOneAndUpdate({ _id }, req.body , (err, cl) => {
        if (err) {
        } else {
            res.json (cl)
        }
    });
}