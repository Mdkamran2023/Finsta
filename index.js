// const express=require('express');
// const app=express();
// const port=8000;

// // for cookies
// const cookieParser=require('cookie-parser');

// // reading through the post request
// app.use(express.urlencoded());

// app.use(cookieParser());


// const db=require('./config/mongoose');

// // used for session cookies
// const session=require('express-session');
// const passport=require('passport');
// const passportLocal=require('./config/passport-local-strategy');

// // always before routes
// const expressLayouts=require('express-ejs-layouts');
// app.use(expressLayouts);

// // extract style and scripts from sub pages into the layouts
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);




// // for views template i.e adding ejs file
// // setting up view engine
// app.set('view engine','ejs');
// app.set('views','./views');

// // use express router
// app.use('/',require('./routes/index'));


// // 
// app.use(session({
//     name:'finsta',
//     // todo change the secret before deployment in production mode
//     secret:'blahsomething',
//     saveUninitialized:false,
//     resave:false,
//     Cookie:{
//         maxAge:(1000*60*100)
//     }
// }))

// app.use(passport.initialize());
// app.use(passport.session());


// app.listen(port,function(err)
// {
//     if(err)
//     {
//         console.log("Error:",err);
//         console.log(`Error in running the server:${err}`);//interpolation
//     }
//     console.log(`Server is running on port: ${port}`);
// });


// // for accessing static files
// app.use(express.static('./assets'));




const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'Finsta',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
