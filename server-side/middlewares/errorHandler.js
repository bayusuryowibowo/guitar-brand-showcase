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
    case "ValidationError":
      code = 400;
      message = "Please enter email and password";
      break;
    case "UserNotFound":
    case "FailedLogin":
      code = 401;
      message = "Invalid login";
      break;
    case "NoToken":
      code = 401;
      message = "Access token is required";
      break;
    case "JsonWebTokenError":
      code = 401;
      message = "Invalid access token";
      break;
    case "Unauthorized":
      code = 401;
      message = "Unauthorized";
      break;
    default:
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
