import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartItemsNoData = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center max-w-md p-8 mx-auto rounded-xl"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-[#D3BD9D]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </motion.div>

      <motion.h3
        className="mb-2 text-xl font-semibold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Your cart is empty
      </motion.h3>

      <motion.p
        className="mb-6 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Looks like you haven't added anything to your cart yet
      </motion.p>

      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
        <Link to="/bookstore/books">
          or{" "}
          <button
            type="button"
            // onClick={toggleCart}
            className="font-medium text-[#5C4C49] hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CartItemsNoData;
