const db = require("../Config/db.connection");
const { formatUser } = require("../utils/formatter");

// Create new user
const createUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    password = null,
    provider = null,
    providerId = null,
    emailVerified = false,
    termsAccepted = false,
    picture = null,
  } = userData;

  console.log("gggggggppppppppptttttttt", picture, userData);

  const [result] = await db.execute(
    `INSERT INTO users (first_name, last_name, email, password, provider, provider_id, email_verified, terms_accepted, profile_pic)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      email,
      password,
      provider,
      providerId,
      emailVerified,
      termsAccepted,
      picture,
    ],
  );

  return result;
};

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT 
  u.*,
  IFNULL(o.orders_count, 0) AS orders_count,
  IFNULL(w.wishlist_count, 0) AS wishlist_count
FROM users u
LEFT JOIN (
  SELECT user_id, COUNT(*) AS orders_count
  FROM orders
  GROUP BY user_id
) o ON u.id = o.user_id
LEFT JOIN (
  SELECT user_id, COUNT(*) AS wishlist_count
  FROM wishlists WHERE status = 'ACTIVE'
  GROUP BY user_id
) w ON u.id = w.user_id
WHERE u.email = ?;
`,
    [email],
  );

  return rows.length ? rows[0] : null;
};

// Get all users
const getAllUsers = async () => {
  const [rows] = await db.execute(`SELECT * FROM users`);
  return rows;
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
  const query = `SELECT 
  u.*,
  IFNULL(o.orders_count, 0) AS orders_count,
  IFNULL(w.wishlist_count, 0) AS wishlist_count,
  a.street_address AS default_address,
  a.pin_code, a.city, a.state
FROM users u
LEFT JOIN (
  SELECT user_id, COUNT(*) AS orders_count
  FROM orders
  GROUP BY user_id
) o ON u.id = o.user_id
LEFT JOIN (
  SELECT user_id, COUNT(*) AS wishlist_count
  FROM wishlists WHERE status = 'ACTIVE'
  GROUP BY user_id
) w ON u.id = w.user_id
 LEFT JOIN addresses a ON u.id = a.user_id AND a.is_default = 1
WHERE u.id = ?;`;
  const [rows] = await db.query(query, [userId]);
  return rows[0] || null;
};

const findUserByProvider = async (provider, providerId) => {
  const query = "SELECT * FROM users WHERE provider = ? AND provider_id = ?";
  const [rows] = await db.query(query, [provider, providerId]);
  return rows[0] || null;
};

const updateUserProvider = async (userId, provider, providerId) => {
  const query = `UPDATE users SET provider = ?, provider_id = ? WHERE id = ?`;
  await db.query(query, [provider, providerId, userId]);
};

const updateUserPicture = async (userId, picture) => {
  console.log("Updating Profile Pic: ", picture);

  const query = `UPDATE users SET profile_pic = ? WHERE id = ?`;
  await db.query(query, [picture, userId]);
};

const updateUserPicturePublicId = async (userId, public_id) => {
  console.log("Updating Profile Pic: ", public_id);

  const query = `UPDATE users SET profile_pic_public_id = ? WHERE id = ?`;
  await db.query(query, [public_id, userId]);
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  findUserByResetToken,
  clearResetToken,
  saveResetToken,
  findUserById,
  updateEmailVerified,
  findUserByProvider,
  updateUserProvider,
  updateUserPicture,
  updateUserPicturePublicId,
};
