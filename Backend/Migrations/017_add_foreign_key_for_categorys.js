module.exports = {
  name: "add_foreign_key_for_categorys",
  up: "ALTER TABLE books ADD FOREIGN KEY (category_id) REFERENCES categories(id);",
};
