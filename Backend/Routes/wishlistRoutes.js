const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const { addToWishlist } = require("../Controllers/wishlistController");

router.post("/add-to-wishlist", verifyToken, addToWishlist);

module.exports = router;
