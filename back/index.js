const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const connectToDatabase = require("./config/db");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");

const port = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());

// Parse URL-encoded data from forms
server.use(express.urlencoded({ extended: true }));

// Static files
server.use("/images", express.static("images"));

// Connect to the database
connectToDatabase();

// Middleware to log information for each request
server.use(logger);

// API test
server.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "API fonctionnelle !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Routes
server.use("/api/auth", userRoute);
server.use("/api", bookRoute);

// Non-existent endpoints
server.all("*", (req, res) => {
  return res.status(404).json({ message: "Endpoint inexistant !" });
});

// Start server
server.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
