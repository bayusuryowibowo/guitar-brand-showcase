const express = require("express");
const adminController = require("../controllers/adminController");
const productAuthz = require("../middlewares/productAuthz");
const router = express.Router();

router
  .post("", adminController.addProduct)
  .get("", adminController.readProducts)
  .get("/:id", adminController.readProductById)
  .put("/:id", productAuthz, adminController.editProduct)
  .delete("/:id", productAuthz, adminController.deleteProduct);

module.exports = router;
