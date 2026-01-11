module.exports = {
  name: "add_discount_columns",
  up: `
 ALTER TABLE order_items 
ADD COLUMN discount DECIMAL(10, 2) DEFAULT 0.00;
  `,
};
