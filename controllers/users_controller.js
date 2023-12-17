const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// Profile controller
// module.exports.profile = function(req, res) {
//     User.findById(req.params.id, function(err, user) {
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     });
// }
// Profile controller
module.exports.profile = async function (req, res) {
    try {
      let user = await User.findById(req.params.id);
      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user,
      });
    } catch (err) {
      console.error('Error in profile controller:', err);
      req.flash('error', err.message);
      return res.redirect('back');
    }
  };
  

// Update controller
module.exports.update = async function(req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {
                if (err) {
                    console.log('*****Multer Error: ', err)
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err.message);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

// Sign up controller
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// Sign in controller
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// Create user controller
module.exports.create = async function(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('/users/sign-in');
        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        req.flash('error', err.message);
        return res.redirect('back');
    }
}

// Create session controller
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
// Destroy session controller
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
      if (err) {
        console.log(err);
        req.flash('error', 'Failed to logout');
        return res.redirect('back');
      }
  
      req.flash('success', 'You have logged out!');
      return res.redirect('/');
    });
  };
  
