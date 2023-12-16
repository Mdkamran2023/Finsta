// const passport = require("passport");
// const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const crypto = require("crypto");

// const User = require("../models/user");

// //tell passport to use a new strategy for google login
// passport.use(
//   new googleStrategy({
//     clientID:"",
//     clientSecret: "",
//     callbackURL: "http://localhost:8000/users/auth/google/callback",
//   },
//   function(accessToken,refreshToken,profile,done){
//     //find a user
// User.findOne({email:profile.emails[0].value}).exec(function(err,user){
//     if(err)
//     {
//         console.log('error in google strategy-passport',err);
//         return;
//     }
//     console.log(profile);
//     if(user){
//         //if found,set this user as req.user
//         return done(null,user);
//     }else{
//         // if not found,create the user and set it as req.user(sign up the user)
//         User.create({
//             name:profile.displayName,
//             email:profile.emails[0].value,
//             password:crypto.randomBytes.toString("hex")
//         },function(err,user){
//             if(err){
//                 console.log('error in creating user google strategy-passport ',err);
//                 return;
//             }
        // "333066075881-726s9jbkrpo8djholk1jrg622t6crndv.apps.googleusercontent.com"
        // "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"


//             else{
//              return   done(null,user);
//             }
//         })
//     }
// })
//   })
// );

// module.exports=passport;

const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");

const User = require("../models/user");

// Tell passport to use a new strategy for Google login
passport.use(
  new googleStrategy(
    {
      clientID:
      ,
      clientSecret:
      ,
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Find a user
      User.findOne({ email: profile.emails[0].value })
        .then(user => {
          console.log(profile);
          if (user) {
            // If found, set this user as req.user
            return done(null, user);
          } else {
            // If not found, create the user and set it as req.user (sign up the user)
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes.toString("hex"),
            })
              .then(newUser => {
                return done(null, newUser);
              })
              .catch(err => {
                console.log('Error in creating user in Google strategy-passport', err);
                return done(err);
              });
          }
        })
        .catch(err => {
          console.log('Error in Google strategy-passport', err);
          return done(err);
        });
    }
  )
);

module.exports = passport;
