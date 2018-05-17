const Comment = require('mongoose').model('Comments');
const Post = require('mongoose').model('Posts')
const User = require('mongoose').model('Users')
var num = 0
module.exports = {
    findAll: async (req, res) => {
        console.log('Entering Comments')
        const postid = req.params.postid
        console.log('POST ID: ' + postid)
        try {
            const postExists = await Post.findById({_id: postid}).exec()
            //ERROR below HERE
            const promises = postExists.comments.map(comment => { return Comment.findById({_id: comment }).exec() });
            const allComments = await Promise.all(promises);
            // const getAuthor = allComments.map (async comment => {
            //     var author = await User.findById ({ _id: comment.author }).exec()
            //     var obj = comment
                
            //     obj.authorname = author.name
            //     console.log(obj)
            //     return comment
            // })
            return res.status(200).json({
                success: true,
                data: allComments
            })
            
            // Promise.all(getAuthor)
            //     .then ( comments => {

                        
            //         })
            
        } catch (e) {
            throw new Error (e)
        }
        

    },
    findById: (req, res) => {
        const _id = req.params._id;
    
        return Comment.findOne({ _id }, (err, comment) => {
            if (err) {
                console.log(err);
                res.send({});
            } else {
                res.send(comment);
            }
        });
    },
    add: (req, res) => {
        console.log(req.params)
        const postid = req.params.postid;
        const data = {
            authorname: req.body.authorname,
            like_count: req.body.like_count,
            author: req.body.author,
            content: req.body.content
            // put date here
        }
        const newComment = new Comment(data);
        newComment.save((err, item) => {
            if (err) return res.status(403).json({ success: false, message: 'Error Creating Comment' }); 
            else {
                Post.update({ _id: postid }, { $push: { comments: item._id} }, (err, updatedPost) => {
                    if (err) return res.status(403).json ({ success: false })
                    else return res.status(200).json({ success: true, message: 'Commented Successfully' })
                          
                });
            }
        });
    },
    delete: (req, res) => {
        const _id = req.body._id;
      
        Comment.remove({ _id }, (err) => {
            if (err) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    },
    edit: (req, res) => {
        const _id = req.body._id;
    
        Comment.findOneAndUpdate({ _id }, req.body , (err, comment) => {
            if (err) {
            } else {
                res.json (comment)
            }
        });
    }
}