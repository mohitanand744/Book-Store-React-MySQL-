import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiChevronDown,
  FiFileText,
  FiRepeat,
  FiShoppingCart,
} from "react-icons/fi";

// Mock Data
const orders = [
  {
    id: 1,
    orderNumber: "ORD-2023-001",
    date: "15 July 2023",
    total: "₹1,029",
    status: "Shipped", // Overall order status
    items: [
      {
        id: 101,
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSP_hMkSxjENfaqsEcGvw5Ni3UaqF6_ATeO0nts8zlkI04wVpaVSVk5a11bgQv6vZViNlAPIv95ayyCvpSnX7m4_uuR00smJvXNrCu4PetABK-po4yFDNjBhQ",
        title: "Desert Storms",
        description: "A soldier's survival tale.",
        price: "₹350",
        originalPrice: "₹499",
        quantity: 1,
        status: "Shipped",
        deliveryDate: "20 July 2023",
        trackingNumber: "TRK123456789",
      },
      {
        id: 102,
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQxvujwWsfysExcKQ13qZqcHYwWGHtUt7_YwdWK16u5pLLEvun2GzDX2e0yiHYk7dzD7G9YzytI1YQFQGvheUr9yO0my5CHLE-9ziS8whUw1nHL_UL_cm4i",
        title: "Love in the Time of...",
        description: "Romance and tech collide.",
        price: "₹269",
        originalPrice: "₹399",
        quantity: 1,
        status: "Processing",
        deliveryDate: "22 July 2023",
      },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-2023-002",
    date: "10 July 2023",
    total: "₹820",
    status: "Delivered",
    items: [
      {
        id: 201,
        image:
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTBXUSzMiGmOTeAtYJTCYdvr0uTfSRRh_KvNvGBolkPlZRdtpqo8VCG_1Hx8dHOzgQ6Om2pDwOFSg1YMSJy-paH9cGr3Y_tJLwD_Ef9nVRmQ5810WqZ5cxLcA",
        title: "Biotech Rising",
        description: "Gene editing in near future.",
        price: "₹410",
        originalPrice: "₹599",
        quantity: 2,
        status: "Delivered",
        deliveryDate: "14 July 2023",
        trackingNumber: "TRK987654321",
      },
    ],
  },
];

const statusConfig = {
  Processing: {
    icon: <FiPackage className="text-blue-500" />,
    color: "bg-blue-100 text-blue-800",
    progress: 1,
  },
  Shipped: {
    icon: <FiTruck className="text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    progress: 2,
  },
  Delivered: {
    icon: <FiCheckCircle className="text-green-500" />,
    color: "bg-green-100 text-green-800",
    progress: 3,
  },
};

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-[#FFE6C1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-[#5C4C49] mb-8"
        >
          Your Orders
        </motion.h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: order.id * 0.1 }}
              className="transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
            >
              {/* Order Summary (Clickable Header) */}
              <div
                onClick={() => toggleOrder(order.id)}
                className="flex items-center justify-between p-5 cursor-pointer"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <div>
                    <p className="text-xs text-gray-500">ORDER PLACED</p>
                    <p className="font-medium text-[#5C4C49]">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">TOTAL</p>
                    <p className="font-medium text-[#5C4C49]">{order.total}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ORDER #</p>
                    <p className="font-medium text-[#5C4C49]">
                      {order.orderNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusConfig[order.status].color
                    }`}
                  >
                    {order.status}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="text-[#5C4C49]" />
                  </motion.div>
                </div>
              </div>

              {/* Dropdown Content */}
              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#D3BD9D] px-5 py-4">
                      {/* Status Stepper */}
                      <div className="mb-6">
                        <div className="relative flex justify-between mb-8">
                          {Object.entries(statusConfig).map(
                            ([status, config]) => (
                              <div
                                key={status}
                                className="z-10 flex flex-col items-center"
                              >
                                <div
                                  className={`w-10 h-10  rounded-full flex items-center justify-center ${
                                    config.progress <=
                                    statusConfig[order.status].progress
                                      ? `${config.color} border-2 border-[#D3BD9D]`
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {config.icon}
                                </div>
                                <span className="mt-2 text-xs text-gray-600">
                                  {status}
                                </span>
                              </div>
                            )
                          )}
                          {/* Progress Line */}
                          <div className="absolute h-1 bg-gray-200 left-5 right-5 top-5">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-[#D3BD9D]"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (statusConfig[order.status].progress / 3) *
                                  100
                                }%`,
                              }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-4 flex flex-col sm:flex-row gap-4 border border-[#D3BD9D]/30 rounded-lg bg-[#FFE6C1]/10"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="self-center object-cover w-20 h-24 rounded-lg sm:self-start"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-[#5C4C49]">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {item.description}
                              </p>
                              <div className="flex items-center mt-2">
                                <span className="font-medium text-[#5C4C49]">
                                  {item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className="ml-2 text-xs text-gray-500 line-through">
                                    {item.originalPrice}
                                  </span>
                                )}
                                <span className="ml-auto text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center text-sm">
                                  {statusConfig[item.status].icon}
                                  <span className="ml-2">
                                    {item.status} •{" "}
                                    <span className="text-gray-600">
                                      Arrives {item.deliveryDate}
                                    </span>
                                  </span>
                                </div>
                                {item.trackingNumber && (
                                  <button className="px-3 py-1 text-xs bg-[#D3BD9D] hover:bg-[#5C4C49] text-[#5C4C49] hover:text-white rounded-full transition-colors">
                                    Track Package
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-wrap justify-end gap-2 mt-6">
                        <button className="flex items-center gap-1 px-3 py-2 text-sm border border-[#5C4C49] text-[#5C4C49] hover:bg-[#5C4C49] hover:text-white rounded-lg transition-colors">
                          <FiFileText /> Invoice
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 text-sm border border-[#5C4C49] text-[#5C4C49] hover:bg-[#5C4C49] hover:text-white rounded-lg transition-colors">
                          <FiRepeat /> Return
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 text-sm border border-[#5C4C49] text-[#5C4C49] hover:bg-[#5C4C49] hover:text-white rounded-lg transition-colors">
                          <FiShoppingCart /> Buy Again
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
