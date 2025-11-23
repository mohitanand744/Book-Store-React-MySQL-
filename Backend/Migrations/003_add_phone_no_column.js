module.exports = {
  name: "add_phone_no_column",
  up: `
    ALTER TABLE users ADD COLUMN phone_number VARCHAR(255);
  `,
};
