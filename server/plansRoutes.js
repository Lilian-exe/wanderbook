const express = require("express");
const db = require("./db");

const router = express.Router();

// Obține toate planurile turistice, cu filtru opțional (țară, rating, preț)
router.get("/", (req, res) => {
  const { country, minPrice, maxPrice, minRating } = req.query;

  let query = "SELECT * FROM plans WHERE 1=1";
  let params = [];

  if (country) {
    query += " AND country = ?";
    params.push(country);
  }
  if (minPrice) {
    query += " AND price >= ?";
    params.push(minPrice);
  }
  if (maxPrice) {
    query += " AND price <= ?";
    params.push(maxPrice);
  }
  if (minRating) {
    query += " AND rating >= ?";
    params.push(minRating);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ message: "Eroare la extragerea planurilor." });
    res.json(rows);
  });
});

// Obține detaliile unui plan după id
router.get("/:id", (req, res) => {
  const planId = req.params.id;
  db.get("SELECT * FROM plans WHERE id = ?", [planId], (err, plan) => {
    if (err) return res.status(500).json({ message: "Eroare la extragerea planului." });
    if (!plan) return res.status(404).json({ message: "Planul nu a fost găsit." });
    res.json(plan);
  });
});

module.exports = router;
