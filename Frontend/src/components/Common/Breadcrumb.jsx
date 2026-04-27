import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumb = ({ items, className = "" }) => {
  return (
    <nav className={`flex bg-coffee/15 backdrop-blur-md p-2 px-3 rounded-full w-fit items-center flex-wrap gap-y-2 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-center"
          >
            {item.path ? (
              <Link
                to={item.path}
                className="text-[14px] uppercase tracking-[0.3em] text-sepia font-bold hover:text-coffee transition-all duration-300 hover:tracking-[0.4em]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[14px] uppercase tracking-[0.3em] text-coffee font-bold">
                {item.label}
              </span>
            )}
          </motion.div>

          {index < items.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.05 }}
              className="mx-4 text-sepia text-[13px]"
            >
              <svg
                className="w-4 h-4 transform rotate-[-45deg]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
