const { validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  sendResetPasswordLink,
  resetPassword,
  verifyResetToken,
  verifyEmailToken,
  handleSocialLogin,
} = require("../Services/authService");
const { successResponse, errorResponse } = require("../utils/response");
const handleDbError = require("../utils/handleDbError");
const {
  findUserById,
  updateUserPicturePublicId,
  findUserByEmail,
} = require("../Models/userModel");
const {
  generateState,
  generateCodeVerifier,
  decodeIdToken,
} = require("arctic");
const { OAUTH_EXCHANGE_EXPIRY_MS } = require("../Config/constants");
const google = require("../Config/oAuth/google");
const { formatUser } = require("../utils/formatter");
const { uploadFromUrl } = require("../utils/cloudinaryUpload");
const { uploadFromBuffer } = require("../utils/cloudinaryUpload");
const { updateProfilePic } = require("../Services/authService");
const { deleteFromCloudinary } = require("../Helper/methods");

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

    console.log("loginData", email);

    const result = await loginUser({ email, password, res });

    console.log("result");
    console.log("login Success", result, result?.success);

    if (result?.success === false) {
      console.log("login Error", result);

      delete result.success;
      return errorResponse(res, 400, result?.message, result);
    }
    console.log("setting cookie");
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    successResponse(res, 200, "Login successful", result);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

// LOGOUT
const logout = (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.clearCookie("google_oauth_state", { path: "/", sameSite: "lax" });
  res.clearCookie("google_code_verifier", { path: "/", sameSite: "lax" });

  successResponse(res, 200, "Logout successful");
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

    const redirectUrl = `${process.env.FRONTEND_URL}/?status=failed&email=${result?.email}`;

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
      return successResponse(res, 200, "", { email: result.email });
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

const getGoogleLoginPage = (req, res, next) => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    const cookieConfig = {
      httpOnly: true,
      secure: false,
      maxAge: OAUTH_EXCHANGE_EXPIRY_MS,
      sameSite: "lax",
    };

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_code_verifier", codeVerifier, cookieConfig);

    console.log(
      `${process.env.BACKEND_BASE_URL}/api/${process.env.API_VERSION}/auth/google/callback`,
    );

    res.redirect(url.toString());
  } catch (error) {
    handleDbError(error, res);
  }
};

const getGoogleCallBack = async (req, res, next) => {
  const { state, code } = req.query;

  const {
    google_code_verifier: codeVerifier,
    google_oauth_state: storedState,
  } = req.cookies;

  if (
    !state ||
    !code ||
    !codeVerifier ||
    !storedState ||
    state !== storedState
  ) {
    return errorResponse(res, 400, "Invalid request parameters", null, "/");
  }

  let token;

  try {
    token = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (error) {
    handleDbError(error, res, next);
  }

  console.log("Google Token", token.data.id_token);
  console.log("Google Token222", token);

  const claims = decodeIdToken(token.data.id_token);

  console.log("Google Claims", claims);

  const {
    sub: googleUserId,
    given_name,
    family_name,
    email,
    email_verified,
    picture,
  } = claims;

  try {
    const result = await handleSocialLogin({
      provider: "google",
      providerId: googleUserId,
      email,
      emailVerified: !!email_verified,
      firstName: given_name,
      lastName: family_name,
      picture,
    });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return successResponse(
      res,
      200,
      "Logged in with Google",
      {},
      `${process.env.FRONTEND_URL}/nextChapter/?loginProvider=google`,
    );
  } catch (err) {
    const status = err.status || 500;
    const msg = err.message || "Social login failed";
    return errorResponse(res, status, msg);
  }
};

// GET USER
const getUserProfile = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);

    if (!user) {
      return errorResponse(res, 400, "User not found");
    }
    console.log("User - ", user);

    const userDetails = formatUser([user]);

    successResponse(res, 200, "", userDetails);
  } catch (error) {
    console.log(error);
    handleDbError(error, res, next);
  }
};

const uploadProfilePic = async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.userId;

    if (!file) {
      return errorResponse(res, 400, "Please upload an image file");
    }

    const user = await findUserById(userId);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (user?.profile_pic_public_id) {
      await deleteFromCloudinary(user?.profile_pic_public_id);
    }

    const { url: pictureUrl, public_id } = await uploadFromBuffer(file.buffer);

    if (!pictureUrl) {
      return errorResponse(res, 500, "Failed to upload image to cloud storage");
    }

    const result = await updateProfilePic(user.id, pictureUrl);

    await updateUserPicturePublicId(user.id, public_id);

    successResponse(res, 200, result.message, {
      profilePic: result.profilePic,
    });
  } catch (error) {
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
  getGoogleLoginPage,
  getGoogleCallBack,
  logout,
  uploadProfilePic,
};
