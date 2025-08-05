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
} from "react-icons/fi";
import { CopyIcon } from "../components/SVGs/SVGs";
import toast from "react-hot-toast";
import Banners from "../components/Banners/Banners";

const orders = [
  {
    id: 1,
    orderNumber: "ORD-2023-001",
    date: "15 July 2023",
    time: "10:45 AM",
    total: "₹1,029",
    status: "Shipped",
    paymentMethod: "VISA",
    lastFourDigits: "4242",
    isDelayed: false,
    items: [
      {
        id: 101,
        image: "https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UL320_.jpg",
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
        image: "https://m.media-amazon.com/images/I/81s6DUyQCZL._AC_UL320_.jpg",
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
    time: "2:30 PM",
    total: "₹820",
    status: "Delivered",
    paymentMethod: "MasterCard",
    lastFourDigits: "5555",
    isDelayed: false,
    items: [
      {
        id: 201,
        image: "https://m.media-amazon.com/images/I/81Pk+-9oJkL._AC_UL320_.jpg",
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
  {
    id: 3,
    orderNumber: "ORD-2023-003",
    date: "5 July 2023",
    time: "9:15 AM",
    total: "₹1,499",
    status: "Delivered",
    paymentMethod: "PayPal",
    lastFourDigits: "7890",
    isDelayed: false,
    items: [
      {
        id: 301,
        image: "https://m.media-amazon.com/images/I/81zq7Yzv2jL._AC_UL320_.jpg",
        title: "Quantum Paradox",
        description: "Sci-fi thriller about time loops.",
        price: "₹599",
        originalPrice: "₹799",
        quantity: 1,
        status: "Delivered",
        deliveryDate: "9 July 2023",
        trackingNumber: "TRK456789123",
      },
      {
        id: 302,
        image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UL320_.jpg",
        title: "The Midnight Library",
        description: "Explore infinite possibilities.",
        price: "₹399",
        originalPrice: "₹499",
        quantity: 1,
        status: "Delivered",
        deliveryDate: "9 July 2023",
        trackingNumber: "TRK456789124",
      },
      {
        id: 303,
        image: "https://m.media-amazon.com/images/I/81dQwQlmAXL._AC_UL320_.jpg",
        title: "Atomic Habits",
        description: "Tiny changes, remarkable results.",
        price: "₹501",
        originalPrice: "₹699",
        quantity: 1,
        status: "Delivered",
        deliveryDate: "9 July 2023",
        trackingNumber: "TRK456789125",
      },
    ],
  },
  {
    id: 4,
    orderNumber: "ORD-2023-004",
    date: "1 July 2023",
    time: "7:20 PM",
    total: "₹2,349",
    status: "Processing",
    paymentMethod: "AMEX",
    lastFourDigits: "1001",
    isDelayed: true,
    items: [
      {
        id: 401,
        image: "https://m.media-amazon.com/images/I/71N4oeWwYlL._AC_UL320_.jpg",
        title: "The Silent Patient",
        description: "Psychological thriller.",
        price: "₹349",
        originalPrice: "₹499",
        quantity: 3,
        status: "Processing",
        deliveryDate: "Estimated 10 July 2023",
      },
      {
        id: 402,
        image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UL320_.jpg",
        title: "Where the Crawdads Sing",
        description: "Mystery and nature intertwined.",
        price: "₹299",
        originalPrice: "₹399",
        quantity: 2,
        status: "Processing",
        deliveryDate: "Estimated 10 July 2023",
      },
    ],
  },
  {
    id: 5,
    orderNumber: "ORD-2023-005",
    date: "28 June 2023",
    time: "11:05 AM",
    total: "₹899",
    status: "Shipped",
    paymentMethod: "VISA",
    lastFourDigits: "1881",
    isDelayed: false,
    items: [
      {
        id: 501,
        image: "https://m.media-amazon.com/images/I/71X1p4TGlxL._AC_UL320_.jpg",
        title: "Educated",
        description: "Memoir of self-discovery.",
        price: "₹499",
        originalPrice: "₹699",
        quantity: 1,
        status: "Shipped",
        deliveryDate: "3 July 2023",
        trackingNumber: "TRK112233445",
      },
      {
        id: 502,
        image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UL320_.jpg",
        title: "The Guest List",
        description: "Murder mystery at a wedding.",
        price: "₹400",
        originalPrice: "₹599",
        quantity: 1,
        status: "Shipped",
        deliveryDate: "3 July 2023",
        trackingNumber: "TRK112233446",
      },
    ],
  },
  {
    id: 6,
    orderNumber: "ORD-2023-006",
    date: "25 June 2023",
    time: "4:50 PM",
    total: "₹1,599",
    status: "Delivered",
    paymentMethod: "UPI",
    lastFourDigits: "2023",
    isDelayed: false,
    items: [
      {
        id: 601,
        image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UL320_.jpg",
        title: "The Vanishing Half",
        description: "Story of twin sisters.",
        price: "₹599",
        originalPrice: "₹799",
        quantity: 1,
        status: "Delivered",
        deliveryDate: "29 June 2023",
        trackingNumber: "TRK998877665",
      },
      {
        id: 602,
        image: "https://m.media-amazon.com/images/I/81dQwQlmAXL._AC_UL320_.jpg",
        title: "Project Hail Mary",
        description: "Space adventure novel.",
        price: "₹499",
        originalPrice: "₹699",
        quantity: 1,
        status: "Delivered",
        deliveryDate: "29 June 2023",
        trackingNumber: "TRK998877666",
      },
      {
        id: 603,
        image: "https://m.media-amazon.com/images/I/71N4oeWwYlL._AC_UL320_.jpg",
        title: "Circe",
        description: "Mythological fiction.",
        price: "₹501",
        originalPrice: "₹699",
        quantity: 1,
        status: "Delivered",
        deliveryDate: "29 June 2023",
        trackingNumber: "TRK998877667",
      },
    ],
  },
];

const statusConfig = {
  Processing: {
    icon: <FiPackage className="text-blue-500" />,
    color: "bg-blue-100 text-blue-800",
    progress: 1,
    estimatedText: "Est. delivery 5-7 business days",
  },
  Shipped: {
    icon: <FiTruck className="text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-800",
    progress: 2,
    estimatedText: "Arriving in 2-3 business days",
  },
  Delivered: {
    icon: <FiCheckCircle className="text-green-500" />,
    color: "bg-green-100 text-green-800",
    progress: 3,
    estimatedText: "Delivered on " + new Date().toLocaleDateString(),
  },
};

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

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
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, delay: order.id * 0.1 }}
                className="bg-[url('https://img.freepik.com/premium-photo/close-up-light-cream-paper-texture-cardboard-background-old-paper-texture-aesthetic-creative-design_364465-127.jpg')]  bg-no-repeat bg-bottom bg-cover rounded-2xl"
              >
                {/* Order Summary (Clickable Header) */}
                <div
                  onClick={() => toggleOrder(order.id)}
                  className="flex items-center justify-between p-5 transition cursor-pointer backdrop-blur-sm rounded-xl"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                    {/* Order Date */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#FFE6C1] rounded-lg">
                        <FiCalendar className="text-[#5C4C49]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#5C4C49]">ORDER PLACED</p>
                        <p className="font-medium text-[#5C4C49]">
                          {order.date}
                        </p>
                        <p className="text-xs text-[#5C4C49]">{order.time}</p>
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
                          {order.paymentMethod}
                        </p>
                        <p className="text-xs text-[#5C4C49]">
                          ****{order.lastFourDigits}
                        </p>
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
                          {order.total}
                        </p>
                        <p className="text-xs text-[#5C4C49]">
                          {order.items.length} items
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
                            {order.orderNumber}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard
                                .writeText(order.orderNumber)
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
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusConfig[order.status].color
                          }`}
                        >
                          {order.status}
                        </span>
                        {order.isDelayed && (
                          <span className="px-2 py-1 text-xs text-red-500 rounded-full bg-red-50">
                            Delayed
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#5C4C49]">
                        {statusConfig[order.status].estimatedText}
                      </p>
                    </div>

                    <motion.div
                      animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 bg-[#FFE6C1] rounded-lg"
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
                      className="overflow-hidden backdrop-blur-sm"
                    >
                      <div className="border-t border-[#D3BD9D] px-5 py-4">
                        {/* Status Stepper */}
                        {/* <div className="mb-6">
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
                                        : "bg-gray-100 text-[#5C4C49]"
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
                        </div> */}

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
                                    <span className="ml-2 text-xs text-[#5C4C49] line-through">
                                      {item.originalPrice}
                                    </span>
                                  )}
                                  <span className="ml-auto text-xs text-[#5C4C49]">
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
    </>
  );
};

export default OrdersPage;
