const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                .then(comment => {
                    // Handle error

                    post.comments.push(comment);
                    post.save();

                    res.redirect('/');
                })
                .catch(err => {
                    // Handle comment creation error
                    console.error('Error in creating comment:', err);
                    // Handle the error and send a response
                });
            } else {
                // Handle post not found
            }
        })
        .catch(err => {
            // Handle post retrieval error
            console.error('Error in finding post:', err);
            // Handle the error and send a response
        });
};




