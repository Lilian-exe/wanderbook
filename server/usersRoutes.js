const express = require("express");
const db = require("./db");

const router = express.Router();

// Obține profilul userului curent
router.get("/profile", (req, res) => {
  const userId = req.user.id;
  db.get("SELECT id, fullname, email, isAdmin FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) return res.status(500).json({ message: "Eroare la extragerea datelor." });
    res.json(user);
  });
});

// Obține istoricul rezervărilor userului
router.get("/reservations", (req, res) => {
  const userId = req.user.id;
  const query = `
    SELECT r.id, p.title, p.country, p.price, r.reservationDate
    FROM reservations r
    JOIN plans p ON r.planId = p.id
    WHERE r.userId = ?
  `;
  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Eroare la extragerea rezervărilor." });
    res.json(rows);
  });
});

module.exports = router;
