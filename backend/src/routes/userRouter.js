const express = require("express");
const { sendOtp, verifyOtp, completeRegistration } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/send-otp", sendOtp)
// http://localhost:8000/api/v1/user/send-otp

userRoute.post("/verify", verifyOtp )
// http://localhost:8000/api/v1/user/verify-otp

userRoute.post("/register", completeRegistration)
// http://localhost:8000/api/v1/user/register



module.exports = userRoute