const path = require("path");
const fs = require("fs").promises;

const handleErrors = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};

const deleteImage = async (filename) => {
  const picture = path.resolve(__dirname, "../images", filename);

  try {
    await fs.unlink(picture);
    return true;
  } catch (err) {
    console.error("Erreur lors de la suppression de l'image:", err);
    return false;
  }
};

const deleteImageAndSendErrorMessage = (file, res, statusCode, message) => {
  deleteImage(file);
  return res.status(statusCode).json(message);
};

module.exports = {
  handleErrors,
  deleteImage,
  deleteImageAndSendErrorMessage,
};
