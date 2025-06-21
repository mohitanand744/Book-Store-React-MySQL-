import React, { useRef } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "../Cards/BookCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ScrollBooks = ({ autoScroll = true, books }) => {
  const swiperRef = useRef(null);

  return (
    <div className="container relative mb-15">
      {/* Custom Navigation Buttons */}
      <div className="absolute left-0 flex items-center justify-between w-full h-12 top-1/2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex items-center justify-center w-12 h-12 z-10 rounded-full bg-[#D3BD9D] shadow-lg hover:bg-[#c5ac85] text-[#5C4C49] hover:text-[#3E3432] transition-all duration-300"
          aria-label="Previous"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="flex items-center justify-center w-12 h-12 z-10 rounded-full bg-[#D3BD9D] shadow-lg hover:bg-[#ceb896] text-[#5C4C49] hover:text-[#3E3432] transition-all duration-300"
          aria-label="Next"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={
          autoScroll && {
            delay: 3500,
            disableOnInteraction: false,
          }
        }
        loop={autoScroll}
        spaceBetween={30}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="px-4 md:px-8 lg:px-14"
      >
        {books?.map((book, i) => (
          <SwiperSlide
            key={i}
            className="relative pb-8 hover:scale-[1.02] transition-transform duration-300"
          >
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScrollBooks;
