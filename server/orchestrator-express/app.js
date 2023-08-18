"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./routes");
const cors = require("cors");

app
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(router)
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
