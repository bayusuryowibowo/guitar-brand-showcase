const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router
  .post("", adminController.addCategory)
  .get("", adminController.readCategories);

module.exports = router;
