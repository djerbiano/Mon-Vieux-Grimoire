const express = require("express");
const controller = require("../controllers/bookController");
const virifyToken = require("../middlewares/virifyToken");
const multerAndSarp = require("../middlewares/multer");
const route = express.Router();

// Get 3 bestRaiting books
route.get("/books/bestrating", controller.getBestRaitingBooks);

// Get all books
route.get("/books", controller.getAllBooks);

// Get book by id
route.get("/books/:id", controller.getBookById);

// Update book by id
route.put("/books/:id", virifyToken, multerAndSarp, controller.updateBookById);

// Delete book by id
route.delete("/books/:id", virifyToken, controller.deleteBookById);

// Add rating to book by id
route.post("/books/:id/rating", virifyToken, controller.addRatingToBookById);

// Add new book
route.post("/books", virifyToken, multerAndSarp, controller.addBook);

module.exports = route;
