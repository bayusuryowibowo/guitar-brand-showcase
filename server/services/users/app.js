"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { run } = require("./config/mongodb-connection");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(router)
  .use(errorHandler);

run().then((db) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
