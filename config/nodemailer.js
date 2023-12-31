const nodemailer= require("nodemailer");
const ejs=require("ejs");
const path=require("path");


//part which sends the email
let transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false, //not using two-factor authentication
    auth: {
        user:"kmd78463@gmail.com",
        pass:"jbmt hzjm pmpt pwyu"
        //auth is the authentication object in the transporter..
    }       ,  //setting up identity(to stop sending mail to anyone from anyone)
});

//template rendering
let renderTemplate= (data,relativePath)=>{
let mailHTML;
ejs.renderFile(
    path.join(__dirname,'../views/mailers',relativePath),
    data,
    function(err,template){
        if(err){
            console.log("error in rendering template",err);
            return;
        }

        mailHTML=template;
    }
)

return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}