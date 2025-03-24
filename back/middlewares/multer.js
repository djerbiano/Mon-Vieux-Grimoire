const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const mimeTypes = {
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/bmp": ".bmp",
  "image/webp": ".webp",
};

// Storage in memory
const storage = multer.memoryStorage();

// Multer configuration
const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    // Check if book data is provided and valid
    const bookData = JSON.parse(req.body.book);
    if (!bookData.userId || !bookData.title || !bookData.author || !bookData.year || isNaN(bookData.year) || !bookData.genre) {
      return cb(new Error("Données du livre incomplètes"), false);
    }
    if (mimeTypes[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non pris en charge"), false);
    }
  },
}).single("image");

const resizeAndSaveImage = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return next();
    }

    try {
      // Unique file name webp
      const filename = `${Date.now()}.webp`;

      // Save folder
      const imagesDir = path.join(__dirname, "../images");

      // Resize and save image
      await sharp(req.file.buffer).resize(800, 800, { fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(imagesDir, filename));

      // Delete buffer
      delete req.file.buffer;

      req.imagePath = `${process.env.API_URL_IMAGES}/${filename}`;
      req.imageFilename = filename;
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = resizeAndSaveImage;
