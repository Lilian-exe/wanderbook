const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Creăm/legăm baza de date
const db = new sqlite3.Database(path.resolve(__dirname, "wanderbook.db"), (err) => {
  if (err) {
    console.error("Eroare la conectarea bazei de date:", err.message);
  } else {
    console.log("Conectat la baza de date SQLite.");
  }
});

// Creăm tabelele dacă nu există (useri, planuri, rezervări, recenzii)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      isAdmin INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      country TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      rating REAL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      planId INTEGER,
      reservationDate TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(planId) REFERENCES plans(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      planId INTEGER,
      rating INTEGER NOT NULL,
      comment TEXT,
      reviewDate TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(planId) REFERENCES plans(id)
    )
  `);
});

module.exports = db;
