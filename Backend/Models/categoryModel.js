const db = require("../Config/db.connection");

const getAllCategories = async () => {
  const [row] = await db.execute(`SELECT * FROM categories`);

  console.log("categoROw", row);

  return row.length > 0 ? row : null;
};

module.exports = { getAllCategories };
