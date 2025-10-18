import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const btnBase =
    "px-3 py-1 rounded transition-colors duration-200 font-medium";
  const activeStyle = "bg-[#D3BD9D] text-[#F6F2EC]";
  const normalStyle =
    "bg-[#F6F2EC] text-[#3a3a3a] hover:bg-[#D3BD9D] hover:text-[#F6F2EC]";

  return (
    <div className="flex justify-center my-6">
      <ul className="flex items-center space-x-2">
        {/* Prev */}
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${btnBase} ${normalStyle} disabled:opacity-50`}
          >
            Prev
          </motion.button>
        </li>

        {/* Numbers + Ellipsis */}
        {visiblePages.map((page, idx) =>
          page === "..." ? (
            <li key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              …
            </li>
          ) : (
            <li key={page}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(page)}
                className={`${btnBase} ${
                  currentPage === page ? activeStyle : normalStyle
                }`}
              >
                {page}
              </motion.button>
            </li>
          )
        )}

        {/* Next */}
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${btnBase} ${normalStyle} disabled:opacity-50`}
          >
            Next
          </motion.button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
