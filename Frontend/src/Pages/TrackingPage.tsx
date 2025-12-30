import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

/* ---------------- MOCK ORDER DATA ---------------- */

const orders = [
  {
    id: 1,
    orderNumber: "ORD-2023-001",
    isDelayed: false,
    items: [
      {
        id: 101,
        image: "https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UL320_.jpg",
        title: "Desert Storms",
        description: "A soldier's survival tale.",
        price: "₹350",
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
        quantity: 1,
        status: "Processing",
        deliveryDate: "22 July 2023",
      },
    ],
  },
];

/* ---------------- TRACKING STEPS ---------------- */

const steps = ["Processing", "Shipped", "Delivered"];

/* ---------------- COMPONENT ---------------- */

const TrackingPage = () => {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === Number(orderId));
  const item = order?.items.find((i) => i.id === Number(itemId));

  if (!order || !item) {
    return (
      <div className="h-screen flex items-center justify-center text-[#5C4C49] bg-[#fcfbf9]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tracking Not Found</h2>
          <p className="opacity-70">We couldn't find the tracking details for this item.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#5C4C49] underline hover:opacity-80"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const activeStep = steps.indexOf(item.status);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#5C4C49] p-4 md:p-8 font-sans">
      <div className="container px-4">
        {/* Header / Back Button */}
        <div className=" mx-auto mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-75 transition-opacity"
          >
            <FaArrowLeft /> Back to Orders
          </button>
        </div>

        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tracking Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Status Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                {item.status === "Delivered" ? "Arrived" : "On its way"}
              </h1>
              <p className="opacity-80">
                Expected Arrival: <span className="font-semibold">{item.deliveryDate}</span>
              </p>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#D3BD9D]/30 p-8">
              <div className="relative">
                <div className="flex justify-between items-start z-10 relative">
                  {steps.map((step, index) => {
                    const isActive = index <= activeStep;
                    const isCompleted = index < activeStep;

                    return (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            backgroundColor: isActive ? "#5C4C49" : "#ffffff",
                            borderColor: isActive ? "#5C4C49" : "#D3BD9D",
                            color: isActive ? "#ffffff" : "#D3BD9D",
                          }}
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg z-20 shadow-sm transition-colors duration-300`}
                        >
                          {step === "Processing" && <FaBoxOpen />}
                          {step === "Shipped" && <FaShippingFast />}
                          {step === "Delivered" && <FaCheckCircle />}
                        </motion.div>
                        <p
                          className={`mt-3 text-sm font-semibold tracking-wide ${isActive ? "opacity-100" : "opacity-40"
                            }`}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Connector Lines */}
                <div className="absolute top-6 left-0 w-full px-[10%] -z-0">
                  {/* Background Line */}
                  <div className="h-0.5 bg-[#D3BD9D] opacity-30 w-full absolute top-0 left-0" />

                  {/* Active Progress Line used to be driven by width, simpler to just color the segments between nodes if properly calculated, but here a simple partial width works for visual cleanliness */}
                  <motion.div
                    className="h-0.5 bg-[#5C4C49] absolute top-0 left-0"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Detailed Updates Section (Mock) */}
              <div className="mt-12 space-y-6">
                <h3 className="font-serif text-lg border-b border-[#D3BD9D]/30 pb-2 mb-4">Tracking History</h3>

                {/* Mock History Items based on status */}
                {activeStep >= 1 && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-[#5C4C49]" />
                      <div className="w-0.5 h-full bg-[#D3BD9D]/30 my-1" />
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-sm">Shipped from Warehouse</p>
                      <p className="text-xs opacity-60 flex items-center gap-1"><FaClock className="text-xs" /> 19 July 2023, 10:00 AM</p>
                      <p className="text-xs opacity-70 mt-1">New Delhi, India</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${activeStep >= 0 ? "bg-[#5C4C49]" : "bg-[#D3BD9D]"}`} />
                    {/* Last item, no line below */}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order Placed & Processed</p>
                    <p className="text-xs opacity-60 flex items-center gap-1"><FaClock className="text-xs" /> 18 July 2023, 5:30 PM</p>
                  </div>
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
              <h3 className="font-serif text-xl font-bold mb-6">Order Details</h3>

              <div className="flex gap-4 mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h4 className="font-semibold leading-tight">{item.title}</h4>
                  <p className="text-xs opacity-70 mt-1 line-clamp-2">{item.description}</p>
                  <p className="mt-2 font-bold">{item.price}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm border-t border-[#5C4C49]/10 pt-4">
                <div className="flex justify-between">
                  <span className="opacity-70">Order ID</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Tracking Number</span>
                  <span className="font-medium">{item.trackingNumber || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Carrier</span>
                  <span className="font-medium">Express Logistics</span>
                </div>
              </div>

              {/* Support / Help */}
              <div className="mt-8 pt-6 border-t border-[#5C4C49]/10">
                <p className="text-xs opacity-70 mb-3">Need help with this order?</p>
                <button className="w-full py-2.5 rounded-xl border border-[#5C4C49] text-[#5C4C49] font-medium text-sm hover:bg-[#5C4C49] hover:text-white transition-colors">
                  Contact Support
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;

