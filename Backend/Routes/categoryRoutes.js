const express = require("express");
const {
  getAllCategoriesController,
  getUserCategoriesController,
} = require("../Controllers/categoryController");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router.get("/categories-lists", getAllCategoriesController);
router.get("/user/categories-lists", verifyToken, getUserCategoriesController);

module.exports = router;
