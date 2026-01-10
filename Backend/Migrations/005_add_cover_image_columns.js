module.exports = {
  name: "add_cover_image_column",
  up: `
   ALTER TABLE books ADD COLUMN cover_image VARCHAR(255) DEFAULT null;
  `,
};
