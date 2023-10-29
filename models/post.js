const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, //for saving the data
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //accessing objecId of User
      ref: "User", //refering to User
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
