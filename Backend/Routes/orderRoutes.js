const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrdersList,
} = require("../Controllers/order.controller");
const verifyToken = require("../Middleware/verifyToken");

router.post("/place-order", verifyToken, placeOrder);

router.get("/order-list", verifyToken, getOrdersList);

module.exports = router;
