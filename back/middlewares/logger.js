const logger = (req, res, next) => {
  console.log(`Date : ${new Date().toLocaleString()} / method: ${req.method} / URL: ${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};
module.exports = logger;
