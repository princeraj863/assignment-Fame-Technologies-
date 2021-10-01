const express = require('express');// it will not create new instance , it will fetch the existing instance

const router = express.Router();// it helps in separating routes and controller
const homeController = require('../controllers/home_controller');// to access home controller

console.log("router loaded");

//this router is acessing a home controller
router.get('/',homeController.home);//calling homeController.actionName

router.use('/users',require('./users'));//handles users request
/*here index.js router acts as a centre hub for all other routes it directs to routes in  users.js  
for any further routes,access from http://localhost:8000/users/ 
*/

module.exports= router; //it will get exported to index.js in main folder