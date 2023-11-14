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

// module.exports.destroy=function(req,res)
// {
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user ==req.user.id){

//             let postId=comment.post;
//             comment.remove();

//             Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id},function(err,post){
//                 return res.redirect('back');
//             }})
//         }
//         else{
//             return res.redirect('back');
//         }

//     })
// }

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (comment.user == req.user.id) {
        let postId = comment.post;
        return comment.remove().then(() => {
          return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        });
      } else {
        return Promise.reject("Unauthorized");
      }
    })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.error("Error in deleting comment:", err);
      return res.redirect("back");
    });
};




