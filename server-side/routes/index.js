"use strict";
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminAuth = require("./adminAuth");
const products = require("./products");
const categories = require("./categories");
const pub = require("./pub");

router
  .use("/pub", pub)
  .use(adminAuth)
  .use(auth)
  .use("/products", products)
  .use("/categories", categories);

module.exports = router;
