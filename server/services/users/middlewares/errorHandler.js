"use strict";

const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  switch (err.name) {
    case "NotFound":
      code = 404;
      message = "Data not found";
      break;
    default:
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
