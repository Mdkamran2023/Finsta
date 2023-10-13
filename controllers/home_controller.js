// a group of actions is called cpntroller

// publicly available

//module.exports.actionName=function(req,res){}

module.exports.home=function(req,res){
    return res.end('<h1>Express is up for Finsta </h1>')
}