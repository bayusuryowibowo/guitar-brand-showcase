"use strict";
const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get("/pub/products", Controller.readProducts)

module.exports = router;