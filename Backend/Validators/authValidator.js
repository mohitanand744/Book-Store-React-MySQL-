const { check } = require("express-validator");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.signupValidation = [
  check("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters")
    .trim()
    .escape(),

  check("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters")
    .trim()
    .escape(),

  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email must not exceed 100 characters")
    .custom((email) => {
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
      }

      // Check for common disposable email domains
      const disposableDomains = ["tempmail.com", "throwaway.com", "fake.com"]; // Add more as needed
      const domain = email.split("@")[1];
      if (disposableDomains.includes(domain)) {
        throw new Error("Disposable email addresses are not allowed");
      }

      return true;
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(passwordRegex)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .isLength({ max: 128 })
    .withMessage("Password must not exceed 128 characters"),

  check("terms_accepted")
    .isBoolean()
    .withMessage("Terms accepted must be true/false")
    .custom((value) => {
      if (value !== true) {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
];

exports.loginValidation = [
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .custom((email) => {
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 1 })
    .withMessage("Password is required"),
];

exports.forgotPasswordValidation = [
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .custom((email) => {
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
      }
      return true;
    }),
];

exports.resetPasswordValidation = [
  check("newPassword")
    .trim()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be 8–128 characters long")
    .matches(passwordRegex)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  check("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.newPassword) {
        throw new Error("Confirm password do not match please try again");
      }
      return true;
    }),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .custom((email) => {
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
      }
      return true;
    }),

  check("resetToken")
    .trim()
    .notEmpty()
    .withMessage("Reset token is required")
    .isLength({ min: 1 })
    .withMessage("Reset token is required"),
];

exports.verifyResetTokenValidation = [
  check("token")
    .notEmpty()
    .withMessage("Reset token is required")
    .isLength({ min: 1 })
    .withMessage("Reset token is required"),
];

// Optional: Add a comprehensive email validation middleware
exports.emailValidation = [
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email must not exceed 100 characters")
    .custom((email) => {
      if (!emailRegex.test(email)) {
        throw new Error("Please provide a valid email address format");
      }

      // Check for valid TLDs
      const validTLDs = ["com", "org", "net", "edu", "gov", "io", "co", "info"]; // Add more as needed
      const tld = email.split(".").pop().toLowerCase();
      if (!validTLDs.includes(tld)) {
        throw new Error("Please use a valid email domain");
      }

      return true;
    }),
];
