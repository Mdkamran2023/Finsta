const Post = require('../models/post');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(post => {
        // If post creation is successful, redirect back
        return res.redirect('back');
    })
    .catch(err => {
        console.error('Error in creating a post:', err);
        // Handle the error appropriately (e.g., send an error response)
        // For example:
        return res.status(500).send('Error in creating a post');
    });
};


