"use strict";

const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(err.name, "<<< masuk error handler");
  switch (err.name) {
    
    default:
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;