import { useForm } from "react-hook-form";
import {
  EnvelopeIcon,
  PlusIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import Modal from "./ModalContainer";

const AddressModal = ({ showAddress, setShowAddress }) => {
  const [activeTab, setActiveTab] = useState("select");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  const savedAddresses = [
    {
      id: 1,
      name: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
      icon: <HomeIcon className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Ave, Floor 12",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Parents House",
      address: "789 Family Lane",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      isDefault: false,
      icon: <HeartIcon className="w-5 h-5" />,
      color: "bg-pink-500",
    },
  ];

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Address data:", data);
    reset();
    setShowAddress(false);
    setActiveTab("select");
  };

  const handleAddNewAddress = () => {
    setActiveTab("add");
    reset();
    setSelectedAddress(null);
  };

  const handleBackToSelection = () => {
    setActiveTab("select");
    reset();
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const addressCardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    }),
    hover: {
      scale: 1.02,
      y: -2,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const getAddressIcon = (addressName) => {
    const address = savedAddresses.find((addr) => addr.name === addressName);
    return address?.icon || <MapPinIcon className="w-5 h-5" />;
  };

  return (
    <Modal isOpen={showAddress} onClose={() => setShowAddress(false)}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md mx-auto"
      >
        <div className="mb-6 text-center">
          <motion.h2
            className="mb-2 text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Delivery Address
          </motion.h2>
          <motion.p
            className="text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Choose where you want your order delivered
          </motion.p>
        </div>

        {/* Enhanced Tabs */}
        <motion.div
          className="flex p-1 mb-8 bg-gray-100 rounded-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {["select", "add"].map((tab) => (
            <motion.button
              key={tab}
              className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === "select" ? "Saved Addresses" : "Add New"}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "select" ? (
            <motion.div
              key="select"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              {/* Saved Addresses List */}
              <motion.div
                className="p-2 space-y-3 overflow-y-auto max-h-60"
                initial="hidden"
                animate="visible"
              >
                {savedAddresses.map((address, index) => (
                  <motion.div
                    key={address.id}
                    custom={index}
                    variants={addressCardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all backdrop-blur-sm ${
                      selectedAddress === address.id
                        ? "border-blue-500 bg-blue-50/50 shadow-md"
                        : "border-gray-200 bg-white/80 hover:border-blue-300"
                    }`}
                    onClick={() => handleAddressSelect(address)}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className={`p-2 rounded-lg ${address.color} text-white`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {address.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 truncate">
                            {address.name}
                          </span>
                          {address.isDefault && (
                            <motion.span
                              className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                delay: index * 0.1 + 0.2,
                              }}
                            >
                              Default
                            </motion.span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {address.address}
                        </p>
                        <p className="text-sm text-gray-500">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      <motion.div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAddress === address.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 bg-white"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {selectedAddress === address.id && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Add New Address Button */}
              <motion.button
                onClick={handleAddNewAddress}
                className="flex items-center justify-center w-full gap-3 p-4 text-gray-600 transition-all border-2 border-gray-300 border-dashed rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 hover:text-gray-900 group"
                whileHover={{
                  scale: 1.02,
                  borderColor: "#60A5FA",
                  backgroundColor: "rgba(219, 234, 254, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="p-2 text-gray-500 bg-gray-100 rounded-full group-hover:bg-blue-100 group-hover:text-blue-500"
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <PlusIcon className="w-5 h-5" />
                </motion.div>
                <span className="font-medium">Add New Address</span>
              </motion.button>

              {/* Action Buttons */}
              <motion.div
                className="flex gap-3 pt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddress(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </Button>
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    className="w-full"
                    disabled={!selectedAddress}
                    onClick={() => {
                      const address = savedAddresses.find(
                        (addr) => addr.id === selectedAddress
                      );
                      console.log("Selected address:", address);
                      setShowAddress(false);
                    }}
                  >
                    Use This Address
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="add"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div variants={addressCardVariants}>
                  <Input
                    label="Address Name"
                    type="text"
                    placeholder="e.g., Home, Work, Office"
                    icon={<MapPinIcon className="w-5 h-5 text-gray-400" />}
                    error={errors.name?.message}
                    {...register("name", {
                      required: "Address name is required",
                    })}
                    className="h-[50px] rounded-xl"
                  />
                </motion.div>

                <motion.div variants={addressCardVariants}>
                  <Input
                    label="Street Address"
                    type="text"
                    placeholder="Enter your street address"
                    error={errors.address?.message}
                    {...register("address", {
                      required: "Street address is required",
                    })}
                    className="h-[50px] rounded-xl"
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={addressCardVariants}
                >
                  <Input
                    label="City"
                    type="text"
                    placeholder="City"
                    error={errors.city?.message}
                    {...register("city", {
                      required: "City is required",
                    })}
                    className="h-[50px] rounded-xl"
                  />

                  <Input
                    label="State"
                    type="text"
                    placeholder="State"
                    error={errors.state?.message}
                    {...register("state", {
                      required: "State is required",
                    })}
                    className="h-[50px] rounded-xl"
                  />
                </motion.div>

                <motion.div variants={addressCardVariants}>
                  <Input
                    label="ZIP Code"
                    type="text"
                    placeholder="ZIP Code"
                    error={errors.zipCode?.message}
                    {...register("zipCode", {
                      required: "ZIP code is required",
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: "Invalid ZIP code format",
                      },
                    })}
                    className="h-[50px] rounded-xl"
                  />
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  variants={addressCardVariants}
                >
                  <motion.input
                    type="checkbox"
                    id="defaultAddress"
                    {...register("isDefault")}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    whileTap={{ scale: 0.9 }}
                  />
                  <label
                    htmlFor="defaultAddress"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Set as default address
                  </label>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4 pt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToSelection}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Address
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </Modal>
  );
};

export default AddressModal;
