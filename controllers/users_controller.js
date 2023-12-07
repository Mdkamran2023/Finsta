const User = require("../models/user");
const fs=require('fs');
const path=require('path');

// module.exports.profile = function (req, res) {
//   // res.end('<h1>User Profile</h1>');
//   User.findById(req.params.id,function(err,user){
//     return res.render("user_profile", {
//       title: "Users",
//       profile_user:user
//     });
//   })
 
// };

module.exports.profile = function (req, res) {
  // Use findById with promises
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.render('user_profile', {
          title: 'Users',
          profile_user: user,
        });
      } else {
        return res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      console.error('Error finding user:', err);
      return res.status(500).send('Error finding user');
    });
};


// module.exports.update=function(req,res){
//   if(req.user.id== req.params.id){
//     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//       return res.redirect('back');
//     })
//   }
//   else{
//    return  res.status(401).send('Unauthorized');
//   }
// }

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   // Use findByIdAndUpdate with promises
  //   User.findByIdAndUpdate(req.params.id, req.body)
  //     .then((user) => {
  //       return res.redirect('back');
  //     })
  //     .catch((err) => {
  //       console.error('Error updating user:', err);
  //       return res.status(500).send('Error updating user');
  //     });
  // } else {
  //   return res.status(401).send('Unauthorized');
  // }

  if (req.user.id == req.params.id) {
   try{
    let user=await User.findById(req.params.id);
    User.uploadedAvatar(req,res,function(err){
      if(err){
        console.log('********Multer Error: ',err);
      }
      // console.log(req.file);
      user.name=req.body.name;
      user.email=req.body.email;

      if(req.file){

       if(user.avatar){
fs.unlinkSync(path.join(__dirname,'..',user.avatar ));
       }


        //this is saving the path of the uploaded file into the avataar field in the user
        user.avatar=User.avatarPath +'/'+req.file.filename
      }
      user.save();
      return res.redirect('back');
    })
   }
   catch{
    req.flash('error',err);
    return res.redirect('back');
   }
  } else{
    req.flash('error','Unauthorized');
    return res.sttus(401).send('Unauthorized');

  }
};


// render the sign up page
module.exports.signUp = function (req, res) {
if(req.isAuthenticated())
{
  return  res.redirect('/users/profile');
}

  return res.render("user_sign_up", {
    title: "Finsta|Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated())
{
 return  res.redirect('/users/profile');
}
  return res.render("user_sign_in", {
    title: "Finsta|Sign In",
  });
};


// get the Sign Up data
module.exports.create = (req, res) => {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (!existingUser) {
        User.create(req.body)
          .then((newUser) => {
            return res.redirect('/users/sign-in');
          })
          .catch((err) => {
            console.log("Error in creating user while signing up:", err);
            return res.status(500).send("Internal Server Error");
          });
      } else {
        return res.redirect('back');
      }
    })
    .catch((err) => {
      console.log("Error in finding user in signing up:", err);
      return res.status(500).send("Internal Server Error");
    });
};


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success','Loggged in Successfully');
  //for passing flash to html we have used middleware.setFlash
  return res.redirect('/');
};

// 
// module.exports.destroySession=function(req,res)
// {
//   req.logout(); // function comes from passport .js 
//   return res.redirect('/');
// }

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    req.flash('success','You have logged Out!')
    if (err) {
      console.log("Error during logout:", err);
      return;
    }
    return res.redirect('/');
  });
};