const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv").config();

function virifyToken(req, res, next) {
  // Get token from header
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Veuillez vous connecter !" });
  }

  try {
    // Remove Bearer from token
    token = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Add decoded information to the request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token: Erreur lors de la connexion !" });
  }
}

module.exports = virifyToken;
