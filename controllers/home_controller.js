// a group of actions is called controller

// publicly available

//module.exports.actionName=function(req,res){}

const Post =require('../models/post');

module.exports.home=function(req,res){

    // Post.find({})
    //     .then(posts => {
    //         return res.render('home', {
    //             title: "Finsta | Home",
    //             posts: posts
    //         });
    //     })
    //     .catch(err => {
    //         console.error('Error in finding posts:', err);
    //         return res.status(500).send('Error finding posts');
    //     });

    // populate the user of each posts...
        Post.find({}).populate('user').exec()
        .then(posts => {
            return res.render('home', {
                title: "Finsta | Home",
                posts: posts
            });
        })
        .catch(err => {
            console.error('Error in finding posts:', err);
            return res.status(500).send('Error finding posts');
        });

    

    // console.log(req.cookies);
    // // taking res as value of 25 (check application in developers tool)
    // res.cookie('user_id',25);
    // rendering home.ejs
 
}