const db = require("../Config/db.connection");

const getAllStates = async () => {
  const [rows] = await db.execute("SELECT * FROM states WHERE is_active = TRUE");
  return rows;
};

const getAddressesByUserId = async (userId) => {
  const [rows] = await db.execute(
    "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC",
    [userId]
  );
  return rows;
};

const addAddress = async (userId, addressData) => {
  const { type, pinCode, city, state, address, isDefault } = addressData;

  if (isDefault) {
    await db.execute("UPDATE addresses SET is_default = FALSE WHERE user_id = ?", [userId]);
  }

  const [result] = await db.execute(
    `INSERT INTO addresses (user_id, address_type, pin_code, city, state, street_address, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, type, pinCode, city, state, address, isDefault || false]
  );

  return result;
};

const updateAddress = async (id, userId, addressData) => {
  const { type, pinCode, city, state, address, isDefault } = addressData;

  if (isDefault) {
    await db.execute("UPDATE addresses SET is_default = FALSE WHERE user_id = ?", [userId]);
  }

  const [result] = await db.execute(
    `UPDATE addresses 
     SET address_type = ?, pin_code = ?, city = ?, state = ?, street_address = ?, is_default = ?
     WHERE id = ? AND user_id = ?`,
    [type, pinCode, city, state, address, isDefault || false, id, userId]
  );

  return result;
};

const deleteAddress = async (id, userId) => {
  const [result] = await db.execute("DELETE FROM addresses WHERE id = ? AND user_id = ?", [id, userId]);
  return result;
};

module.exports = {
  getAllStates,
  getAddressesByUserId,
  addAddress,
  updateAddress,
  deleteAddress,
};
