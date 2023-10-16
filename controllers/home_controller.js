// a group of actions is called cpntroller

// publicly available

//module.exports.actionName=function(req,res){}

module.exports.home=function(req,res){
    // return res.end('<h1>Express is up for Finsta </h1>')

    console.log(req.cookies);
    // taking res as value of 25 (check application in developers tool)
    res.cookie('user_id',25);
    // rendering home.ejs
    return res.render('home',{
        title:"Home"
    });
}