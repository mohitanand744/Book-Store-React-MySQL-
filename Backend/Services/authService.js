// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByEmail,
  saveResetToken,
  findUserByResetToken,
  clearResetToken,
  updateEmailVerified,
} = require("../Models/userModel");
const { formatUser } = require("../utils/formatter");
const { sendPasswordResetEmail } = require("./Emails/sendResetLink");
const db = require("../Config/db.connection");
const {
  sendEmailVerificationLink,
} = require("./Emails/sendEmailVerificationLink");
const { successResponse, errorResponse } = require("../utils/response");

exports.registerUser = async (
  { first_name, last_name, email, password, terms_accepted },
  res
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      field: "email",
      type: "credential",
      message: "User with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await createUser(
    first_name,
    last_name,
    email,
    hashedPassword,
    terms_accepted
  );

  const response = await sendEmailVerificationLinkServices(email);

  if (response) {
    return {
      success: true,
      message:
        "We’ve sent a verification link to your email. Please check your inbox and verify your account before logging in.",
    };
  }

  return {
    success: true,
    userId: result.insertId,
    message: "User created successfully.",
  };
};

exports.loginUser = async ({ email, password, res }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      field: "email",
      type: "credential",
      message:
        "User not found. Please create an account to continue with NextChapter",
    };
  }

  if (!user.email_verified) {
    const response = await sendEmailVerificationLinkServices(user.email);

    if (response) {
      return {
        success: false,
        emailVerified: "unverified",
        message:
          "We’ve sent a verification link to your email. Please check your inbox and verify your account before logging in.",
      };
    }
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      success: false,
      field: "password",
      type: "credential",
      message: "Invalid password.",
    };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: `${process.env.USER_TOKEN_EXPIRES_IN}h` }
  );

  const userDetails = formatUser([user]);

  return {
    token,
    user: userDetails,
  };
};

exports.verifyEmailToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VERIFY);

    const user = await findUserByEmail(decoded.email);

    if (!user) {
      return {
        success: false,
        message: "User not found. Please sign up again.",
      };
    }

    if (user.email_verified) {
      return {
        success: false,
        emailVerified: true,
        message:
          "Your email has already been verified. Please login to continue.",
      };
    }

    await updateEmailVerified(decoded?.email);

    return {
      success: true,
      id: decoded.id,
      message: "Email verified successfully.",
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        success: false,
        message: "Your reset link has expired. Please request a new one.",
      };
    }
    if (err.name === "JsonWebTokenError") {
      return {
        success: false,
        message: "Invalid reset link. Please request a new one.",
      };
    }
    return { success: false, message: "Something went wrong." };
  }
};

async function sendEmailVerificationLinkServices(email) {
  try {
    const user = await findUserByEmail(email);

    console.log("uuuuuuuuuuuuuuuuuuuu", user);

    if (user?.email_verified) {
      return false;
    }

    const emailVerificationToken = jwt.sign(
      { id: user.id, email: user.email, email_verified: user.email_verified },
      process.env.JWT_SECRET_EMAIL_VERIFY,
      { expiresIn: `${process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN}h` }
    );

    const emailVerificationLink = `${process.env.BACKEND_URL}auth/verify-email/${emailVerificationToken}`;

    await sendEmailVerificationLink(
      email,
      emailVerificationLink,
      user.first_name
    );

    return true;
  } catch (err) {
    throw {
      message: "Failed to send verification email. Please try again later.",
      customMessage: true,
    };
  }
}

exports.sendResetPasswordLink = async (email) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        field: "email",
        type: "credential",
        message:
          "User not found. Please create an account to continue with NextChapter",
      };
    }

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_RESET,
      { expiresIn: `${process.env.RESET_TOKEN_EXPIRES_IN}m` }
    );

    await saveResetToken(email, resetToken);

    const resetLink = `${process.env.FRONTEND_URL}/?token=${resetToken}`;

    await sendPasswordResetEmail(email, resetLink);

    return { success: true };
  } catch (err) {
    throw {
      message: "Failed to send reset email. Please try again later.",
      customMessage: true,
    };
  }
};

exports.verifyResetToken = async (token) => {
  try {
    console.log("start Checking...");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);
    const user = await findUserByResetToken(token);

    if (!user) {
      return {
        valid: false,
        message:
          "This reset link has already been used or is invalid. Please request a new one.",
      };
    }

    return { valid: true, id: decoded.id };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        valid: false,
        message: "Your reset link has expired. Please request a new one.",
      };
    }
    if (err.name === "JsonWebTokenError") {
      return {
        valid: false,
        message: "Invalid reset link. Please request a new one.",
      };
    }
    return { valid: false, message: "Something went wrong." };
  }
};

exports.resetPassword = async (email, password, token) => {
  try {
    const result = await exports.verifyResetToken(token);

    if (!result.valid) {
      return {
        message: result.message,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "UPDATE users SET password = ? WHERE email = ?";
    const value = [hashedPassword, email];

    await db.query(query, value);

    await clearResetToken(email);

    return { success: true };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw {
        message: "Your reset link has expired. Please request a new one.",
        customMessage: true,
      };
    }

    if (err.name === "JsonWebTokenError") {
      throw {
        message: "Invalid reset link. Please request a new one.",
        customMessage: true,
      };
    }

    throw err;
  }
};
