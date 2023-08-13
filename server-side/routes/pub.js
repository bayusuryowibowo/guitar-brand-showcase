const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .get("/products", userController.readProducts)
  .get("/products/:id", userController.readProductById)
  .get("/categories", userController.readCategories)
  .get("/categories/:id", userController.readCategoryById);

module.exports = router;
