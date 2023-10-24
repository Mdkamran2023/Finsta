const User = require("../models/user");

module.exports.profile = function (req, res) {
  // res.end('<h1>User Profile</h1>');

  return res.render("user_profile", {
    title: "Users",
  });
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
  return res.redirect('/');
};
