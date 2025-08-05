import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Ratings from "../RatingsReviews/Ratings";
import { FiChevronRight } from "react-icons/fi";

const TestimonialCard = ({ data, index }) => {
  const { name, profile, rating, review } = data;
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate text to 17 words
  const truncateReview = (text) => {
    const words = text.split(" ");
    if (words.length > 17) {
      return words.slice(0, 17).join(" ") + "...";
    }
    return text;
  };

  // Animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const textVariants = {
    collapsed: {
      height: "5rem",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    expanded: {
      height: "auto",
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl hover:-translate-y-1"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
    >
      <div className="flex bg-gradient-to-r from-[#F9F5F0] to-[#F6F2EB] justify-between p-5 items-center">
        <div className="flex items-center gap-3">
          <motion.img
            src={profile}
            alt={name}
            className="object-cover border-2 border-white rounded-full shadow-md w-14 h-14"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <div>
            <h4 className="text-lg font-bold text-gray-800">{name}</h4>
            <div className="flex items-center">
              <div className="flex mr-2 text-orange-500">
                <Ratings ratings={rating} />
              </div>
              <span className="text-sm font-bold text-orange-500">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <motion.div
          className="w-12 h-12 text-gray-300"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="relative p-5 overflow-hidden text-center px-9"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={textVariants}
        initial={false}
      >
        <p className="leading-relaxed text-gray-600">
          {isExpanded ? review : truncateReview(review)}
        </p>
      </motion.div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-5 py-3 border-t border-gray-100 cursor-pointer bg-gradient-to-t from-white via-white/80 to-transparent"
      >
        <button className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1.5">
          {isExpanded ? "Show less" : "Read full review"}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </button>

        <div className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-200 rounded-full bg-gray-50 group-hover:bg-gray-100">
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </div>
      </div>

      <motion.div
        className="h-1 bg-gradient-to-r from-orange-400 to-amber-200"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default TestimonialCard;
