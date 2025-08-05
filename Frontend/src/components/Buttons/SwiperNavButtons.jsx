import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from "react";

const SwiperNavButtons = ({
  swiperRef,
  className = "",
  position = { top: "8rem" },
  prevButtonClass = "",
  nextButtonClass = "",
}) => {
  return (
    <div
      className={`absolute flex items-center justify-between w-full h-12 ${className}`}
      style={position}
    >
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`flex items-center justify-center w-12 h-12 z-10 rounded-full bg-[#D3BD9D] shadow-lg hover:bg-[#c5ac85] text-[#5C4C49] hover:text-[#3E3432] transition-all duration-300 ${prevButtonClass}`}
        aria-label="Previous"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`flex items-center justify-center w-12 h-12 z-10 rounded-full bg-[#D3BD9D] shadow-lg hover:bg-[#ceb896] text-[#5C4C49] hover:text-[#3E3432] transition-all duration-300 ${nextButtonClass}`}
        aria-label="Next"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SwiperNavButtons;
