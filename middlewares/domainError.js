module.exports = (err, _req, res, next) => {
  if (!err.code) {
    return next(err);
  }

  res
    .status(err.code)
    .json({ message: err.message });
};
