const express = require("express");
const { userInfo } = require("os");

const User = require('../models/user'); // Requiring database

module.exports.profile = function(req,res){ //http://localhost:8000/users/profile
    
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{ // here it renders user_profile.ejs view/template
            //it's view destination is set in index.js file 
            title : 'User Profile',
            profile_user: user //we can't use the word 'user' as it's keyword in locals
       });
    });
     
}

module.exports.update = async function(req,res){
    



   if(req.user.id==req.params.id){
       try{
           let user = await User.findById(req.params.id);
           

           /* we can't  access req.params as now it is multipart/form-data ,body parser won't be able to parse it
        for it we use multer and function we defined User.uploadedAvatar as multer.diskStorage takes req also*/
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('multer error:',err);}
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.phone = req.body.phone
            user.email= req.body.email;
            user.password= req.body.password;

            //this is saving the path pf the uploaded file into the avatar field in the user
            if(req.file){ // updating file only when user changes it
                
               user.avatar = User.AvatarPath + '/' + req.file.filename ;
            }
            user.save();
            return res.redirect('back');
        
        });
       }
       catch(err){
           
           
           return res.redirect('back');
       }
   }else{
       
       return res.status(401).send('Unauthorized');
   }

}

//render the sign up page
module.exports.signUp =function(req,res){

    //if user is authenticated then it won't be able to go on sign up page  
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
            title :"Coolzblog | Sign Up"
    });
}

// render the sign in page
module.exports.signIn =function(req,res){

    //if user is authenticated then it won't be able to go on sign in page  
    if(req.isAuthenticated()){

        res.redirect('/users/profile');
    }
    else
    return res.render('user_sign_in',{
            title :"Coolzblog | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    
    User.findOne({email: req.body.email},function(err,user){
        
        if(err){console.log('error in finding user in signing up'); return;}

        if(!user){
           // console.log(req.body);
            //User.create(req.params.id,{name:req.body.name,email:req.body.email},
              //  function(err,user)
          
          
           

          /* we can't  access req.params as now it is multipart/form-data ,body parser won't be able to parse it
       for it we use multer and function we defined User.uploadedAvatar as multer.diskStorage takes req also*/
       User.uploadedAvatar(req,res,function(err){
           if(err){console.log('multer error:',err);}
           /*user.firstname = req.body.firstname;
           user.lastname = req.body.lastname;
           user.phone = req.body.phone
           user.email= req.body.email;
           user.password= req.body.password;*/
           //console.log(req.body);
           req.body.avatar =  User.AvatarPath + '/' + req.file.filename ;
           User.create(req.body,function(err,user){
            // console.log("user",user);
             if(err){console.log('error in creating user while signing up',err); return;}
             
             return res.redirect('/users/sign-in');
         });
          
        });
    }else{
            console.log("rediect");
            
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    
    return res.redirect('/');
}

