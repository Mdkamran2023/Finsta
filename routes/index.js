// Entery point to all requests
// Routing refers to how an application’s endpoints (URIs) respond to client requests.

const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);

// this route will control all other routes and it is controlled by Finsta/index
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));

router.use('/api',require('./api'));

// for any further routes,access from here
// router.use('/routername',require(./routerfile')); 

module.exports=router;
