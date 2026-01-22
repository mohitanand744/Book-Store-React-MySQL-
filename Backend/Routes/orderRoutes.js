const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrdersList,
  getTrackingItems,
} = require("../Controllers/orderController");
const verifyToken = require("../Middleware/verifyToken");

router.post("/place-order", verifyToken, placeOrder);
router.get("/track/:itemId/:trackingId", verifyToken, getTrackingItems);
router.get("/order-list", verifyToken, getOrdersList);

module.exports = router;
