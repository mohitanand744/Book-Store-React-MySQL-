const { validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../Services/authService");
const { successResponse, errorResponse } = require("../utils/response");
const handleDbError = require("../utils/handleDbError");
const { getUserDetailsById } = require("../Models/userModel");

// SIGNUP
const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array()[0]);
    }

    const userData = req.body;
    const result = await registerUser(userData);

    successResponse(res, 201, "User registered successfully", result);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", errors.array()[0]);
    }

    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    console.log(result);
    if (result?.success === false) {
      console.log(result);

      delete result.success;
      return errorResponse(res, 400, result?.message, result);
    }
    successResponse(res, 200, "Login successful", result);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const getUserProfile = async (req, res, next) => {
  /*   console.log("Data", req); */

  try {
    const user = await getUserDetailsById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    handleDbError(error, res, next);
  }
};

module.exports = { signup, login, getUserProfile };
