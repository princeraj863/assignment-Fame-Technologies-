const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
//path where images will be stored
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type :String,
        required :true,
        unique : true

    },
    firstname :{
      type :String,
      required:true
    
    }
    ,
    lastname:{
      type:String,
      required:true
    }
    ,
    phone:{
      type:String,
      required:true
    }
    ,
    password:{
      type:String,
      required:true
    }
   ,
   avatar:{
     type:String
   }
},{
    timestamps : true//it keeps the track of when data got created and updated
});

//linking multer to the database
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // defined the storage
      cb(null,path.join(__dirname,'..',AVATAR_PATH));  //models/(here it's inside the models) +'..'+ /uploads/users/avatars
    },
    // filename stored in db
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

// static for user 
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar'); // single takes only one file
// attaches disk storage on multer in storage property 

// made publicly available where photos are gonna save
//to access just use User.AvatarPath here User is db AvatarPath is function
userSchema.statics.AvatarPath = AVATAR_PATH;



const User = mongoose.model('User',userSchema);

module.exports = User;
