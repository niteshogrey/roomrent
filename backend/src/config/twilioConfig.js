const twilio = require("twilio");
require("dotenv").config()

// Retrieve environment variables
const accountSid = process.env.ACCOUNT_SID || "ACbc5c7042247e73d1e2078970ee73ce3f"
const authToken = process.env.AUTH_TOKEN || "b1fe2e20062dafcd7e1b27d39971d862"
const verifyServiceSid = process.env.VERIFY_SERVICE_SID || "VAb718f0f62d94141631f70d3890626938"

// Check for missing values
if (!accountSid || !authToken || !verifyServiceSid) {
  throw new Error("Missing Twilio configuration in environment variables.");
}

// Initialize Twilio client
const twilioClient = twilio(accountSid, authToken);

module.exports = {
  twilioClient,
  verifyServiceSid,
};
