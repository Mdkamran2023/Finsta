const Post=require("../../../models/post");
const Comment=require("../../../models/comment");

module.exports.index= async function(req,res)
{
let posts=await Post.find({})
.sort('-createdAt')
.populate({
    path:'user',
    select: '-password', //Exclude the password field
})
.populate({
     path:'comments',
     populate:{
        path:'user',
        select:"-password",
     }
});

    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}

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
  
    
        return res.json(200,{
           message:"Post and associated comments deleted successfully !" 
        });
      } 
      else {
       return res.json(401,{
        message:"You cannot delete this post"
       })
      }
    } catch (err) {
        console.log("******",err);
    return res.json(500,{
       message:"Internal Server Error" 
    });
    }
  };