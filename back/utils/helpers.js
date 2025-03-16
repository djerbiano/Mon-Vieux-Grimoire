const handleErrors = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};

module.exports = {
  handleErrors,
};
