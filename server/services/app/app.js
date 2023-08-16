"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(router)
  .use(errorHandler)
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
