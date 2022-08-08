const notFoundMiddleware = (req, res) => {
  res.status(404).send("Route Does not exit");
};

module.exports = notFoundMiddleware;
