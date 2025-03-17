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
      const name = req.file.originalname.split(".")[0].split(" ").join("_");
      const filename = `${name}${Date.now()}.webp`;

      // Save folder
      const imagesDir = path.join(__dirname, "../images");

      // Resize and save image
      await sharp(req.file.buffer)
        .resize(800, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(imagesDir, filename));

      // Delete buffer
      delete req.file.buffer;

      req.imagePath = filename;
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = resizeAndSaveImage;
