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
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiHash,
  FiXCircle,
} from "react-icons/fi";
import { CopyIcon } from "../components/SVGs/SVGs";
import toast from "react-hot-toast";
import Banners from "../components/Banners/Banners";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../utils/apis/ordersApi";
import { useEffect } from "react";
import { useLoader } from "../Hooks/useLoader";
import BooksLoader from "../components/Loaders/BooksLoader";

const statusConfig = {
  PLACED: {
    icon: <FiPackage className="text-blue-500" />,
    color: "bg-blue-100 text-blue-800",
    progress: 1,
    estimatedText: "Est. delivery 5-7 business days",
  },
  SHIPPED: {
    icon: <FiTruck className="text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    progress: 2,
    estimatedText: "Arriving in 2-3 business days",
  },
  DELIVERED: {
    icon: <FiCheckCircle className="text-green-500" />,
    color: "bg-green-100 text-green-800",
    progress: 3,
    estimatedText: "Delivered on " + new Date().toLocaleDateString(),
  },
  OUT_FOR_DELIVERY: {
    icon: <FiTruck className="text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    progress: 4,
    estimatedText: "Arriving in EOD",
  },
  CANCELLED: {
    icon: <FiXCircle className="text-red-500" />,
    color: "bg-red-100 text-red-800",
    progress: 4,
    estimatedText: "Cancelled on " + new Date().toLocaleDateString(),
  },
};

