module.exports = {
  name: "add_address_column",
  up: `
   ALTER TABLE orders ADD COLUMN address VARCHAR(255) NOT NULL;
  `,
};
