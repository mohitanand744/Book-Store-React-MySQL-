const express = require("express");
const { signup, login } = require("../Controllers/auth.controllers");
const {
  signupValidation,
  loginValidation,
} = require("../Validators/authValidator");

const router = express.Router();

router.post("/register", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
