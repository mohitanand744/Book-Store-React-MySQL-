const { check } = require("express-validator");

exports.signupValidation = [
  check("first_name").notEmpty().withMessage("First name is required"),
  check("last_name").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  check("terms_accepted")
    .isBoolean()
    .withMessage("Terms accepted must be true/false"),
];

exports.loginValidation = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

exports.forgotPasswordValidation = [
  check("email").isEmail().withMessage("Valid email is required"),
];

exports.resetPasswordValidation = [
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  check("token").notEmpty().withMessage("Token is required"),
];
