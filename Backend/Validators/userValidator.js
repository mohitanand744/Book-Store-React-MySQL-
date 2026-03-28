const { check } = require("express-validator");

exports.userUpdatedDataValidation = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters")
    .trim()
    .escape(),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters")
    .trim()
    .escape(),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone must contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits")
    .trim()
    .escape(),

  check("favoriteGenres")
    .isArray()
    .withMessage("Favorite genres must be an array"),

  check("gender")
    .optional()
    .isIn(["MALE", "FEMALE", "OTHER"])
    .withMessage("Gender must be MALE, FEMALE, or OTHER"),
];
