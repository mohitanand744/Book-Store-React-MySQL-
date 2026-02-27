import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const CustomSelect = (
  {
    options,
    value,
    onChange,
    error,
    className,
    placeholder = "Select an option",
  },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative w-full" ref={selectRef}>
      <motion.button
        ref={ref}
        type="button"
        className={`w-full h-[42px] px-4 py-3 relative rounded-lg border bg-white flex items-center justify-between ${error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-[#8a7053] focus:border-[#8a7053]"
          } shadow-sm focus:outline-none focus:ring-2 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`block truncate ${error ? "text-red-500" : selectedOption?.label ? "" : "text-[#9CA3AF]"}`}
        >
          {selectedOption?.label || placeholder}
        </span>
        {!error && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        )}

        {error && (
          <ExclamationCircleIcon
            className="w-5 h-5 text-red-500"
            aria-hidden="true"
          />
        )}
      </motion.button>

      {error && (
        <p className="mt-1 text-sm text-red-600" id="input-error">
          {error}
        </p>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`absolute z-[999] ${error ? "border-red-500" : "border-gray-200"} w-full p-2 mt-1 overflow-auto bg-white border-b-[3px] border-t-[3px]  rounded-lg shadow-lg max-h-60`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="listbox"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                className={`px-4 py-2 border-b-2 transition-all duration-500 rounded-2xl relative cursor-pointer shadow-lg ${value === option.value
                  ? "border-b-[3px] border-[#5C4C49]/50"
                  : "hover:bg-[#5C4C49]/5 border-[#5C4C49]/30"
                  }`}
                whileHover={{ y: -1 }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}

                {value === option.value && (
                  <span className="w-4 text-[12.4px] text-white h-4 absolute top-4 right-3 bg-[#5C4C49]/80 flex justify-center items-center rounded-full">
                    ✓
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.forwardRef(CustomSelect);
