import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = () => {
  return (
    <div className="z-10 homeBanner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 2500, // Auto slide change every 1.5 seconds
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide className="relative">
          {/* Image with a gradient fade at the bottom */}
          <img
            className="object-cover object-top w-full h-full"
            src="/images/Welcome_Banner.webp"
            alt="Welcome Banner"
          />
          {/* Gradient effect */}
          <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-white to-transparent"></div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img
            className="object-cover object-top w-full h-full"
            src="/images/bannersec.webp"
            alt="Second Banner"
          />
          {/* Gradient effect */}
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-white to-transparent"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
