const path = require("path");
const fs = require("fs");

const handleErrors = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};

const deleteImage = (filename) => {
  if (!filename) return;
  const picture = path.resolve(__dirname, "../images", filename);
  fs.unlink(picture, (err) => {
    if (err) console.log(err);
  });
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
