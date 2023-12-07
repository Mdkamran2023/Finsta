const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = function(req, res) {
//     Post.findById(req.body.post)
//         .then(post => {
//             if (post) {
//                 Comment.create({
//                     content: req.body.content,
//                     post: req.body.post,
//                     user: req.user._id
//                 })
//                 .then(comment => {
//                     // Handle error

//                     post.comments.push(comment);
//                     post.save();

                    

//                     req.flash("success","comments created successfully")
//                     res.redirect('/');
//                 })
//                 .catch(err => {
//                     // Handle comment creation error
//                     req.flash("error",err);
//                     console.error('Error in creating comment:', err);
//                     // Handle the error and send a response
//                 });
//             } else {
//                 // Handle post not found
//             }
//         })
//         .catch(err => {
//             // Handle post retrieval error
//             console.error('Error in finding post:', err);
//             // Handle the error and send a response
//         });
// };

module.exports.create = async function(req, res){

  try{
      let post = await Post.findById(req.body.post);

      if (post){
          let comment = await Comment.create({
              content: req.body.content,
              post: req.body.post,
              user: req.user._id
          });

          post.comments.push(comment);
          post.save();

          if (req.xhr){
              // Similar for comments to fetch the user's id!
              comment = await comment.populate('user', 'name').execPopulate();
  
              return res.status(200).json({
                  data: {
                      comment: comment
                  },
                  message: "Post created!"
              });
          }


          req.flash('success', 'Comment published!');

          res.redirect('/');
      }
  }catch(err){
      req.flash('error', err);
      return;
  }
  
}

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



// module.exports.destroy = function (req, res) {
//   Comment.findById(req.params.id)
//     .then((comment) => {
//       if (!comment) {
//         return res.status(404).send("Comment not found");
//       }

//       // Check if the current user is the owner of the comment
//       if (comment.user.toString() === req.user.id) {
//         let postId = comment.post;

//         // Remove the comment and update the post
//         return Promise.all([
//           // comment.remove(),
//           comment.deleteOne({ _id: req.params.id }),
//           Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
//         ]);
       
//       } else {
//         return Promise.reject("Unauthorized");
//       }
//     })
//     .then(() => {
//       return res.redirect("back");
//     })
//     .catch((err) => {
//       console.error("Error in deleting comment:", err);
//       return res.status(500).send("Internal Server Error");
//     });
// };

module.exports.destroy = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    // Check if the current user is the owner of the comment
    if (comment.user.toString() === req.user.id) {
      const postId = comment.post;

      // Remove the comment and update the post
      await Promise.all([
        comment.deleteOne({ _id: req.params.id }),
        Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
      ]);

          // send the comment id which was deleted back to the views
          if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
              });
            }

     req.flash("success","comment deleted successfully")
      res.redirect("back");
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    console.error("Error in deleting comment:", err);
    res.status(500).send("Internal Server Error");
  }
};





