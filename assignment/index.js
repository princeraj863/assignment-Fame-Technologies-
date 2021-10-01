 const express=require('express');
 const cookieParser = require('cookie-parser');
 const app= express();
 const port = 8000;
 const expressLayouts = require('express-ejs-layouts');
 const db = require('./config/mongoose');

 //used for session cookie
 const session =require('express-session');
 const passport = require('passport');
 const passportLocal = require('./config/passport-local-strategy');
 const MongoStore = require('connect-mongo');

 
 
 app.use(express.urlencoded());
 /* app.use whenever used then it means middleware is called
  it takes request and convert form data and put it on request.body(in key:value pair) */


app.use(cookieParser());

app.use(express.static('./assets'));
/* it will look for folder named assets in the directory and
look for static file like html,css,js
in home.ejs just link href ="/css/home.css" as it will look in assets folder for html,css and js
 
*/

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname +'/uploads'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);






//set up view engine
app.set('view engine','ejs');

app.set('views','./views');//path to look from controller when it says render filename
//here not used path.join like that as we can do it like this also


// to use express session
//mongo store is used to store the session cookie in the db
app.use(session({
   name : 'asssignment',
   //TODO change the secret before deployment in production mode
   secret : 'blahsomething',// secret key used for encrypting 
   saveUninitialized : false, //if user not logged in,extra data will not be stored in session cookie
   resave :false,//for preventing from saving session cookie data again and again
   cookie:{
     maxAge:(1000*60*100)// here time measured in milli second i.e 1e-3
     //till the login session expire
   },
  store : new MongoStore(
      {
        mongoUrl: 'mongodb://localhost/coolzblog13_db',
        autoRemove : 'disabled'//do  you want this to removed automatically
      },
      function(err){ // callback function
         console.log(err || 'connect-mongodb setup ok');
      }
   )
}));

app.use(passport.initialize());
app.use(passport.session());

//it will check if session cookie is present or not
app.use(passport.setAuthenticatedUser);


// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
 
    if(err){
        console.log(`error in running the server:${port}`);
        // here backticks i.e `` inside it works as string until to use variable inside string use ${variable}
    }

    console.log(`server is running on port:${port}`);

 });