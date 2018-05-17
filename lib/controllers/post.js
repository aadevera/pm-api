const Post = require('mongoose').model('Posts');
const Class = require('mongoose').model('Classes');
const Comment = require('mongoose').model('Comments');
const User = require('mongoose').model('Comments');
const mongoose = require('mongoose');

module.exports = {
    findAll: async (req, res) => {
        try {
            const classId = req.params.classid;
            const classExist = await Class.findById({ _id: classId });
            // same //const test = await User.findById({ _id: userId }).exec();
            var promises = classExist.posts.map(id => Post.findById({ _id: id }).exec() );
            var allPosts = await Promise.all(promises);

            /* promises = allPosts.map (post => {
                var response = fetch ('http://localhost:8000/user/find-by-id/' + i.author)
                var result = response.json()
                post['authorName'] = result.name
                return post
            })
            console.log(promises)
            allPosts = await Promise.all(promises) */

            
            return res.status(200).json ({
                success: true,
                data: allPosts
            })
        }
        catch(e) {
            console.log('error is catched')
            console.log(Error(e))
            return res.status(400).json ({
                success: false,
                message: 'Error getting all posts.'
            })
        }         
    },
    findById: (req, res) => {
        const postid = req.params.postid;
        return Post.findById({ _id: postid }).exec();
    },
    add: (req, res) => {
        const classid = req.params.classid;
        // TODO CHECK IF CLASSCODE IS REPEATED
        const data = {
            comments: [],
            authorname: req.body.authorname,
            author: req.body.author,
            content: req.body.content
            // put date here
        }
        const newPost = new Post(data);
        newPost.save((err, item) => {
            if (err) { 
                return res.status(403).json({
                    success: false, 
                    message: 'Error Creating Post'
                }); 
            }
            else {
                Class.update({ _id: classid }, { $push: {posts: item._id} }, (err, updatedClass) => {
                    if (err) return res.status(403).json ({
                        success: false
                    })
                    else {
                        return res.json({
                            success: true,
                            message: 'Post created Successfully'
                        })
                    }        
                });
            }
        });
    },
    delete: async (req, res) => {
        const postid = req.body.postid;
        const classid = req.body.classid
        
        await Class.update(
            {_id: mongoose.Types.ObjectId(classid)}, 
            {$pullAll: { posts: [mongoose.Types.ObjectId(postid)] }},
            {multi: true}
        )
        await Post.remove ({_id: mongoose.Types.ObjectId(postid)})
        return res.status(200).json({
            success: true,
            message: 'Successfully Deleted Post'
        })
    },
    edit: (req, res) => {
        const _id = req.body._id;
    
        Post.findOneAndUpdate({ _id }, req.body , (err, post) => {
            if (err) {
            } else {
                res.json (post)
            }
        });
    }
}