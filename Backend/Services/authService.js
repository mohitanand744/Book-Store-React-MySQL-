// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../Models/userModel");
const { formatUser } = require("../utils/formatter");

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
  console.log(password, user.password);

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
