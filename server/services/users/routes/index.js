"use strict";
const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.post("/users", Controller.register)
router.get("/users")
router.get("/users/:id")
router.delete("/users/:id")

module.exports = router;