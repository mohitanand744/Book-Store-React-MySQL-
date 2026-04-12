import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/outline";

const ViewAddressDetailsModal = ({ viewAddressDetails, setViewAddressDetails }) => {
  const ViewAddressDetailsIcon = viewAddressDetails?.Icon;

  return (
    <AnimatePresence>
      {viewAddressDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
          onClick={() => setViewAddressDetails(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm p-6 bg-[#D3BD9D] relative shadow-xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-1 right-1 text-white/70 hover:text-white bg-black/10 hover:bg-white/20 rounded-xl z-[10000]"
              onClick={() => setViewAddressDetails(null)}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <XCircleIcon className="w-7 h-7" />
            </motion.button>

            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-[#5c4c49]">
                Address Details
              </h3>{" "}
              <div className="flex items-center">
                {viewAddressDetails.isDefault && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-200 rounded-full ms-2">
                    <div className={``}>
                      <b>●</b>
                    </div>
                    <b>Default</b>
                  </span>
                )}
                <span className="inline-flex ms-2 items-center gap-1 py-1 px-2  text-xs font-medium text-green-100 bg-[#5c4c49] rounded-full">
                  <div
                    className={`rounded-lg ${viewAddressDetails?.color} text-white`}
                  >
                    {ViewAddressDetailsIcon && <ViewAddressDetailsIcon className="w-4 h-4" />}
                  </div>
                  <b>{viewAddressDetails.type}</b>
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-[#5c4c49] min-w-[110px]">
                  Street Address:
                </span>
                <span className="break-words">
                  {viewAddressDetails.address}
                </span>
              </div>

              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-[#5c4c49] min-w-[110px]">
                  City:
                </span>
                <span>{viewAddressDetails.city}</span>
              </div>

              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-[#5c4c49] min-w-[110px]">
                  State:
                </span>
                <span>{viewAddressDetails.state}</span>
              </div>

              <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                <span className="font-medium text-[#5c4c49] min-w-[110px]">
                  PIN:
                </span>
                <span>{viewAddressDetails.pinCode}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ViewAddressDetailsModal;
