module.exports = {
  name: "add_language_discount_columns",
  up: `
 ALTER TABLE books ADD COLUMN LANGUAGE VARCHAR(50);
ALTER TABLE books ADD COLUMN DISCOUNT INT DEFAULT 0;
  `,
};
