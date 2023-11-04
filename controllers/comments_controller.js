// const Comment=require('../models/comment');
// const Post=require('../models/post');

// module.exports.create=function(req,res){
//     Post.findById(req.body.post,function(err,post){
//       if(post)
//       {
//         Comment.create({
//             content:req.body.content,
//             post:req.body.post,
//             user:req.user._id
//         },function(err,comment){
//             //handle error
// post.comments.push(comment);
// post.save();

// res.redirect('/');
//         })
//       }  
//     })
// }

// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(req, res) {
//     let foundPost; // Define a variable to hold the found post

//     Post.findById(req.body.post)
//         .then((post) => {
//             if (!post) {
//                 return Promise.reject('Post not found');
//             }
//             foundPost = post; // Assign the found post to the variable
//             return Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });
//         })
//         .then((comment) => {
//             if (!comment) {
//                 return Promise.reject('Error creating comment');
//             }
//             foundPost.comments.push(comment); // Use the found post to push the comment
//             return foundPost.save(); // Save the post
//         })
//         .then(() => {
//             res.redirect('/');
//         })
//         .catch((err) => {
//             console.error('Error in creating comment:', err);
//             return res.status(500).send('Error creating comment');
//         });
// };

const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res) {
    const findPost = new Promise((resolve, reject) => {
        Post.findById(req.body.post, (err, post) => {
            if (err) {
                reject(err);
            } else {
                resolve(post);
            }
        });
    });

    findPost.then(post => {
        if (post) {
            return new Promise((resolve, reject) => {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }, (err, comment) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ post, comment });
                    }
                });
            });
        }
    })
    .then(({ post, comment }) => {
        post.comments.push(comment);
        return new Promise((resolve, reject) => {
            post.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.error('Error in creating comment:', err);
        return res.status(500).send('Error creating comment');
    });
};




