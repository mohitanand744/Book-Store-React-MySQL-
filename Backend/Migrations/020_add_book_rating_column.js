module.exports = {
  name: "add_book_rating_column",
  up: "ALTER TABLE books ADD COLUMN book_rating DECIMAL(2,1) DEFAULT NULL;",
};