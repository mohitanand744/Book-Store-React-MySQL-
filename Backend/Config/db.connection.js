const mysql = require("mysql2/promise");

let pool;

async function initDB() {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection (handshake)
    const connection = await pool.getConnection();
    console.log(
      `🎉 Hooray! Database (${process.env.MYSQL_DATABASE}) handshake complete!`
    );
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

// Initialize immediately
initDB();

module.exports = {
  // Export helpers
  getConnection: () => pool.getConnection(),
  query: (...params) => pool.query(...params),
  execute: (...params) => pool.execute(...params),
};
