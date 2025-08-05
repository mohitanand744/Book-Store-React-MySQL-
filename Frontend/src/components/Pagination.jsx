import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const PaginationComp = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  // Always show first page, last page, current page, and 1 adjacent page
  const visiblePages = new Set([1, totalPages, currentPage]);
  if (currentPage > 1) visiblePages.add(currentPage - 1);
  if (currentPage < totalPages) visiblePages.add(currentPage + 1);

  for (let i = 1; i <= totalPages; i++) {
    if (totalPages <= 7 || visiblePages.has(i)) {
      pageNumbers.push(i);
    } else if (i === 2 && currentPage > 3) {
      pageNumbers.push("left-ellipsis");
    } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
      pageNumbers.push("right-ellipsis");
    }
  }

  return (
    <div className="flex justify-center px-4 my-8">
      <ul className="flex items-center space-x-1 sm:space-x-2">
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 rounded-md sm:px-4 sm:py-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.li>

        <AnimatePresence initial={false}>
          {pageNumbers.map((number) => (
            <React.Fragment
              key={
                number === "left-ellipsis" || number === "right-ellipsis"
                  ? number
                  : `page-${number}`
              }
            >
              {number === "left-ellipsis" || number === "right-ellipsis" ? (
                <motion.span
                  className="px-2 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  ...
                </motion.span>
              ) : (
                <motion.li
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-all duration-200 ${
                      currentPage === number
                        ? "bg-[#D3BD9D] text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                </motion.li>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 rounded-md sm:px-4 sm:py-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.li>
      </ul>
    </div>
  );
};

export default PaginationComp;
