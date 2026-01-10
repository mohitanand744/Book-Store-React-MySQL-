/**
 * Run with: node seedOrders.js
 */

const db = require("../Config/db.connection");

// -------------------- CHECK ENVIRONMENT --------------------
if (process.env.NODE_ENV === "test") {
  throw new Error("❌ Seeding is not allowed in test environment");
}

if (process.env.NODE_ENV === "production") {
  throw new Error("❌ Seeding is not allowed in production");
}

// -------------------- HELPERS --------------------
const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomDateBetween = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// -------------------- MOCK CONSTANTS --------------------
const ORDER_STATUSES = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

const ITEM_STATUSES_BY_ORDER = {
  PLACED: ["PROCESSING", "SHIPPED"],
  SHIPPED: ["SHIPPED", "DELIVERED"],
  DELIVERED: ["DELIVERED"],
  CANCELLED: ["CANCELLED"],
};

const PAYMENT_METHODS = ["COD", "UPI", "CARD"];

const TOTAL_ORDERS_TO_CREATE = 20;

// -------------------- SEED FUNCTION --------------------
const seedOrders = async () => {
  try {
    console.log("🌱 Seeding orders...");

    await db.initDB();

    await db.query("SET FOREIGN_KEY_CHECKS = 0");
    await db.query("TRUNCATE TABLE order_items");
    await db.query("TRUNCATE TABLE orders");
    await db.query("SET FOREIGN_KEY_CHECKS = 1");

    // Fetch existing users & books
    const [users] = await db.query(`SELECT id FROM users`);
    const [books] = await db.query(`SELECT id, book_price FROM books`);

    if (!users.length || !books.length) {
      throw new Error("Users or Books table is empty");
    }

    for (let i = 0; i < TOTAL_ORDERS_TO_CREATE; i++) {
      const user = randomFromArray(users);
      const orderStatus = randomFromArray(ORDER_STATUSES);
      const paymentMethod = randomFromArray(PAYMENT_METHODS);

      const createdAt = randomDateBetween(new Date("2024-01-01"), new Date());

      const expectedDelivery = randomDateBetween(
        new Date(createdAt),
        new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000)
      );

      const orderNumber = generateOrderNumber();

      // Pick 1–3 books per order
      const itemsCount = Math.floor(Math.random() * 3) + 1;
      const selectedBooks = books
        .sort(() => 0.5 - Math.random())
        .slice(0, itemsCount);

      let totalAmount = 0;

      // ---- CREATE ORDER ----
      const [orderResult] = await db.query(
        `
        INSERT INTO orders 
        (user_id, order_number, total_amount, payment_method, status, expected_delivery)
        VALUES (?, ?, ?, ?, ?, ?);
        `,
        [
          user.id,
          orderNumber,
          0, // temp amount
          paymentMethod,
          orderStatus,
          expectedDelivery,
        ]
      );

      const orderId = orderResult.insertId;

      // ---- CREATE ORDER ITEMS ----
      for (const book of selectedBooks) {
        const quantity = Math.floor(Math.random() * 2) + 1;
        const price = book.book_price;

        const allowedItemStatuses = ITEM_STATUSES_BY_ORDER[orderStatus];
        const itemStatus = randomFromArray(allowedItemStatuses);

        totalAmount += price * quantity;

        const trackingId =
          itemStatus === "SHIPPED"
            ? `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            : null;

        const arrivingDate =
          itemStatus === "DELIVERED"
            ? randomDateBetween(createdAt, expectedDelivery)
            : null;

        await db.query(
          `
          INSERT INTO order_items 
          (order_id, book_id, price, quantity, status, arriving_date, tracking_id)
          VALUES (?, ?, ?, ?, ?, ?, ?);
          `,
          [
            orderId,
            book.id,
            price,
            quantity,
            itemStatus,
            arrivingDate,
            trackingId,
          ]
        );
      }

      // ---- UPDATE TOTAL AMOUNT ----
      await db.query(`UPDATE orders SET total_amount = ? WHERE id = ?;`, [
        totalAmount,
        orderId,
      ]);
    }

    console.log("✅ Orders seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// -------------------- RUN --------------------
seedOrders();
