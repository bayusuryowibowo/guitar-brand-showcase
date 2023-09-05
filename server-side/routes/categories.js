const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
  .post("", adminController.addCategory)
  .get("", adminController.readCategories)
  .get("/:id", adminController.readCategoryById)
  .put("/:id", adminController.editCategory)
  .delete("/:id", adminController.deleteCategory);

module.exports = router;
