"use strict";
const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get("/pub/products", Controller.readProducts)
router.get("/pub/products/:id", Controller.readProductById)
router.get("/pub/categories", Controller.readCategories)
router.get("/pub/categories/:id", Controller.readCategoryById)

module.exports = router;