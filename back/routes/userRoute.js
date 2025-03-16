const express = require("express");
const controller = require("../controllers/userController");
const route = express.Router();

// Register user
route.post("/signup", controller.registerUser);

// Login user
route.post("/login", controller.loginUser);

module.exports = route;
