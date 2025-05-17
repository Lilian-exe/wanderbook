const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./authRoutes");
const plansRoutes = require("./plansRoutes");
const usersRoutes = require("./usersRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rute publice
app.use("/api/auth", authRoutes);

// Middleware pentru protejarea rutelor care necesită autentificare
app.use(authMiddleware);

// Rute protejate
app.use("/api/plans", plansRoutes);
app.use("/api/users", usersRoutes);

// Pornire server
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
