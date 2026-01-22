import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiArrowLeft,
  FiUser,
  FiMail,
  FiMapPin,
  FiHome,
  FiGlobe,
} from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcApplePay } from "react-icons/fa";
import CheckoutBooksCard from "../components/Cards/CheckoutBooksCard";
import CartItemsNoData from "../components/EmptyData/CartItemsNoData";
import Input from "../components/Inputs/Input";
import { Link } from "react-router-dom";
import BackButton from "../components/Buttons/BackButton";

const CheckoutPage = () => {
  const mockCartItems = [
    {
      id: 1,
      name: "Desert Storms",
      price: 99.99,
      quantity: 1,
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcST2_1i1NyxMqbY6vjq7CgFKocgroiiu9zg770ja3V7fj72rv10n9i_N64_2XQLEHWnnMUSs3Zcss5In9xlJmgHCjEpsLSi3t2FRx8bM7PEa6QCv0SWnMZq2Q",
    },
    {
      id: 2,
      name: "Galactic Wars",
      price: 199.99,
      quantity: 1,
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTOYA9Dc5SYYw2PgWOjHWHh1u35Ej__7m6jz6KYITFoYs-CYD1pMGLkZEtQVk3W9eQBbugbA2aC5jSX8j7moU5ENIEEf8-fvx3p3sr0jBFTVg9FNBEdnXSF",
    },
    {
      id: 3,
      name: "Desert Storms",
      price: 79.99,
      quantity: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ1Skl5TTerlDFbWVmCW_cL9BBXAtdS-_AdVJdlbE7KPs7DExRiblBJswAfFgPmFj3wqteiD0MbfVnfeTJoBtaZwORgEV0qO9mItMDNsqmD_tnkAf758DwL",
    },
  ];
  const [items, setItems] = useState(mockCartItems);
  const [selectedAddress, setSelectedAddress] = useState("Office");
  const [selectedValue, setSelectedValue] = useState("");
  const [formData, setFormData] = useState({
    name: "Mohit Anand",
    email: "jhannohit744@gmail.com",
    addressName: "Office",
    country: "India",
    address: "Goushala road old Kusum gas gudam",
    city: "Dumka",
    postalCode: "814101",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F5F1ED]"
    >
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <BackButton label="Continue Shopping" to={"/nextChapter/books"} />
        <div className="flex items-center mb-8">
          <div className="flex items-center mx-auto">
            <FiShoppingBag className="mr-2 text-2xl text-[#5C4C49]" />
            <h1 className="text-2xl font-bold text-[#5C4C49]">Your Cart</h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-2xl bg-gradient-to-br from-[#FAF5ED] to-[#E8DBC5] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm border border-white/30"
          >
            {/* Floating Section Titles */}
            <div className="relative mb-8">
              <motion.h2
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-[#3A2F2D] relative inline-block"
              >
                <span className="relative z-10">Contact Information</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-2 bg-[#D3BD9D]/50 -z-0"
                  style={{ transform: "skewX(-15deg)" }}
                />
              </motion.h2>
            </div>

            {/* Animated Input Fields */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  icon={<FiUser className="text-[#5C4C49]/80" />}
                  containerClassName="group"
                  className=" bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  icon={<FiMail className="text-[#5C4C49]/80" />}
                  containerClassName="group"
                  className=" bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50"
                />
              </motion.div>
            </div>

            {/* Delivery Address Section */}
            <div className="relative mt-12 mb-8">
              <motion.h2
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-[#3A2F2D] relative inline-block"
              >
                <span className="relative z-10">Delivery Address</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-2 bg-[#D3BD9D]/50 -z-0"
                  style={{ transform: "skewX(-15deg)" }}
                />
              </motion.h2>
            </div>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  label="Address Type"
                  name="addressName"
                  value={formData.addressName}
                  onChange={handleSelectChange}
                  setSelectedValue={setSelectedValue}
                  selectedValue={selectedValue}
                  as="select"
                  options={[
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" },
                    { value: "option3", label: "Option 3" },
                    { value: "option4", label: "Option 4" },
                  ]}
                  //icon={<FiHome className="text-[#5C4C49]/80" />}
                  containerClassName="group"
                  className=" bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50 appearance-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Your country"
                  icon={<FiGlobe className="text-[#5C4C49]/80" />}
                  containerClassName="group"
                  className=" bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Input
                  label="Full Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  as="textarea"
                  rows={3}
                  placeholder="Street address, apartment/unit number"
                  icon={<FiMapPin className="text-[#5C4C49]/80" />}
                  containerClassName="group"
                  className=" pt-3 bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50 min-h-[100px]"
                />
              </motion.div>

              {/* City & Postal Code Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City name"
                    containerClassName="group"
                    className="bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50"
                  />
                </div>
                <div>
                  <Input
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="ZIP/Postal code"
                    containerClassName="group"
                    className="bg-white/80 border-[#E8DBC5] hover:shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] focus:ring-[#3A2F2D]/50"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Cart Items and Summary */}
          <div className="flex flex-col justify-between gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-5 overflow-y-scroll px-4 h-[26rem] overflow-x-hidden rounded-lg backdrop-blur-sm"
            >
              {items.length === 0 ? (
                <CartItemsNoData />
              ) : (
                <CheckoutBooksCard
                  items={items}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-[#FAF5ED] to-[#E8DBC5] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm border border-white/30"
            >
              <h2 className="mb-4 text-xl font-bold text-[#5C4C49]">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#5C4C49]">Subtotal</span>
                  <span className="font-medium text-[#5C4C49]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C4C49]">Shipping</span>
                  <span className="font-medium text-[#5C4C49]">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#5C4C49]/20">
                  <span className="text-lg font-medium text-[#5C4C49]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[#5C4C49]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#5C4C49" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 mt-6 font-medium text-white bg-[#5C4C49] rounded-md shadow-sm hover:bg-[#3a302e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4C49]"
              >
                Place Order
              </motion.button>

              <div className="flex justify-center mt-6 space-x-4">
                <FaCcVisa className="text-4xl text-[#5C4C49]/70" />
                <FaCcMastercard className="text-4xl text-[#5C4C49]/70" />
                <FaCcApplePay className="text-4xl text-[#5C4C49]/70" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
