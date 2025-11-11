const { validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  sendResetPasswordLink,
  resetPassword,
  verifyResetToken,
  verifyEmailToken,
} = require("../Services/authService");
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
    const result = await registerUser(userData, res);

    if (result?.success === false) {
      return errorResponse(res, 400, result?.message, result);
    }

    successResponse(res, 201, result?.message, result);
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
    const result = await loginUser({ email, password, res });

    console.log("result");
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

// FORGET PASSWORD
const forgotPassword = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", error.array()[0]);
    }

    const { email } = req.body;
    const result = await sendResetPasswordLink(email);

    if (result?.success === false) {
      return errorResponse(res, 400, result?.message, result);
    }

    successResponse(res, 200, "Password reset link sent successfully");
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const verifyEmailTokenController = async (req, res, next) => {
  try {
    const { token, email } = req.query;

    console.log(email, "eeeee");

    const result = await verifyEmailToken(token, email);

    console.log("mmmmmmmmmm", result);

    if (result.success) {
      const redirectUrl = `${process.env.FRONTEND_URL}/?status=verified&email=${result?.email}`;

      return successResponse(res, 200, result?.message, {}, redirectUrl);
    }

    if (result?.emailVerified) {
      const redirectUrl = `${process.env.FRONTEND_URL}/?status=alreadyVerified`;
      return successResponse(res, 200, result?.message, {}, redirectUrl);
    }

    const redirectUrl = `${process.env.FRONTEND_URL}/?status=failed`;

    errorResponse(res, 400, result?.message, null, redirectUrl);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// Verify resetToken

const verifyResetTokenController = async (req, res, next) => {
  try {
    const { token } = req.body;

    const result = await verifyResetToken(token);
    if (result.valid) {
      return successResponse(res, 200);
    }

    errorResponse(res, 400, result?.message);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// RESET PASSWORD

const resetPasswordController = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", error.array()[0]);
    }

    const { email, newPassword, resetToken } = req.body;
    const result = await resetPassword(email, newPassword, resetToken);

    if (result?.success) {
      return successResponse(res, 200, "Password reset successful");
    }
    errorResponse(res, 400, result?.message || "Password reset failed", result);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// GET USER
const getUserProfile = async (req, res, next) => {
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

module.exports = {
  signup,
  login,
  getUserProfile,
  resetPasswordController,
  forgotPassword,
  verifyResetTokenController,
  verifyEmailTokenController,
};
