import React from "react";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HomeBanner = () => {
  return (
    <div className="z-10">
      <Swiper
        // install Swiper modules
        className=""
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className="object-cover w-full h-full">
          <img
            className="object-cover object-top w-full h-full"
            src="/images/Welcome Banner.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover object-top w-full h-full"
            src="/images/bannersec.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
