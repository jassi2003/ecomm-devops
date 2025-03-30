const express=require('express')
const {userRegisterController,userLoginController,updateUser,userLogoutController,allUsers,userDetailsController}=require('../controllers/user.controller')
const authToken=require('../middleware/authMiddleware')


const router=express.Router()

router.post("/register",userRegisterController)
router.post("/login",userLoginController)
router.post("/update-user",authToken,updateUser)
router.get("/logout-user",userLogoutController)
router.get("/getall-users",authToken,allUsers)
router.get("/getuser-details",authToken,userDetailsController)




module.exports=router;