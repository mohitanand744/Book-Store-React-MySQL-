const {
  placeOrderService,
  getOrdersListService,
  getTrackingItemService,
} = require("../Services/orderService");
const handleDbError = require("../utils/handleDbError");
const { successResponse } = require("../utils/response");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, paymentMethod } = req.body;

    const orderId = await placeOrderService(userId, items, paymentMethod);

    successResponse(res, 201, "Order placed successfully", orderId);
  } catch (error) {
    console.error(error);
    handleDbError(error, res, next);
  }
};

exports.getOrdersList = async (req, res, next) => {
  try {
    const userId = req.userId;

    console.log("User Id:", userId);

    const orders = await getOrdersListService(userId);

    successResponse(res, 200, "", orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    handleDbError(error, res, next);
  }
};

exports.getTrackingItems = async (req, res, next) => {
  try {
    const { itemId, trackingId } = req.params;

    console.log("Tracking Details: ", itemId, trackingId);

    const response = await getTrackingItemService(itemId, trackingId);

    successResponse(res, 200, "", response);
  } catch (error) {
    console.error("Get Tracking Items Error:", error);
    handleDbError(error, res, next);
  }
};
