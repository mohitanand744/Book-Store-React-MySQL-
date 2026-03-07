module.exports = {
  name: "add_category_id_column",
  up: "ALTER TABLE books ADD COLUMN category_id INT;",
};
