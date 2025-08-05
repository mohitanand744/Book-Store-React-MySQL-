import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcApplePay } from "react-icons/fa";

const CheckoutPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Desert Storms",
      description:
        "A journey through space and time. This special edition includes...",
      quantity: 1,
      price: 99.99,
    },
    {
      id: 2,
      title: "Galactic Wars",
      description:
        "A journey through space and time. This special edition includes...",
      quantity: 1,
      price: 199.99,
    },
    {
      id: 3,
      title: "Desert Storms",
      description:
        "A journey through space and time. This special edition includes...",
      quantity: 2,
      price: 79.99,
    },
  ]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </motion.button>
          <div className="flex items-center mx-auto">
            <FiShoppingBag className="mr-2 text-2xl text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 ${
                index !== items.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-gray-500">{item.description}</p>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-indigo-600"
                    >
                      <FiMinus size={16} />
                    </motion.button>
                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-indigo-600"
                    >
                      <FiPlus size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeItem(item.id)}
                  className="flex items-center text-sm text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="mr-1" />
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 mt-8 overflow-hidden bg-white rounded-lg shadow-sm"
        >
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-lg font-medium">Total</span>
              <span className="text-xl font-bold text-indigo-600">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 mt-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Proceed to Checkout
          </motion.button>

          <div className="mt-6">
            <p className="mb-4 text-center text-gray-500">or</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </motion.button>
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <FaCcVisa className="text-3xl text-gray-400" />
            <FaCcMastercard className="text-3xl text-gray-400" />
            <FaCcApplePay className="text-3xl text-gray-400" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
