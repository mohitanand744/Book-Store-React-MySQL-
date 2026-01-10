module.exports = {
  name: "add_tracking_id_column",
  up: `
   ALTER TABLE order_items ADD COLUMN tracking_id VARCHAR(255) DEFAULT null;
  `,
};
