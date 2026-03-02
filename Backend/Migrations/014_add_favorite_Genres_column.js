module.exports = {
  name: "add_favorite_Genres_column",
  up: "ALTER TABLE users ADD COLUMN favorite_Genres JSON;",
};
