const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
  .post("", adminController.addProduct)
  .get("", adminController.readProducts)
  .get("/:id", adminController.readProductById)
  .put("/:id", adminController.editProduct)
  .delete("/:id", adminController.deleteProduct);

module.exports = router;
