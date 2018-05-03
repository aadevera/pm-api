const Class = require('mongoose').model('Classes');
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

