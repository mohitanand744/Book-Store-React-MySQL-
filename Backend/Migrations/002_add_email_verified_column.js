module.exports = {
  name: "add_email_verified_column",
  up: `
   ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;
  `,
};
