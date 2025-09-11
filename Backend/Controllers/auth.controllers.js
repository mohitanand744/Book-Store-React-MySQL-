const { validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../Services/authService");
const { successResponse, errorResponse } = require("../utils/response");

// SIGNUP
const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array()[0]);
    }

    const userData = req.body;
    const result = await registerUser(userData);

    successResponse(res, 201, "User registered successfully", result);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array()[0]);
    }

    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    successResponse(res, 200, "Login successful", result);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

module.exports = { signup, login };
