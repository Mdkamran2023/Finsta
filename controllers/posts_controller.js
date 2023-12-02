const Post = require("../models/post");
const Comment = require("../models/comment");

// module.exports.create =  function (req, res) {
//    Post.create({
//     content: req.body.content,
//     user: req.user._id,
//     // to get the data from browser
//   })
//     .then((post) => {
//       // If post creation is successful, redirect back
//       return res.redirect("back");
//     })
//     .catch((err) => {
//       console.error("Error in creating a post:", err);
//       // Handle the error appropriately (e.g., send an error response)
//       // For example:
//       return res.status(500).send("Error in creating a post");
//     });
// };

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
      // to get the data from the browser
    });

if(req.xhr){
  return res.status(200).json({
    data:{
      post:post
    },
    message:"Post Created !"
  });
}

    req.flash('success',"Post Published!");

    // If post creation is successful, redirect back
    return res.redirect("back");
  } catch (err) {
    req.flash('error',err);
    // console.error("Error in creating a post:", err);
    // Handle the error appropriately (e.g., send an error response)
    // For example:
    return res.status(500).send("Error in creating a post");
  }
};


//posts/destroy/id

// module.exports.destroy = function (req, res) {
//   Post.findById(req.params.id, function (err, post) {
//     //.id means converting the object id into string
//     if (post.user == req.user.id) {
//       post.remove();
//       Comment.deleteMany({ post: req.params.id }, function (err) {
//         return res.redirect("back");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

// module.exports.destroy=function(req,res){
//   Post.findById(req.params.id)
//   //.id means converting the object id into string
//   .then((post)=>{
// if(post.user == req.user.id){
//   return post.remove()
//   .then(()=>Comment.deleteMany({post:req.params.id}))
//   .then(()=>res.redirect("back"))
//   .catch((err)=>{
//     console.log("Error deleting comments:",err);
//     res.redirect("back");
//   });
// }else{
//   res.redirect("back");
// }
//   })
//   .catch((err)=>{
//     console.log("Error finding post:",err);
//     res.redirect("back");
//   });
// };


// module.exports.destroy =  function (req, res) {
//  Post.findById(req.params.id)
//     .then((post) => {
//       if (!post) {
//         return res.status(404).send("Post not found");
//       }

//       // Check if the current user is the owner of the post
//       if (post.user.toString() === req.user.id) {
//         // Remove the post and associated comments
//         return Promise.all([
//           Post.deleteOne({ _id: req.params.id }),
//           Comment.deleteMany({ post: req.params.id })
//         ])
//           .then(() => res.redirect("back"))
//           .catch((err) => {
//             console.error("Error deleting comments:", err);
//             res.redirect("back");
//           });
//       } else {
//         return res.status(403).send("Unauthorized");
//       }
//     })
//     .catch((err) => {
//       console.error("Error finding post:", err);
//       res.redirect("back");
//     });
// };

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Check if the current user is the owner of the post
    if (post.user.toString() === req.user.id) {
      // Remove the post and associated comments
      await Promise.all([
        Post.deleteOne({ _id: req.params.id }),
        Comment.deleteMany({ post: req.params.id })
      ]);
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







