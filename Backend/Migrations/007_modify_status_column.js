module.exports = {
  name: "modify_status_columns",
  up: `
 ALTER TABLE order_items
MODIFY COLUMN status 
ENUM('PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')
NOT NULL;

  `,
};
