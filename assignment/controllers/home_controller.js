// module.exports.actionName = function(req,res){} 

//const Post = require("../models/post");
const User = require('../models/user');


module.exports.home = async function(req,res){// async declares that inside await will be used

    try{

        //populate the user of each post i.e we can now get get posts.user.name 

   let users= await User.find({})

    return res.render('home',{
        title : "Home",
        all_users:users
 });

    }catch(err){

    }

}