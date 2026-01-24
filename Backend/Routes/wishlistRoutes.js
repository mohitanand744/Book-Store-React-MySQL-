const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const { addToWishlist, getWishlist } = require("../Controllers/wishlistController");

router.post("/add-to-wishlist", verifyToken, addToWishlist);
router.get("/get-wishlist", verifyToken, getWishlist);

module.exports = router;
