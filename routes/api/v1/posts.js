const express= require("express");
const router=express.Router();
const passport=require("passport");

const postApi=require("../../../controllers/api/v1/posts_api");

router.get('/',postApi.index);
//to prevent session cookie to be generated used {session:false}
router.delete("/:id",passport.authenticate('jwt',{session:false}),postApi.destroy);
//authentication check
module.exports=router;