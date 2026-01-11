const db = require("../Config/db.connection");

const createOrder = async ({
  userId,
  orderNumber,
  totalAmount,
  paymentMethod,
  expectedDelivery,
  status = "PLACED",
}) => {
  const [result] = await db.query(
    `INSERT INTO orders 
     (user_id, order_number, total_amount, payment_method, status, expected_delivery)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, orderNumber, totalAmount, paymentMethod, status, expectedDelivery]
  );

  return result.insertId;
};

const createOrderItem = async ({
  orderId,
  bookId,
  price,
  quantity,
  status = "PROCESSING",
  arrivingDate = null,
  trackingId = null,
}) => {
  await db.query(
    `INSERT INTO order_items 
     (order_id, book_id, price, quantity, status, arriving_date, tracking_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [orderId, bookId, price, quantity, status, arrivingDate, trackingId]
  );
};

const getOrdersByUser = async (userId, filters = {}) => {
  let query = `SELECT * FROM orders WHERE user_id = ?`;
  const params = [userId];

  if (filters.status) {
    query += ` AND status = ?`;
    params.push(filters.status);
  }

  if (filters.isDelayed !== undefined) {
    query += ` AND is_delayed = ?`;
    params.push(filters.isDelayed ? 1 : 0);
  }

  query += ` ORDER BY created_at DESC`;

  const [rows] = await db.query(query, params);
  return rows;
};

const getOrderItems = async (orderId, filters = {}) => {
  let query = `SELECT * FROM order_items WHERE order_id = ?`;
  const params = [orderId];

  if (filters.status) {
    query += ` AND status = ?`;
    params.push(filters.status);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

const updateOrderStatus = async (orderId, status) => {
  const [result] = await db.query(`UPDATE orders SET status = ? WHERE id = ?`, [
    status,
    orderId,
  ]);
  return result.affectedRows;
};

const updateOrderItemStatus = async (orderItemId, status) => {
  const [result] = await db.query(
    `UPDATE order_items SET status = ? WHERE id = ?`,
    [status, orderItemId]
  );
  return result.affectedRows;
};

const setOrderDelayStatus = async (orderId, isDelayed) => {
  const [result] = await db.query(
    `UPDATE orders SET is_delayed = ? WHERE id = ?`,
    [isDelayed ? 1 : 0, orderId]
  );
  return result.affectedRows;
};

const updateOrderInvoice = async (orderId, invoicePath) => {
  const [result] = await db.query(
    `UPDATE orders SET invoice = ? WHERE id = ?`,
    [invoicePath, orderId]
  );
  return result.affectedRows;
};

const updateOrderArrivingDate = async (orderId, arrivingDate) => {
  const [result] = await db.query(
    `UPDATE orders SET arriving_date = ? WHERE id = ?`,
    [arrivingDate, orderId]
  );
  return result.affectedRows;
};

const updateOrderItemArrivingDate = async (orderItemId, arrivingDate) => {
  const [result] = await db.query(
    `UPDATE order_items SET arriving_date = ? WHERE id = ?`,
    [arrivingDate, orderItemId]
  );
  return result.affectedRows;
};

const getOrderWithItems = async (orderId) => {
  const [orderRows] = await db.query(`SELECT * FROM orders WHERE id = ?`, [
    orderId,
  ]);

  if (orderRows.length === 0) return null;

  const order = orderRows[0];
  const items = await getOrderItems(orderId);

  return {
    ...order,
    items,
  };
};

const getOrdersListByUser = async (userId) => {
  const [rows] = await db.query(
    `
SELECT
    o.id AS order_id,
    o.order_number,
    o.created_at,
    o.total_amount,
    o.payment_method,
    o.expected_delivery,

    CASE
      WHEN SUM(oi.status = 'CANCELLED') = COUNT(*) THEN 'CANCELLED'
      WHEN SUM(oi.status = 'DELIVERED') = COUNT(*) THEN 'DELIVERED'
      WHEN SUM(oi.status = 'OUT_FOR_DELIVERY') > 0 THEN 'OUT_FOR_DELIVERY'
      WHEN SUM(oi.status = 'SHIPPED') > 0 THEN 'SHIPPED'
      ELSE 'PLACED'
    END AS order_status,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'order_item_id', oi.id,
            'item_status', oi.status,
            'price', oi.price,
            'quantity', oi.quantity,
            'book_id', b.id,
            'title', b.title,
            'cover_image', b.cover_image,
            'original_price', ROUND(b.BOOK_PRICE * 1.10, 2),
            'description', b.DESCRIPTION,
            'tracking_id', oi.tracking_id
        )
    ) AS order_items

FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN books b ON oi.book_id = b.id
WHERE o.user_id = ?
GROUP BY o.id
ORDER BY o.created_at DESC;
`,

    [userId]
  );

  return rows;
};

const getTrackingItem = async (itemId, trackingNumber) => {
  const [rows] = await db.execute(
    `
    SELECT 
    o.id AS order_id,
    o.order_number,
    o.expected_delivery,
    o.status AS order_status,
    o.address,
    o.payment_method,
    o.created_at AS order_created_at,
    
    oi.price AS item_price,
    oi.quantity,
    oi.discount,
    
    (oi.price * oi.quantity) AS item_subtotal,
    ROUND((oi.price * oi.quantity) * 0.05, 2) AS tax,
    CASE 
        WHEN (oi.price * oi.quantity) < 500 THEN 40.00 
        ELSE 0.00 
    END AS shipping_fee,
    ROUND(
        (oi.price * oi.quantity) + 
        ((oi.price * oi.quantity) * 0.05) + 
        CASE 
            WHEN (oi.price * oi.quantity) < 500 THEN 40.00 
            ELSE 0.00 
        END, 
    2) - oi.discount AS item_total,
    

    oi.id AS order_item_id,
    oi.status AS item_status,
    oi.tracking_id,
    
    b.title,
    b.cover_image,
    b.description

FROM order_items oi
JOIN orders o ON oi.order_id = o.id
JOIN books b ON oi.book_id = b.id
WHERE oi.id = ? AND oi.tracking_id = ?
    `,
    [itemId, trackingNumber]
  );

  return rows[0] || null;
};

module.exports = {
  createOrder,
  createOrderItem,
  getOrdersByUser,
  getOrderItems,
  updateOrderStatus,
  updateOrderItemStatus,
  setOrderDelayStatus,
  updateOrderInvoice,
  updateOrderArrivingDate,
  updateOrderItemArrivingDate,
  getOrderWithItems,
  getOrdersListByUser,
  getTrackingItem,
};
