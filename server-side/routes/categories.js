const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
  .post("", adminController.addCategory)
  .get("", adminController.readCategories)
  .put("", adminController.editCategory);

module.exports = router;
