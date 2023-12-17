// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/codeial_development');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;

const mongoose = require('mongoose');
const db=mongoose.connection;

// Define the connection URL
const dbURL = 'mongodb://127.0.0.1:27017/Finsta_development';

// Create a Mongoose connection
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

// Export the Mongoose connection (optional)
module.exports = db;
