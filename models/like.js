// Import the Mongoose library
const mongoose = require("mongoose");

// Define a Mongoose schema for the 'Like' model
const likeSchema = new mongoose.Schema({
  // User who performed the like (references ObjectId of the user)
  user: {
    type: mongoose.Schema.ObjectId,
  },
  
  // Liked object (references ObjectId of the liked object)
  likeable: {
    type: mongoose.Schema.ObjectId,
    required: true,
    
    // Dynamic reference for polymorphic associations
    refPath: 'onModel'
  },
  //this field is used for defining the type of the liked object since this is a dynamic reference 
  // Type of the liked object (either 'Post' or 'Comment')
  onModel: {
    type: String,
    required: true,
    
    // Only allow 'Post' or 'Comment' as valid values
    enum: ['Post', 'Comment']
  },
  
}, {
  // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true
});

// Create a Mongoose model named 'Like' based on the 'likeSchema'
const Like = mongoose.model('Like', likeSchema);

// Export the 'Like' model for use in other files
module.exports = Like;
