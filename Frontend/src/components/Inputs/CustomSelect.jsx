import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Search from "../SearchBars/Search";
import NoData from "../EmptyData/noData";

const CustomSelect = (
  {
    options,
    value,
    onChange,
    error,
    className,
    placeholder = "Select an option",
    multiple = false,
  },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
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

  const selectedOption = multiple
    ? options.filter((option) => value?.includes(option.value))
    : options.find((option) => option.value === value);

  console.log("selectedOption", selectedOption);

  return (
    <div className="relative w-full" ref={selectRef}>
      <motion.button
        ref={ref}
        type="button"
        className={`w-full h-[42px] px-4 py-3 relative rounded-lg border bg-white flex items-center justify-between ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#8a7053] focus:border-[#8a7053]"
        } shadow-sm focus:outline-none focus:ring-2 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`block truncate ${error ? "text-red-500" : selectedOption ? "text-[#8a7053]" : "text-[#9CA3AF]"}`}
        >
          {multiple
            ? `${selectedOption?.length} selected`
            : selectedOption?.label || (
                <span className="text-[14px]">{placeholder}</span>
              )}
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

        {/* {error && (
          <ExclamationCircleIcon
            className="w-5 h-5 text-red-500"
            aria-hidden="true"
          />
        )} */}
      </motion.button>

      {/*  {error && (
        <p className="mt-1 text-sm text-red-600" id="input-error">
          {error}
        </p>
      )} */}

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
            {options.length > 8 && (
              <div className="pb-2 mb-2 border-b ">
                <Search
                  styling="w-full !block"
                  iconStyles="top-1 right-1"
                  placeholder="Filter options..."
                  onChange={(val) => setFilterQuery(val)}
                />
              </div>
            )}

            {(() => {
              const filteredOptions = options.filter((option) =>
                option.label.toLowerCase().includes(filterQuery.toLowerCase()),
              );

              if (filteredOptions.length === 0) {
                return (
                  <div className="p-4">
                    <NoData
                      title="No results found"
                      icon="search"
                      message="Try a different term"
                      showAction={false}
                      className="!p-4 !max-w-full shadow-none border-none bg-transparent"
                      titleClassName="text-sm"
                      messageClassName="text-xs"
                      iconClassName="!w-8 !h-8"
                    />
                  </div>
                );
              }

              return filteredOptions.map((option) => (
                <motion.li
                  key={option.value}
                  className={`px-4 py-2 border-b-2 transition-all duration-500 rounded-2xl relative cursor-pointer shadow-lg ${
                    multiple
                      ? value?.includes(option.value)
                        ? "border-b-[3px] border-[#5C4C49]/50"
                        : "hover:bg-[#5C4C49]/5 border-[#5C4C49]/30"
                      : value === option.value
                        ? "border-b-[3px] border-[#5C4C49]/50"
                        : "hover:bg-[#5C4C49]/5 border-[#5C4C49]/30"
                  }`}
                  whileHover={{ y: -1 }}
                  onClick={() => {
                    if (multiple) {
                      const currentValue = Array.isArray(value) ? value : [];
                      if (currentValue.includes(option.value)) {
                        onChange(
                          currentValue.filter((val) => val !== option.value),
                        );
                      } else {
                        onChange([...currentValue, option.value]);
                      }
                    } else {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  role="option"
                  aria-selected={value === option.value}
                >
                  <span className="text-nowrap">{option.label}</span>

                  {(multiple
                    ? value?.includes(option.value)
                    : value === option.value) && (
                    <span className="w-4 text-[12.4px] text-white h-4 absolute top-4 right-1 bg-[#5C4C49]/80 flex justify-center items-center rounded-full">
                      ✓
                    </span>
                  )}
                </motion.li>
              ));
            })()}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.forwardRef(CustomSelect);
