// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../Models/userModel");

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
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    },
  };
};
