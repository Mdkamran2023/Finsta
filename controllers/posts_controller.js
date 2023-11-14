const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
    // to get the data from browser
  })
    .then((post) => {
      // If post creation is successful, redirect back
      return res.redirect("back");
    })
    .catch((err) => {
      console.error("Error in creating a post:", err);
      // Handle the error appropriately (e.g., send an error response)
      // For example:
      return res.status(500).send("Error in creating a post");
    });
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

module.exports.destroy=function(req,res){
  Post.findById(req.params.id)
  //.id means converting the object id into string
  .then((post)=>{
if(post.user == req.user.id){
  return post.remove()
  .then(()=>Comment.deleteMany({post:req.params.id}))
  .then(()=>res.redirect("back"))
  .catch((err)=>{
    console.log("Error deleting comments:",err);
    res.redirect("back");
  });
}else{
  res.redirect("back");
}
  })
  .catch((err)=>{
    console.log("Error finding post:",err);
    res.redirect("back");
  });
};