const statusConfigOrderItems = {
  PROCESSING: {
    icon: <FiPackage className="text-blue-500" />,
    color: "bg-blue-100 text-blue-800",
    progress: 1,
    estimatedText: "Est. delivery 5-7 business days",
  },
  SHIPPED: {
    icon: <FiTruck className="text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    progress: 2,
    estimatedText: "Arriving in 2-3 business days",
  },
  OUT_FOR_DELIVERY: {
    icon: <FiTruck className="text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    progress: 3,
    estimatedText: "Arriving in EOD",
  },
  DELIVERED: {
    icon: <FiCheckCircle className="text-green-500" />,
    color: "bg-green-100 text-green-800",
    progress: 4,
    estimatedText: "Delivered on " + new Date().toLocaleDateString(),
  },
  CANCELLED: {
    icon: <FiXCircle className="text-red-500" />,
    color: "bg-red-100 text-red-800",
    progress: 5,
    estimatedText: "Cancelled on " + new Date().toLocaleDateString(),
  },
};

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const { loading } = useLoader();
  const navigate = useNavigate();
  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getOrdersList = async () => {
    try {
      const response = await getAllOrders();
      console.log("Orders Res: ", response);

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  // 'PROCESSING', 'SHIPPED', 'DELIVERED'

  const getDeliveryLabel = (status) => {
    switch (status) {
      case "PROCESSING":
        return "Est. delivery";
      case "SHIPPED":
        return "Arrives";
      case "DELIVERED":
        return "Delivered on";
      case "CANCELLED":
        return "Cancelled on";
      case "OUT_FOR_DELIVERY":
        return "Out for delivery";
      default:
        return "Processing";
    }
  };

  const getDeliveryOrderStatusLabel = (status) => {
    switch (status) {
      case "PLACED":
        return "Processing";
      case "SHIPPED":
        return "Shipped";
      case "DELIVERED":
        return "Delivered";
      case "CANCELLED":
        return "Cancelled";
      case "OUT_FOR_DELIVERY":
        return "Out for delivery";
      default:
        return "Processing";
    }
  };
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  console.log("Orders : ", orders);

  return (
    <>
      <Banners
        titleFirst={"Your"}
        titleSecond={"Orders"}
        description={"Checkout your orders"}
      />
      <div className="min-h-screen bg-[#F5F1ED] py-8 px-4 sm:px-6 lg:px-8">
        <div className="container px-4">
          <div className="space-y-4">
            {loading ? (
              <BooksLoader />
            ) : (
              orders?.map((order, i) => {
                const safeOrderStatus =
                  statusConfig[order?.order_status] || statusConfig.PLACED;

                return (
                  <motion.div
                    key={order?.order_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                    className="bg-[url('https://img.freepik.com/premium-photo/close-up-light-cream-paper-texture-cardboard-background-old-paper-texture-aesthetic-creative-design_364465-127.jpg')] bg-no-repeat bg-bottom bg-cover rounded-2xl"
                  >
                    {/* Order Summary (Clickable Header) */}
                    <div
                      onClick={() => toggleOrder(order?.order_id)}
                      className="flex items-center justify-between p-5 transition cursor-pointer backdrop-blur-sm rounded-xl"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                        {/* Order Date */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#FFE6C1] rounded-lg">
                            <FiCalendar className="text-[#5C4C49]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#5C4C49]">
                              ORDER PLACED
                            </p>
                            <p className="font-medium text-[#5C4C49]">
                              {formatDate(order?.created_at)}
                            </p>
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#FFE6C1] rounded-lg">
                            <FiCreditCard className="text-[#5C4C49]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#5C4C49]">PAYMENT</p>
                            <p className="font-medium text-[#5C4C49]">
                              {order?.payment_method}
                            </p>
                            {/*  <p className="text-xs text-[#5C4C49]">
                          ****{order?.lastFourDigits}
                        </p> */}
                          </div>
                        </div>

                        {/* Order Total */}
                        <div className="flex items-start gap-3">
                          <div className="p-1 px-3 text-[#5C4C49] bg-[#FFE6C1] rounded-lg">
                            ₹
                          </div>
                          <div>
                            <p className="text-xs text-[#5C4C49]">TOTAL</p>
                            <p className="font-medium text-[#5C4C49]">
                              {order?.total_amount}
                            </p>
                            <p className="text-xs text-[#5C4C49]">
                              {order?.order_items.length} items
                            </p>
                          </div>
                        </div>

                        {/* Order Number */}
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-[#FFE6C1] rounded-lg">
                            <FiHash className="text-[#5C4C49]" />
                          </div>
                          <div className="">
                            <p className="text-xs text-[#5C4C49]">ORDER ID</p>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-[#5C4C49]">
                                {order?.order_number}
                              </p>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard
                                    .writeText(order?.order_number)
                                    .then(() => {
                                      toast.success(`Copied to clipboard!`);
                                    })
                                    .catch((error) => {
                                      console.error(
                                        "Failed to copy to clipboard:",
                                        error
                                      );
                                    });
                                }}
                                className="text-[#5C4C49]/50 hover:text-[#5C4C49] transition-colors"
                                title="Copy to clipboard"
                              >
                                <CopyIcon />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status and Chevron */}
                      <div className="flex items-center gap-4">
                        <div className="flex-col items-end hidden sm:flex">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${safeOrderStatus.color}`}
                            >
                              {getDeliveryOrderStatusLabel(order?.order_status)}
                            </span>
                            {/*  {order?.isDelayed && (
                          <span className="px-2 py-1 text-xs text-red-500 rounded-full bg-red-50">
                            Delayed
                          </span>
                        )} */}
                          </div>
                          <p className="mt-1 text-xs text-[#5C4C49]">
                            {statusConfig[order?.order_status].estimatedText}
                          </p>
                        </div>

                        <motion.div
                          animate={{
                            rotate: expandedOrder === order?.order_id ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="p-2 bg-[#FFE6C1] rounded-lg"
                        >
                          <FiChevronDown className="text-[#5C4C49]" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                      {expandedOrder === order?.order_id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden backdrop-blur-sm"
                        >
                          <div className="border-t border-[#D3BD9D] px-5 py-4">
                            {/* Order Items */}
                            <div className="space-y-4">
                              {order?.order_items.map((item) => {
                                const safeItemStatus =
                                  statusConfigOrderItems[item?.item_status] ||
                                  statusConfigOrderItems.PROCESSING;

                                return (
                                  <motion.div
                                    key={item?.order_item_id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-4 flex flex-col sm:flex-row gap-4 border border-[#D3BD9D]/30 rounded-lg bg-[#FFE6C1]/10"
                                  >
                                    <img
                                      src={item?.cover_image}
                                      alt={item?.title}
                                      className="self-center object-cover w-20 h-24 rounded-lg sm:self-start"
                                    />
                                    <div className="flex-1">
                                      <h3 className="font-medium text-[#5C4C49]">
                                        {item?.title}
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-600">
                                        {item?.description}
                                      </p>
                                      <div className="flex items-center mt-2">
                                        <span className="font-medium text-[#5C4C49]">
                                          {item?.price}
                                        </span>
                                        {item?.original_price && (
                                          <span className="ml-2 text-xs text-[#5C4C49] line-through">
                                            {item?.original_price}
                                          </span>
                                        )}
                                        <span className="ml-auto text-xs text-[#5C4C49]">
                                          Qty: {item?.quantity}
                                        </span>
                                      </div>
                                      <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center text-sm">
                                          {safeItemStatus.icon}

                                          <span className="ml-2">
                                            •{" "}
                                            <span className="text-gray-600 ">
                                              <span className="pr-3">
                                                {getDeliveryLabel(
                                                  item?.item_status
                                                )}
                                              </span>
                                              {order?.expected_delivery &&
                                                new Date(
                                                  order.expected_delivery
                                                ).toLocaleDateString("en-GB", {
                                                  day: "2-digit",
                                                  month: "long",
                                                  year: "numeric",
                                                })}
                                            </span>
                                          </span>
                                        </div>
                                        {item?.tracking_id && (
                                          <button
                                            onClick={() =>
                                              navigate(
                                                `/nextChapter/tracking/${item?.order_item_id}/${item?.tracking_id}`
                                              )
                                            }
                                            className="px-3 py-1 text-xs bg-[#D3BD9D] hover:bg-[#5C4C49] text-[#5C4C49] hover:text-white rounded-full transition-colors"
                                          >
                                            Track Package
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
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
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
