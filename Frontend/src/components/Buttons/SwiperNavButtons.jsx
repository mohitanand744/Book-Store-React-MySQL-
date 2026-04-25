import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from "react";

const SwiperNavButtons = ({
  swiperRef,
  className = "justify-between",
  position = { top: "8rem" },
  prevButtonClass = "w-9 h-9",
  nextButtonClass = "w-9 h-9",
}) => {
  return (
    <div
      className={`absolute flex items-center  gap-3 w-full h-12 ${className}`}
      style={position}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slidePrev();
        }}
        className={`flex items-center justify-center  z-10 rounded-full bg-tan shadow-lg  text-coffee  transition-all duration-300 ${prevButtonClass}`}
        aria-label="Previous"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slideNext();
        }}
        className={`flex items-center justify-center  z-10 rounded-full bg-tan shadow-lg  text-coffee  transition-all duration-300 ${nextButtonClass}`}
        aria-label="Next"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SwiperNavButtons;


