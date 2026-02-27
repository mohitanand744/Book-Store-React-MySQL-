require("dotenv").config();
const mysql = require("mysql2/promise");

let pool;

async function initDB() {
  if (pool) return pool;

  try {
    const tempConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
    });

    await tempConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`,
    );
    console.log(`🎉 Database "${process.env.MYSQL_DATABASE}" is ready.`);

    await tempConnection.end();

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

    const connection = await pool.getConnection();
    console.log(`🎉 Connected to database: ${process.env.MYSQL_DATABASE}`);
    connection.release();

    await createTables();
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
    process.exit(1);
  }
}

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        terms_accepted BOOLEAN DEFAULT false,
        reset_token VARCHAR(255),
        provider VARCHAR(50),
        provider_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS author_details (
        AUTHOR_ID INT AUTO_INCREMENT PRIMARY KEY,
        AUTHOR_NAME VARCHAR(255) NOT NULL,
        AUTHOR_IMAGE_URL VARCHAR(500),
        AUTHOR_DESCRIPTION TEXT,
        AUTHOR_BOOKS_COUNT INT DEFAULT 0,
        AUTHOR_RATING DECIMAL(3,2) DEFAULT 0.00
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        TITLE VARCHAR(255) NOT NULL,
        DESCRIPTION TEXT,
        AUTHOR VARCHAR(255),
        BOOK_PRICE DECIMAL(10,2),
        CATEGORY VARCHAR(100),
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        AUTHOR_ID INT,
        FOREIGN KEY (AUTHOR_ID) REFERENCES author_details(AUTHOR_ID)
          ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS book_images (
        IMAGE_ID INT AUTO_INCREMENT PRIMARY KEY,
        BOOK_ID INT,
        IMAGE_URL JSON,
        FOREIGN KEY (BOOK_ID) REFERENCES books(ID)
          ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE,
  total_amount DECIMAL(10,2),
  payment_method VARCHAR(50),
  status ENUM('PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PLACED',
  expected_delivery DATE,
  is_delayed TINYINT(1) NOT NULL DEFAULT 0,
  invoice VARCHAR(255),
  arriving_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  price DECIMAL(10,2),
  quantity INT DEFAULT 1,
  arriving_date DATE,
  status ENUM('PROCESSING', 'SHIPPED', 'DELIVERED') DEFAULT 'PROCESSING',
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS wishlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY unique_user_book (user_id, book_id),

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_type VARCHAR(50) NOT NULL,
    pin_code VARCHAR(6) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    street_address TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
    `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS states (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    country VARCHAR(100) DEFAULT 'India',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); `);

    console.info(
      "✅ Database initialization complete: Scanned and created tables.",
    );
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  }
}

initDB();

module.exports = {
  initDB,
  getConnection: () => pool?.getConnection(),
  query: (...params) => {
    if (!pool) throw new Error("DB not initialized. Call initDB() first.");
    return pool.query(...params);
  },
  execute: (...params) => {
    if (!pool) throw new Error("DB not initialized. Call initDB() first.");
    return pool.execute(...params);
  },
};
