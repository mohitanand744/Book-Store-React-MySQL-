const db = require("../Config/db.connection");

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
  return rows[0];
};

// Get all users
const getAllUsers = async () => {
  const [rows] = await db.execute(`SELECT * FROM users`);
  return rows;
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
};
