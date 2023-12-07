// a group of actions is called controller

// publicly available

//module.exports.actionName=function(req,res){}

const Post =require('../models/post');
const User=require('../models/user');

// module.exports.home=function(req,res){


//     // populate the user of each posts...
//         Post.find({})
//         // .populate('user','user-_id')//Exclude _id, include name
//         .populate('user','name -_id') //include name but excludes id
//         .populate({
//             path: 'comments',
//             populate: {
//               path: 'user'
//             }
//           })
          
//         .exec()

//         // User.find({},function(err,users){
//         //     .then(posts => {
//         //         return res.render('home', {
//         //             title: "Finsta | Home",
//         //             posts: posts,
//         //             all_users:users
//         //         });
//         //     })
//         // })

//         .then((posts) => {
//             // Now, query for users
//             User.find({}, function (err, users) {
//               if (err) {
//                 console.error('Error in finding users:', err);
//                 return res.status(500).send('Error finding users');
//               }
      
//               return res.render('home', {
//                 title: 'Finsta | Home',
//                 posts: posts,
//                 all_users: users,
//               });
//             });
//           }) 
     
//         .catch(err => {
//             console.error('Error in finding posts:', err);
//             return res.status(500).send('Error finding posts');
//         });

//     // console.log(req.cookies);
//     // // taking res as value of 25 (check application in developers tool)
//     // res.cookie('user_id',25);
//     // rendering home.ejs
 
// }


// module.exports.home = function (req, res) {
//   // Query for posts
//   const postsQuery = Post.find({})
//     .populate('user', 'name -_id') // Include name but exclude id
//     .populate({
//       path: 'comments',
//       populate: {
//         path: 'user',
//       },
//     })
//     .exec();

//   // Query for users
//   const usersQuery = User.find({}).exec();

//   // Use Promise.all to wait for both queries to complete
//   Promise.all([postsQuery, usersQuery])
//     .then(([posts, users]) => {
//       return res.render('home', {
//         title: 'Finsta | Home',
//         posts: posts,
//         all_users: users
//       });
//     })
//     .catch((err) => {
//       console.error('Error in finding posts or users:', err);
//       return res.status(500).send('Error finding posts or users');
//     });
// };

module.exports.home = async function (req, res) {
  try {
    // Query for posts
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user' ) // Include name but exclude id  'name -_id'
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .exec();

    // Query for users
    const users = await User.find({}).exec();

    return res.render('home', {
      title: 'Finsta | Home',
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.error('Error in finding posts or users:', err);
    return res.status(500).send('Error finding posts or users');
  }
};
