const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { twilioClient, verifyServiceSid } = require("../config/twilioConfig");

const router = express.Router();

// Send OTP
const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({ message: "Phone number is required" });
  }

  try {
    const verification = await twilioClient.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    res.status(200).send({ message: "OTP sent successfully", sid: verification.sid });
  } catch (error) {
    res.status(500).send({ message: "Error sending OTP", error: error.message });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { phoneNumber, code } = req.body;

  if (!phoneNumber || !code) {
    return res.status(400).send({ message: "Phone number and OTP are required" });
  }

  try {
    const verificationCheck = await twilioClient.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    if (verificationCheck.status === "approved") {
      const user = await User.findOne({ phoneNumber });

      if (user) {
        // User exists; generate token
        const token = jwt.sign({ id: user._id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).send({
          message: "OTP verified successfully",
          token,
          userExists: true,
          username: user.username,
        });
      } else {
        // User does not exist; proceed to enter username
        return res.status(200).send({ message: "OTP verified successfully", userExists: false });
      }
    } else {
      return res.status(400).send({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error verifying OTP", error: error.message });
  }
};

// Complete Registration (New User)
const completeRegistration =  async (req, res) => {
  const { phoneNumber, username } = req.body;

  if (!phoneNumber || !username) {
    return res.status(400).send({ message: "Phone number and username are required" });
  }

  try {
    const existingUser = await User.findOne({ phoneNumber, username });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists. Login using OTP." });
    }

    const user = new User({ phoneNumber, username });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).send({ message: "Error completing registration", error: error.message });
  }
};

module.exports = {
    sendOtp,
    verifyOtp,
    completeRegistration
}
