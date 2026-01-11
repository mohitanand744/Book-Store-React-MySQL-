module.exports = {
  name: "add_tax_shippingfee_columns",
  up: `
 ALTER TABLE orders
ADD tax DECIMAL(10,2) DEFAULT 0,
ADD shipping_fee DECIMAL(10,2) DEFAULT 0;
  `,
};
