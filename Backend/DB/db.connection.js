const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_USER_PASSWORD,
  database: "bookstore",
});

db.connect((err) => {
  if (err) console.error("Error connecting to the database: " + err.stack);
  console.log("Connected to the database");
});

module.exports = db;
