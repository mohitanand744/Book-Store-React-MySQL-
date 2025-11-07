// src/components/atoms/Button/Button.jsx
import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  type = "button",
  variant = "primary", // new
  className = "",
  isLoading = false,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 font-semibold rounded-xl transition duration-200 active:scale-95 focus:outline-none";

  const variantClasses = {
    primary: "bg-[#5c4c49] text-white hover:bg-[#7C664D] hover:scale-105",
    outline:
      "border border-[#5c4c49] text-[#5c4c49] bg-transparent hover:bg-[#7C664D] hover:text-white hover:scale-105",
    ghost:
      "bg-transparent text-[#5c4c49] hover:bg-[#7C664D] hover:text-white hover:scale-105",
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        isLoading || props.disabled
          ? "cursor-not-allowed hover:bg-[#5c4c49]/60 bg-[#5c4c49]/50"
          : ""
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center text-nowrap">
          <svg
            className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Almost there...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
