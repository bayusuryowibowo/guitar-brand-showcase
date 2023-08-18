"use strict";

const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(err.name, "<<< masuk error handler");
  console.log(err, "<<<< error nya");
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
