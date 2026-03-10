const db = require("../Config/db.connection");

const getAllCategories = async () => {
  const [row] = await db.execute(`SELECT * FROM categories`);

  return row.length > 0 ? row : null;
};

const getUserCategories = async (userId) => {
  console.log("UsersssIdddd", userId);

  const [rows] = await db.query(
    "SELECT favorite_Genres FROM users WHERE id = ?",
    [userId],
  );

  console.log("UsersssIddgggggdd", rows);

  if (!rows.length) return [];

  let ids = rows[0]?.favorite_Genres;

  if (!ids) return [];

  if (!ids.length) return [];

  const placeholders = ids.map(() => "?").join(",");

  const [categories] = await db.query(
    `SELECT * FROM categories WHERE id IN (${placeholders})`,
    ids,
  );

  console.log("categories : ", categories);

  return categories;
};

module.exports = { getAllCategories, getUserCategories };
