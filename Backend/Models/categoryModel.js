const db = require("../Config/db.connection");

const getAllCategories = async () => {
  const [row] = await db.execute(`SELECT * FROM categories`);

  return row.length > 0 ? row : null;
};

module.exports = { getAllCategories };
