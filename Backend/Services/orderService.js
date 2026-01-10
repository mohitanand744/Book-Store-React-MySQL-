const {
  createOrder,
  createOrderItem,
  getOrdersListByUser,
} = require("../Models/orderModel");

const placeOrderService = async (userId, items, paymentMethod) => {
  const orderNumber = `ORD-${Date.now()}`;
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const trackingId = `TRK-${Date.now()}`;

  const expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + 5);

  const orderId = await createOrder({
    userId,
    orderNumber,
    totalAmount,
    paymentMethod,
    expectedDelivery,
  });

  for (const item of items) {
    await createOrderItem({
      orderId,
      bookId: item.bookId,
      price: item.price,
      quantity: item.quantity,
      status: "PROCESSING",
      arrivingDate: expectedDelivery,
      trackingId: trackingId,
    });
  }

  return orderId;
};

const getOrdersListService = async (userId) => {
  const rows = await getOrdersListByUser(userId);
  const Orders = rows;

  return Orders;
};

module.exports = {
  placeOrderService,
  getOrdersListService,
};
