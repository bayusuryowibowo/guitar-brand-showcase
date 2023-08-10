"use strict";
const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const auth = require("../middlewares/auth");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(auth);
router.post("/products", Controller.addProduct);
router.get("/products", Controller.readProducts);
router.get("/products/:id", Controller.readProductById);
router.put("/products/:id", Controller.editProduct);
router.delete("/products/:id", Controller.deleteProduct);
router.post("/categories", Controller.addCategory);
router.get("/categories", Controller.readCategories);

module.exports = router;
