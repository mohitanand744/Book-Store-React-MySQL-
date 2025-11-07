const mysql = require("mysql2/promise");
require("dotenv").config();

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
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
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
        IMAGE_URL VARCHAR(500),
        FOREIGN KEY (BOOK_ID) REFERENCES books(ID)
          ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    console.log("✅ All required tables are created or already exist.");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  }
}

initDB();

module.exports = {
  initDB,
  getConnection: () => pool?.getConnection(),
  query: (...params) => pool?.query(...params),
  execute: (...params) => pool?.execute(...params),
};
