const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

// import user
const User=require('../models/user');

// // authentication using passport

passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback:true,
      },
      function (req,email, password, done) {
        // Wrap the Mongoose query in a Promise
        User.findOne({ email: email })
          .then((user) => {
            if (!user || user.password !== password) {
              // console.log('Invalid Username/Password');
              req.flash('error','Invalid Username/Password'); 
              return done(null, false);
            }
            return done(null, user);
          })
          .catch((err) => {
            // console.log('Error in finding user --> Passport');
            req.flash('error',err);
            return done(err);
          });
      }
    )
  );

// serialising: the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
 done(null,user.id);   
})


// deserialising the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        console.log("Error in finding user --> Passport");
        return done(err);
      });
  });
  

// check if user is authenticated //using as middleware //user is signed in or not
passport.checkAuthentication=function(req,res,next){
    // iF THE USER IS SIGNED IN,THEN PASS on the request to the next function(controllers's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in'); 
}

passport.setAuthenticatedUser=function(req,res,next)
{
   if(req.isAuthenticated()){
    // req.user contains the current signed in user from the session
    // cookie and we are just sending this to the locals for the views
    res.locals.user=req.user;
   } 
   next();
}



module.exports=passport; 
