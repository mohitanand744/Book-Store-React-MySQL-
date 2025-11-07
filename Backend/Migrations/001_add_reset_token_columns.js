module.exports = {
  name: "add_reset_token_columns",
  up: `
    ALTER TABLE users ADD COLUMN reset_token VARCHAR(255);
  `,
};
