const express=require('express');
const router=express.Router();

const passport=require('passport');

const usersController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile); //if user is signed inn then only it goes to profile..

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);

// use passport as a middleware to authenticate
// Set up the create session route
router.post(
    '/create-session',
    passport.authenticate('local', { failureRedirect: '/users/sign-in' }),
    usersController.createSession
  );

  router.get('/sign-out',usersController.destroySession);

module.exports=router;