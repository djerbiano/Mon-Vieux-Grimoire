const express = require("express");
const controller = require("../controllers/bookController");
const route = express.Router();

// Get all books
route.get("/books", controller.getAllBooks);

// Get book by id
route.get("/books/:id", controller.getBookById);

// Get 3 bestRaiting books
route.get("/books/bestrating", controller.getBestRaitingBooks);

// Add new book
route.post("/books", controller.addBook);

// Update book by id
route.put("/books/:id", controller.updateBookById);

// Delete book by id
route.delete("/books/:id", controller.deleteBookById);

// Add rating to book by id
route.post("/books/:id/rating", controller.addRatingToBookById);


module.exports = route;
