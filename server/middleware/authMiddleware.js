const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecretwanderbookjwt";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de autentificare lipsește." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // datele din token: id, fullname, email, isAdmin
    next();
  } catch {
    res.status(401).json({ message: "Token invalid sau expirat." });
  }
};
