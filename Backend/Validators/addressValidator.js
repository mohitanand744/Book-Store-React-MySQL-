const { body } = require("express-validator");

const createAddressValidator = [
  body("type")
    .notEmpty()
    .isIn(["home", "work", "other"])
    .withMessage("Invalid address type"),

  body("pinCode")
    .notEmpty()
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage("Invalid pincode (must be 6 digits)"),

  body("city")
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage("City must be 2–100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("City must contain only letters"),

  body("state")
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage("State must be 2–100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("State must contain only letters"),

  body("address")
    .notEmpty()
    .isLength({ min: 5, max: 255 })
    .withMessage("Street address must be 5–255 characters"),

  body("isDefault")
    .optional()
    .isIn([0, 1])
    .withMessage("is_default must be 0 or 1"),
];

const updateAddressValidator = [
  body("type")
    .optional()
    .isIn(["Home", "Work", "Other"])
    .withMessage("Invalid type"),

  body("pinCode")
    .optional()
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage("Invalid pincode"),

  body("city")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("City must be 2–100 characters"),

  body("state")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("State must be 2–100 characters"),

  body("address")
    .optional()
    .isLength({ min: 5, max: 255 })
    .withMessage("Street address must be 5–255 characters"),

  body("isDefault").optional().isBoolean(),
];

module.exports = { createAddressValidator, updateAddressValidator };
