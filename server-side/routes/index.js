"use strict";
const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const auth = require("../middlewares/auth");

router.post("/login", Controller.login);
router.use(auth);
router.post("/products", Controller.addProduct);

module.exports = router;
