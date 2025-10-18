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

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  getUserDetailsById,
};
