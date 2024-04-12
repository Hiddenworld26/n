const {registerUser,authUser,updateUserProfile} = require('../controllers/userController')

const express = require('express');


const router= express.Router();

const protect =  require("../middleware/authMiddleware");

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").put(protect,updateUserProfile);

module.exports=router;