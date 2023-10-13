// Entery point to all requests
// Routing refers to how an application’s endpoints (URIs) respond to client requests.

const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller')

console.log('router loaded');

router.get('/',homeController.home);
module.exports=router;
