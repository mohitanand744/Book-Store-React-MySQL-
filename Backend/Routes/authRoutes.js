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
const { validate } = require("../Validators/validate");

const router = express.Router();

router.post("/register", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);
router.post("/logout", logout);

router.route("/google").get(getGoogleLoginPage);
router.route("/google/callback").get(getGoogleCallBack);

router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  forgotPassword,
);
router.post(
  "/verify-reset-token/",
  verifyTokenValidation,
  validate,
  verifyResetTokenController,
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  validate,
  resetPasswordController,
);
router.get(
  "/verify-email/",
  verifyTokenValidation,
  validate,
  verifyEmailTokenController,
);

module.exports = router;
