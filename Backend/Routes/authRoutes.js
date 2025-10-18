const express = require("express");
const {
  signup,
  login,
  getUserProfile,
} = require("../Controllers/auth.controllers");
const {
  signupValidation,
  loginValidation,
} = require("../Validators/authValidator");
const verifyToken = require("../Middleware/verifyToken");

const router = express.Router();

router.post("/register", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/me", verifyToken, getUserProfile);

module.exports = router;
