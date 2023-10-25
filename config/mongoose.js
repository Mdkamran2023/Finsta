// const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/Finsta_development');

// const db=mongoose.connection;

// db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

// db.once('open',function(){
//     console.log('Connected to Database :: MongoDB');   
// });

// module.exports=db;

// const mongoose = require('mongoose');

// const db=mongoose.connection;
// mongoose
//   .connect('mongodb://localhost/Finsta_development', {
//   })
//   .then(() => {
//     console.log('Connected to Database :: MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB', error);
//   });

// mongoose.connection.on('error', (error) => {
//   console.error('Mongoose connection error:', error);
// });

// module.exports = db;


// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Finsta_development');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// const mongoose = require('mongoose');

// main()
//   .then(() => console.log('Connected to the database'))
//   .catch(err => console.error('Error connecting to the database', err));

// function main() {
//   return new Promise((resolve, reject) => {
//     mongoose.connect('mongodb://127.0.0.1:27017/Finsta_development', { useNewUrlParser: true, useUnifiedTopology: true });

//     mongoose.connection.once('open', () => {
//       resolve();
//     });

//     mongoose.connection.on('error', (err) => {
//       reject(err);
//     });
//   });
// }


const mongoose = require('mongoose');
const db=mongoose.connection;

// Define the connection URL
const dbURL = 'mongodb://127.0.0.1:27017/Finsta_development';

// Create a Mongoose connection
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

// Export the Mongoose connection (optional)
module.exports = db;
