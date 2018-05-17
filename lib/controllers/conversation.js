const Conversation = require('mongoose').model('Conversations');

module.exports = {
    findAll: (req, res) => {
        Conversation.find({}, (err, conversations) => {
          if (err) {
              console.log(err);
              res.send({});
          } else {
              res.send(conversations);
          }
        });
      },
    findById: (req, res) => {
        const _id = req.params._id;
      
        Conversation.findOne({ _id }, (err, conversation) => {
          if (err) {
              console.log(err);
              res.send({});
          } else {
              res.send(conversation);
          }
        });
      },
    add: (req, res) => {
        const newConversation = new Conversation(req.body);
      
        newConversation.save((err, conversation) => {
          if (err) { res.send({}); }
          else {
              res.json(conversation);
          }
        });
      },
    delete: (req, res) => {
        const _id = req.body._id;
    
        Conversation.remove({ _id }, (err) => {
            if (err) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    }
}