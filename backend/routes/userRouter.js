const express = require("express");
const {
  signup,
  verifyAccount,
  resendOTP,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  getUser,
} = require("../controllers/authController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/verify", isAuthenticated, verifyAccount);
router.post("/resend-otp", isAuthenticated, resendOTP);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", isAuthenticated, getProfile);
router.get("/userdata", protect, getUser);

module.exports = router;
