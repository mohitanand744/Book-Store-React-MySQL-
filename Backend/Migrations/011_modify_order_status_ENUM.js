module.exports = {
  name: "modify_orders_status_columns",
  up: `
 ALTER TABLE orders
MODIFY COLUMN status
ENUM('PLACED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')
NOT NULL; `,
};
