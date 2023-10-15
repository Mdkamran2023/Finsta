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


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Finsta_development');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}