const express = require('express');
const router = express.Router();
const passport = require('passport')

const usersController = require('../controllers/users_controller');

//make the profile page accesible only when the user is signed in by using  passport.checkAuthentication
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
 
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);
/*router.post request comes to 'create/session' , passport.authenticate --> authenticates it
if it is done then usersController.createSession is called otherwise  failureRedirect: '/users/sign-in' 
gets called*/


router.get('/sign-out',usersController.destroySession);

module.exports = router;