const Conversation = require('mongoose').model('Conversations');
exports.delete = (req, res) => {
    const _id = req.body._id;

    Conversation.remove({ _id }, (err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
}