const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true //for saving the data
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId, //accessing objecId of User
      ref: 'User' //refering to User
    },
    // include the array of ids of all comments in this post schema itself
    comments:[   
  {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }
  ]
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
