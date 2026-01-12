import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import { getTrackingItem } from "../utils/apis/ordersApi";
import { useEffect } from "react";
import { useState } from "react";
import { useLoader } from "../Hooks/useLoader";
import BooksLoader from "../components/Loaders/BooksLoader";
import BackButton from "../components/Buttons/BackButton";

const TrackingPage = () => {
  const { trackingId, itemId } = useParams();
  const navigate = useNavigate();
  const { loading } = useLoader();
  const [itemTrackingData, setItemTrackingData] = useState(null);

  /* ---------------- TRACKING STEPS ---------------- */

  const steps = [
    {
      key: "PROCESSING",
      title: "Order Placed & Processing",
      location: "Order Processing Center",
    },
    {
      key: "SHIPPED",
      title: "Shipped from Warehouse",
      location: "New Delhi Warehouse",
    },
    {
      key: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      location: "Local Delivery Hub",
    },
    {
      key: "DELIVERED",
      title: "Delivered Successfully",
      location: itemTrackingData?.address,
    },
  ];

  /* ---------------- COMPONENT ---------------- */

  const getTrackingInfo = async (itemId, trackingId) => {
    try {
      const response = await getTrackingItem(itemId, trackingId);

      setItemTrackingData(response.data);
    } catch (error) {
      console.log(error);
      setItemTrackingData(null);
    }
  };

  useEffect(() => {
    getTrackingInfo(itemId, trackingId);
  }, []);

  if (!itemTrackingData) {
    return;
  }
  <div className="h-screen flex items-center justify-center bg-[#fcfbf9] px-4">
    <div className="max-w-md mx-auto text-center">
      {/* Icon for visual appeal */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0ebe8] text-[#5C4C49] mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Text content */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#5C4C49] mb-3">
        Tracking Not Found
      </h2>
      <p className="text-[#7A6A66] opacity-90 mb-8 text-base leading-relaxed">
        We couldn't find any tracking details for the provided reference. Please
        check the tracking number and try again.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-[#5C4C49] text-white rounded-lg hover:bg-[#4a3d3a] transition-all duration-200 font-medium shadow-sm hover:shadow"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 border border-[#5C4C49] text-[#5C4C49] rounded-lg hover:bg-[#f0ebe8] transition-all duration-200 font-medium"
        >
          Home Page
        </button>
      </div>

      {/* Help text */}
      <p className="mt-8 text-sm text-[#7A6A66] opacity-80">
        Need help?{" "}
        <div
          onClick={() => navigate("/nextChapter/contact")}
          className="underline hover:text-[#5C4C49] transition-colors"
        >
          Contact our support team
        </div>
      </p>
    </div>
  </div>;

  const activeStep = steps.findIndex(
    (step) => step.key === itemTrackingData?.item_status
  );

  console.log("Active Steps :", activeStep);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#5C4C49] p-4 md:p-8 font-sans">
      <div className="container px-4">
        {loading ? (
          <BooksLoader />
        ) : (
          <>
            <BackButton label="Back to Orders" />

            <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
              {/* Left Column: Tracking Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 lg:col-span-2"
              >
                {/* Status Header */}
                <div>
                  <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">
                    {itemTrackingData.item_status === "DELIVERED"
                      ? "Arrived"
                      : itemTrackingData.item_status === "SHIPPED"
                      ? "We have shipped your order"
                      : "On its way"}
                  </h1>

                  <p className="opacity-80">
                    {itemTrackingData.item_status === "DELIVERED" ? (
                      <span>
                        Your order has been{" "}
                        <b className="text-green-600">successfully delivered</b>{" "}
                        to your address.
                      </span>
                    ) : (
                      <>
                        <b>Expected Arrival:</b>{" "}
                        <span className="font-semibold">
                          {itemTrackingData.expected_delivery &&
                            new Date(
                              itemTrackingData.expected_delivery
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                {/* Progress Timeline */}
                <div className="bg-white rounded-3xl shadow-sm border border-[#D3BD9D]/30 p-8">
                  <div className="relative">
                    <div className="relative z-10 flex items-start justify-between">
                      {steps.map((step, index) => {
                        const isActive =
                          step.key === itemTrackingData.item_status ||
                          activeStep >= index;

                        return (
                          <div
                            key={step.key}
                            className="flex flex-col items-center flex-1"
                          >
                            <motion.div
                              animate={{
                                scale: isActive ? 1.1 : 1,
                                backgroundColor: isActive
                                  ? "#5C4C49"
                                  : "#ffffff",
                                borderColor:
                                  step.key === "DELIVERED" &&
                                  itemTrackingData.item_status === "DELIVERED"
                                    ? "#22C55E"
                                    : "#D3BD9D",
                                borderWidth: isActive ? 2 : 1,
                                color: isActive ? "#ffffff" : "#D3BD9D",
                              }}
                              transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg z-20 shadow-sm transition-colors duration-300`}
                            >
                              {step.key === "PROCESSING" && <FaBoxOpen />}
                              {step.key === "SHIPPED" && <FaShippingFast />}
                              {step.key === "OUT_FOR_DELIVERY" && <FaTruck />}
                              {step.key === "DELIVERED" && (
                                <FaCheckCircle
                                  className={
                                    step.key === "DELIVERED" &&
                                    itemTrackingData.item_status === "DELIVERED"
                                      ? "text-green-600"
                                      : ""
                                  }
                                />
                              )}
                            </motion.div>
                            <p
                              className={`mt-3 text-sm font-semibold tracking-wide ${
                                isActive ? "opacity-100" : "opacity-60"
                              }`}
                            >
                              {step.key === "OUT_FOR_DELIVERY"
                                ? step.title.toLocaleUpperCase()
                                : step.key}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute top-6 left-0 w-full px-[10%] -z-0">
                      <div className="h-2 rounded-full bg-[#D3BD9D] opacity-30 w-full absolute top-0 left-0" />
                      <motion.div
                        className="h-2 rounded-full bg-[#5C4C49] absolute top-0 left-0"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `calc(${
                            (activeStep / (steps.length - 1)) * 100
                          }% ${
                            itemTrackingData.item_status === "SHIPPED"
                              ? "+ 100px"
                              : ""
                          })`,
                        }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      >
                        <span className="absolute right-0 flex w-4 h-4 -top-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5C4C49] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#5C4C49]"></span>
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Detailed Updates Section (Mock) */}
                  <div className="mt-12 space-y-6">
                    {/* Mock History Items based on status */}
                    <div className="mt-12 space-y-6">
                      <h3 className="font-serif text-lg border-b border-[#D3BD9D]/30 pb-2 mb-4">
                        Tracking History
                      </h3>

                      {steps.map((step, index) => {
                        if (index > activeStep) return null;

                        const isLast = index === activeStep;

                        return (
                          <div key={step.key} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  isLast ? "bg-[#5C4C49]" : "bg-[#D3BD9D]"
                                }`}
                              />
                              {!isLast && (
                                <div className="w-0.5 h-full bg-[#D3BD9D]/30 my-1" />
                              )}
                            </div>

                            <div className="pb-4">
                              <p className="text-sm font-medium">
                                {step.title}
                              </p>

                              <p className="flex items-center gap-1 text-xs opacity-60">
                                <FaClock className="text-xs" />
                                {new Date().toLocaleString()}
                              </p>

                              <p className="mt-1 text-xs opacity-70">
                                {step.location}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Item Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-[#D3BD9D] bg-opacity-10 rounded-3xl p-6 sticky top-6">
                  <h3 className="mb-6 font-serif text-xl font-bold">
                    Order Details
                  </h3>

                  {/* Product */}
                  <div className="flex gap-4 mb-6">
                    <img
                      src={itemTrackingData.cover_image}
                      alt={itemTrackingData.title}
                      className="object-cover w-20 rounded-lg shadow-md h-28"
                    />
                    <div>
                      <h4 className="font-semibold leading-tight">
                        {itemTrackingData.title}
                      </h4>
                      <p className="mt-1 text-xs opacity-70 line-clamp-2">
                        {itemTrackingData.description}
                      </p>

                      {/* Status Badge */}
                      <span className="inline-block px-3 py-1 mt-2 text-xs text-green-700 bg-green-100 rounded-full">
                        {itemTrackingData.item_status}
                      </span>

                      <p className="mt-2 text-lg font-bold">
                        ₹{itemTrackingData.item_price}
                      </p>
                    </div>
                  </div>

                  {/* Order Meta */}
                  <div className="space-y-3 text-sm border-t border-[#5C4C49]/10 pt-4">
                    <div className="flex justify-between">
                      <span className="opacity-70">Order ID</span>
                      <span className="font-medium">
                        {itemTrackingData.order_number}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-70">Tracking Number</span>
                      <span className="font-medium">
                        {itemTrackingData.tracking_id}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-70">Order Date</span>
                      <span className="font-medium">
                        {itemTrackingData.order_created_at &&
                          new Date(
                            itemTrackingData.order_created_at
                          ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-70">Payment Method</span>
                      <span className="font-medium">
                        {itemTrackingData.payment_method}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-70">Quantity</span>
                      <span className="font-medium">
                        {itemTrackingData.quantity || 1}
                      </span>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="mt-6 space-y-2 text-sm border-t border-[#5C4C49]/10 pt-4">
                    <div className="flex justify-between">
                      <span className="opacity-70">Subtotal</span>
                      <span>₹{itemTrackingData.item_subtotal}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-70">Shipping</span>
                      <span>₹{itemTrackingData.shipping_fee || 0}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="opacity-70">Tax</span>
                      <span>₹{itemTrackingData.tax || 0}</span>
                    </div>

                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span>-₹{itemTrackingData.discount || 0}</span>
                    </div>

                    <div className="flex justify-between pt-3 text-base font-bold border-t">
                      <span>Total</span>
                      <span>₹{itemTrackingData.item_total}</span>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mt-6 text-sm border-t border-[#5C4C49]/10 pt-4">
                    <p className="mb-1 font-medium">Delivery Address</p>
                    <p className="text-xs leading-relaxed opacity-70">
                      {itemTrackingData.address}
                    </p>
                  </div>

                  {/* Support */}
                  <div className="mt-8 pt-6 border-t border-[#5C4C49]/10">
                    <p className="mb-3 text-xs opacity-70">
                      Need help with this order?
                    </p>
                    <button className="w-full py-2.5 rounded-xl border border-[#5C4C49] text-[#5C4C49] font-medium text-sm hover:bg-[#5C4C49] hover:text-white transition-colors">
                      Contact Support
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
