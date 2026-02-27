module.exports = {
  name: "add_addresses_state_foreign_key",
  up: `
    ALTER TABLE addresses
ADD COLUMN state_id INT,
ADD FOREIGN KEY (state_id) REFERENCES states(id);
  `,
};
