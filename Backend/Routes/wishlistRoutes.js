const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const { addToWishlist, getWishlist } = require("../Controllers/wishlistController");

router.post("/toggle-wishlist", verifyToken, addToWishlist);
router.get("/get-wishlist", verifyToken, getWishlist);

module.exports = router;
