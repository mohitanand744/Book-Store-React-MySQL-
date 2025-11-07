const fs = require("fs");
const path = require("path");
const db = require("./db.connection.js");

async function runMigrations() {
  try {
    console.log("Running migrations...");
    await db.initDB();
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const migrationsDir = path.resolve("./migrations");
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      const migration = require(path.join("../migrations", file));

      const [rows] = await db.query(
        "SELECT id FROM migrations WHERE name = ?",
        [migration.name]
      );

      if (rows.length === 0) {
        console.log(`Executing migration: ${migration.name}`);
        await db.query(migration.up);
        await db.query("INSERT INTO migrations (name) VALUES (?)", [
          migration.name,
        ]);
        console.log(`✅ Completed: ${migration.name}`);
      } else {
        console.log(`Skipped (already executed): ${migration.name}`);
      }
    }

    console.log("🎉 All migrations are up to date!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }
}

runMigrations();
