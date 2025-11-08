const express = require("express");
const {
  signup,
  login,
  getUserProfile,
  forgotPassword,
  resetPasswordController,
  verifyResetTokenController,
} = require("../Controllers/auth.controllers");
const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  verifyResetTokenValidation,
} = require("../Validators/authValidator");
const verifyToken = require("../Middleware/verifyToken");

const router = express.Router();

router.post("/register", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post(
  "/verify-reset-token/",
  verifyResetTokenValidation,
  verifyResetTokenController
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  resetPasswordController
);
router.get("/me", verifyToken, getUserProfile);

module.exports = router;
