const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const accountSid = "ACdaba039a53199d8078bb46cd12d3fb07";
const authToken = "4ae201b01e0d893cc3149b5ad236c99d";
const client = twilio(accountSid, authToken);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Store generated OTPs
const otpMap = new Map();

// Send OTP endpoint
router.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();

  // Store OTP
  otpMap.set(phoneNumber, otp.toString());
console.log(phoneNumber,"phoneNumber")
  // Send OTP via Twilio
  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: "+19384281665",
      to: phoneNumber,
    })
    .then(() => {
      res.send({ success: true, message: "OTP sent successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ success: false, message: "Failed to send OTP" });
    });
});
router.post("/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;
  const storedOTP = otpMap.get(phoneNumber);

  if (storedOTP && storedOTP === otp) {
    res.send({ success: true, message: "OTP verified successfully" });
  } else {
    res.status(401).send({ success: false, message: "Invalid OTP" });
  }
});

module.exports = router;
