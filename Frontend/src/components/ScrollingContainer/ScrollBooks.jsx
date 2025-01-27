import React, { useEffect } from "react";

/* //////////////////////////////////// */

// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import BookCard from "../Cards/BookCard";

const ScrollBooks = ({ autoScroll = true, books }) => {
  return (
    <div className="mb-15">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={
          autoScroll && {
            delay: 3500, // Auto slide change every 1.5 seconds
            disableOnInteraction: false,
          }
        }
        loop={autoScroll}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // Adjust Swiper settings based on screen size
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
          1440: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {books?.map((book, i) => (
          <SwiperSlide key={i} className="relative pb-8">
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScrollBooks;
