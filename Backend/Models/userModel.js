const db = require("../Config/db.connection");
const { formatUser } = require("../utils/formatter");

// Create new user
const createUser = async (
  firstName,
  lastName,
  email,
  hashedPassword,
  termsAccepted
) => {
  const [result] = await db.execute(
    `INSERT INTO users (first_name, last_name, email, password, terms_accepted) 
     VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword, termsAccepted]
  );
  return result;
};

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  return rows.length ? rows[0] : null;
};

// Get all users
const getAllUsers = async () => {
  const [rows] = await db.execute(`SELECT * FROM users`);
  return rows;
};

// Get user by ID
const getUserDetailsById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, first_name, last_name, created_at, email FROM users WHERE id = ?",
    [id]
  );

  const userDetails = formatUser(rows);

  return rows.length ? userDetails : null;
};

const saveResetToken = async (email, resetToken) => {
  const query = "UPDATE users SET reset_token = ? WHERE email = ?";
  const values = [resetToken, email];
  await db.query(query, values);
};

const findUserByResetToken = async (resetToken) => {
  const query = "SELECT * FROM users WHERE reset_token = ?";
  const [rows] = await db.query(query, [resetToken]);
  return rows[0] || null;
};

const clearResetToken = async (email) => {
  const query = "UPDATE users SET reset_token = NULL WHERE email = ?";
  await db.query(query, [email]);
};

const updateEmailVerified = async (email) => {
  const query = "UPDATE users SET email_verified = 1 WHERE email = ?";
  await db.query(query, [email]);
};

const findUserById = async (userId) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await db.query(query, [userId]);
  return rows[0] || null;
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserDetailsById,
  findUserByResetToken,
  clearResetToken,
  saveResetToken,
  findUserById,
  updateEmailVerified,
};
