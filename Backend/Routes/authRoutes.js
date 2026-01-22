const express = require("express");

const upload = require("../Middleware/multer");
const {
  signup,
  login,
  getUserProfile,
  forgotPassword,
  resetPasswordController,
  verifyResetTokenController,
  verifyEmailTokenController,
  getGoogleLoginPage,
  getGoogleCallBack,
  logout,
  uploadProfilePic,
} = require("../Controllers/authControllers");
const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  verifyTokenValidation,
} = require("../Validators/authValidator");
const verifyToken = require("../Middleware/verifyToken");

const router = express.Router();

router.post("/register", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", verifyToken, logout);

router.post("/profile-pic", verifyToken, upload.single("profilePic"), uploadProfilePic);

router.route("/google").get(getGoogleLoginPage);
router.route("/google/callback").get(getGoogleCallBack);

router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post(
  "/verify-reset-token/",
  verifyTokenValidation,
  verifyResetTokenController
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  resetPasswordController
);
router.get("/verify-email/", verifyTokenValidation, verifyEmailTokenController);
router.get("/me", verifyToken, getUserProfile);

module.exports = router;
