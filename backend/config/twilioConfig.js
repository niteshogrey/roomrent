const twilio = require("twilio");

// Retrieve environment variables
const accountSid = process.env.ACCOUNT_SID || "AC3999d153b704803fbc14a6a47d8f231f"
const authToken = process.env.AUTH_TOKEN || "68aaa7c2089422509ed0d42645edc995"
const verifyServiceSid = process.env.VERIFY_SERVICE_SID || "VAee740db9b822c53b5e8070dfc02e56a8"

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
