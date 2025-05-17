const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();
const JWT_SECRET = "supersecretwanderbookjwt"; // recomandat să fie în variabile de mediu

// Register
router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Completați toate câmpurile." });
  }
  try {
    // Verificăm dacă emailul există deja
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
      if (row) return res.status(400).json({ message: "Email deja înregistrat." });

      // Hasher parola
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserare user nou
      db.run(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
        [fullname, email, hashedPassword],
        function (err) {
          if (err) return res.status(500).json({ message: "Eroare la înregistrare." });

          // Generăm token JWT
          const token = jwt.sign({ id: this.lastID, fullname, email }, JWT_SECRET, {
            expiresIn: "24h",
          });

          res.json({ token, fullname, email });
        }
      );
    });
  } catch {
    res.status(500).json({ message: "Eroare internă server." });
  }
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Completați toate câmpurile." });

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(400).json({ message: "Email sau parola incorectă." });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Email sau parola incorectă." });

    const token = jwt.sign(
      { id: user.id, fullname: user.fullname, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, fullname: user.fullname, email: user.email, isAdmin: user.isAdmin });
  });
});

// Logout (pe backend nu e nevoie neapărat, se face în frontend prin ștergerea tokenului)

module.exports = router;
