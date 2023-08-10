"use strict";

const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = err.errors[0].message;
      break;
    default:
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler