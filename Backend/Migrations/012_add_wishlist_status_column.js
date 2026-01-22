module.exports = {
  name: "add_wishlist_status_column",
  up: `
    ALTER TABLE wishlists ADD COLUMN status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE';
  `,
};
