
// // always before routes
// const expressLayouts=require('express-ejs-layouts');
// app.use(expressLayouts);

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const mongoose=require('mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require("./config/passport-google-oauth2-strategy")
//--------------------------------
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware')

app.use(sassMiddleware({
 src:   './assets/scss',
 dest: './assets/css',
 debug:true,
 outputStyle:'extended',
 prefix:'/css'
}))

// reading through the post request
app.use(express.urlencoded());

app.use(cookieParser());

// for accessing static files
app.use(express.static('./assets'));
//make the uploads part available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// for views template i.e adding ejs file
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Finsta',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    // adding mongo -store
    store:MongoStore.create({
       
        // mongooseConnection:db,
        mongoUrl:'mongodb://127.0.0.1:27017/Finsta_development',
        autoRemove:'disabled' 
    }
    ,function(err){
      console.log(err||'connect-mongodb setup ok')  
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//it is putted after session cookies because it uses it..
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

