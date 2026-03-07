const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPasswordController,
  verifyResetTokenController,
  verifyEmailTokenController,
  getGoogleLoginPage,
  getGoogleCallBack,
  logout,
} = require("../Controllers/authControllers");
const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  verifyTokenValidation,
} = require("../Validators/authValidator");

const router = express.Router();

router.post("/register", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

router.route("/google").get(getGoogleLoginPage);
router.route("/google/callback").get(getGoogleCallBack);

router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post(
  "/verify-reset-token/",
  verifyTokenValidation,
  verifyResetTokenController,
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  resetPasswordController,
);
router.get("/verify-email/", verifyTokenValidation, verifyEmailTokenController);

module.exports = router;
