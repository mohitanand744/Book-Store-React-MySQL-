const express = require("express");
const {
  getAllCategoriesController,
} = require("../Controllers/categoryController");
const { verifyTokenValidation } = require("../Validators/authValidator");
const router = express.Router();

router.get("/lists", verifyTokenValidation, getAllCategoriesController);

module.exports = router;
