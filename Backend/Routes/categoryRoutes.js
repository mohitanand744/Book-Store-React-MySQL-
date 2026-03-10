const express = require("express");
const {
  getAllCategoriesController,
  getUserCategoriesController,
} = require("../Controllers/categoryController");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router.get("/lists", verifyToken, getAllCategoriesController);
router.get("/user/lists", verifyToken, getUserCategoriesController);

module.exports = router;
