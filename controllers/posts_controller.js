const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      // Directly use lean() without populate()
      post = await Post.findById(post._id).lean().exec();

      return res.status(200).json({
        data: {
          post: post,
        },
        message: 'Post created!',
      });
    }

    req.flash('success', 'Post published!');
    return res.redirect('back');
  } catch (err) {
    req.flash('error', err.message);
    console.log(err);
    return res.redirect('back');
  }
};

module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).send("Post not found");
      }
  
      // Check if the current user is the owner of the post
      if (post.user.toString() === req.user.id) {

         // CHANGE :: delete the associated likes for the post and all its comments' likes too
         await Like.deleteMany({likeable: post, onModel: 'Post'});
         await Like.deleteMany({_id: {$in: post.comments}});



        // Remove the post and associated comments
        await Promise.all([
          Post.deleteOne({ _id: req.params.id }),
          Comment.deleteMany({ post: req.params.id })
        ]);
  
        if(req.xhr){
          return res.status(200).json({
            data:{
              post_id:req.params.id
            },
            message:"Post deleted Successfully !"
          });
        }
        req.flash('success','Post and associated comments deleted');
        
        res.redirect("back");
      } else {
        req.flash('error','You cannot delete this post')
        return res.status(403).send("Unauthorized");
      }
    } catch (err) {
      // console.error("Error:", err);
      req.flash("error",err);
  
      res.redirect("back");
    }
  };
  
