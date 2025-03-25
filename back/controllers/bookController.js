const Book = require("../models/Books");
const { User } = require("../models/Users");
const { handleErrors, deleteImageAndSendErrorMessage, deleteImage } = require("../utils/helpers");

const controllers = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();

      if (books.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(books);
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

      return res.status(200).json(book);
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Get 3 bestRaiting books
  getBestRaitingBooks: async (req, res) => {
    try {
      const books = await Book.find().sort({ averageRating: -1 }).limit(3);
      return res.status(200).json(books);
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Add new book
  addBook: async (req, res) => {
    try {
      const bookData = JSON.parse(req.body.book);
      const book = new Book(bookData);
      book.imageUrl = req.imagePath;
      await book.save();
      return res.status(201).json({ message: book.title + " a bien été ajouté !" });
    } catch (error) {
      deleteImage(req.imageFilename);
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Update book by id
  updateBookById: async (req, res) => {
    try {
      let book = await Book.findById(req.params.id);

      if (!book) {
        deleteImage(req.imageFilename);
        return handleErrors(res, 404, {
          message: "Livre non trouvé !",
        });
      }
      // Get book data from frontend
      const bookData = req.body.book ? JSON.parse(req.body.book) : req.body;

      // Check if user is author
      if (req.user._id !== book.userId.toString()) {
        deleteImageAndSendErrorMessage(req.imageFilename, res, 403, {
          message: "Vous ne pouvez pas modifier ce livre !",
        });
        return;
      }

      // Save old image if exists to delete it
      const oldImage = req.body.book ? book.imageUrl.split("/").pop() : null;

      // Update book fields
      const fieldsToUpdate = ["title", "author", "year", "genre"];
      fieldsToUpdate.forEach((field) => {
        if (bookData[field] !== undefined) book[field] = bookData[field];
      });

      if (req.imagePath) book.imageUrl = req.imagePath;

      await book.save();

      const imageDeleted = await deleteImage(oldImage);

      if (!imageDeleted) {
        return handleErrors(res, 200, {
          message: `Le livre ${book.title} a bien été modifié mais l'image n'a pas pu être supprimée !`,
        });
      }

      return res.status(200).json({ message: `${book.title} a bien été modifié !` });
    } catch (error) {
      deleteImage(req.imageFilename);
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Delete book by id
  deleteBookById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return handleErrors(res, 404, {
          message: "Livre non trouvé !",
        });
      }

      // Check if user is author
      if (req.user._id !== book.userId.toString()) {
        return handleErrors(res, 403, {
          message: "Vous ne pouvez pas supprimer ce livre !",
        });
      }
      // get pictureName to delete it
      const picture = book.imageUrl ? book.imageUrl.split("/").pop() : null;

      await Book.findByIdAndDelete(req.params.id);

      const imageDeleted = await deleteImage(picture);

      if (!imageDeleted) {
        return handleErrors(res, 200, {
          message: `Le livre ${book.title} a bien été supprimé mais l'image n'a pas pu être supprimée !`,
        });
      }

      return res.status(200).json({ message: `Le livre ${book.title} a bien été supprimé !` });
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Add rating to book by id
  addRatingToBookById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return handleErrors(res, 404, {
          message: "Livre non trouvé !",
        });
      }

      // Check if user has already rated this book
      const ratingExist = book.ratings.find((rating) => rating.userId.toString() === req.user._id);

      if (ratingExist) {
        return handleErrors(res, 403, {
          message: "Vous avez déja donné une note pour ce livre !",
        });
      }
      // check if rating is between 0 and 5
      const rating = req.body.rating;
      if (rating == null || typeof rating !== "number" || rating < 0 || rating > 5) {
        return handleErrors(res, 400, { message: "La note doit être un nombre compris entre 0 et 5 !" });
      }

      // Add rating to book
      book.ratings.push({ userId: req.user._id, grade: rating });

      // Calculate average rating
      book.averageRating = parseFloat((book.ratings.reduce((acc, rating) => acc + rating.grade, 0) / book.ratings.length).toFixed(2));

      await book.save();

      return res.status(200).json(book);
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};
module.exports = controllers;
