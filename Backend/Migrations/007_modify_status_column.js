module.exports = {
  name: "modify_status_columns",
  up: `
 ALTER TABLE order_items 
MODIFY status 
ENUM('PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') 
NOT NULL;
  `,
};
