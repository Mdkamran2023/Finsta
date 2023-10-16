module.exports.profile=function(req,res)
{
    // res.end('<h1>User Profile</h1>');

    return res.render('user_profile',{
        title:"Users"
    });
}

// render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Finsta|Sign Up"
    });
}

// render the sign in page
module.exports.signIn=function(req,res)
{
    return res.render('user_sign_in',{
        title:"Finsta|Sign In"
    });
}

// get the Sign Up data
module.exports.create=function(req,res)
{
// TODO  LATER
}

// sign in and create a session for the user
module.exports.createSession=function(req,res)
{
//   TODO LATER  
}