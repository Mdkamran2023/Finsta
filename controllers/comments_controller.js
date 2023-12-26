const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue=require("../config/kue");
const commentEmailWorker= require("../workers/comment_email_worker");
const Like = require('../models/like');


module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            // Updated usage with lean()
            comment = await Comment.findById(comment._id).populate('user', 'name email').lean();
            // commentsMailer.newComment(comment);
         let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log("Error in sending to the queue",err);
                    return;
                }
                console.log("job enqueued",job.id);
            })

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment published!"
                });
            }

            req.flash('success', 'Comment published!');
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        return res.redirect('back');
    }
}



module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            req.flash('error', 'Comment not found');
            return res.redirect('back');
        }

        if (comment.user == req.user.id) {
            let postId = comment.post;

            await comment.deleteOne();

            let post = await Post.findByIdAndUpdate(
                postId,
                { $pull: { comments: req.params.id } },
                { new: true }
            );

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id,
                    },
                    message: 'Comment deleted',
                });
            }

            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        return res.redirect('back');
    }
};


