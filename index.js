const express=require('express');
const app=express();
const port=8000;

// always before routes
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

// extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use express router
app.use('/',require('./routes/index'));

// for views template i.e adding ejs file
// setting up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error:",err);
        console.log(`Error in running the server:${err}`);//interpolation
    }
    console.log(`Server is running on port: ${port}`);
});


// for accessing static files
app.use(express.static('./assets'));



