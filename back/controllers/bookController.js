const Book = require("../models/Books");
const { User } = require("../models/Users");
const { handleErrors } = require("../utils/helpers");

const controllers = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();

      if (books.length === 0) {
        return res.status(200).json({ data: [] });
      }

      return res.status(200).json({ data: books });
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Get book by id
  getBookById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return handleErrors(res, 400, {
          message: "Livre non trouvé !",
        });
      }

      return res.status(200).json({ data: book });
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Get 3 bestRaiting books
  getBestRaitingBooks: async (req, res) => {
    try {
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Add new book
  addBook: async (req, res) => {
    try {
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Update book by id
  updateBookById: async (req, res) => {
    try {
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Delete book by id
  deleteBookById: async (req, res) => {
    try {
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Add rating to book by id
  addRatingToBookById: async (req, res) => {
    try {
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};
module.exports = controllers;
