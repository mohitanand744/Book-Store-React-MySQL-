// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../Models/userModel");
const { formatUser } = require("../utils/formatter");
const { sendPasswordResetEmail } = require("./emailService");
const db = require("../Config/db.connection");

exports.registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  terms_accepted,
}) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered. Please login.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await createUser(
    first_name,
    last_name,
    email,
    hashedPassword,
    terms_accepted
  );

  return { userId: result.insertId };
};

exports.loginUser = async ({ email, password }) => {
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
    { expiresIn: "24h" }
  );

  const userDetails = formatUser([user]);

  return {
    token,
    user: userDetails,
  };
};

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
      { expiresIn: "10m" }
    );

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

exports.resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);
    const userId = decoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "UPDATE users SET password = ? WHERE id = ?";
    const value = [hashedPassword, userId];

    await db.query(query, value);

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
