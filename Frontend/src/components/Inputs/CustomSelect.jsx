import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomSelect = ({
  options,
  value,
  onChange,
  error,
  className,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
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
        type="button"
        className={`w-full px-4 py-3 rounded-lg border bg-white flex items-center justify-between ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#8a7053] focus:border-[#8a7053]"
        } shadow-sm focus:outline-none focus:ring-2 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!value ? "text-gray-400" : ""}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute z-[999] w-full p-2 mt-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="listbox"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                className={`px-4 py-2 transition-all duration-500 rounded-2xl cursor-pointer ${
                  value === option.value
                    ? "bg-[#8a7053] text-white"
                    : "hover:bg-[#8a7053]/20"
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
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
