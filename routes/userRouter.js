const express=require('express')

const router=express.Router()
const isLoggedIn=require('../middlewares/isLoggedIn.js')
const {registerUser,loginUser,logout}=require("../controllers/authController.js")
router.get("/",(req,res)=>{
  res.send('it is working')
})
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logout)
module.exports=router