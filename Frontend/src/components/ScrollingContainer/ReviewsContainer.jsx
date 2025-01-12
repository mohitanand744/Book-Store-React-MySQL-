import React from "react";
import TestimonialCard from "../Cards/ReviewCard";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const ReviewsContainer = () => {
  return (
    <Swiper
      className="mb-16 "
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 3500, // Auto slide change every 1.5 seconds
        disableOnInteraction: false,
      }}
      // loop={autoScroll}
      spaceBetween={30}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        // Adjust Swiper settings based on screen size
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }}
    >
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <TestimonialCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default ReviewsContainer;
