const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");


router.get("/signup",(req,res)=>{
    res.render("../views/signup.ejs")
})

router.post("/signup",async(req,res)=>{
    let {username,email,password} = req.body;
    let newUser = new User({username,email});
    let registerdUser = await User.register(newUser,password);
    res.send(registerdUser);
})

module.exports = router;

