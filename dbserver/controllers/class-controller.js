const Class = require('mongoose').model('Class');

exports.findAll = (req, res) => {
  Class.find({}, (err, classes) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(classes);
    }
  });
}

exports.findById = (req, res) => {
  const _id = req.params._id;

  Class.findOne({ _id }, (err, clasS) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(clasS);
    }
  });
}

exports.add = (req, res) => {
  const newClass = new Class(req.body);

  newClass.save((err, clasS) => {
    if (err) { res.send({}); }
    else {
      res.json(clasS);
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