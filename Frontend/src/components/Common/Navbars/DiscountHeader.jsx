import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const DiscountHeader = () => {
  return (
    <div className="bg-[#ffe6c1] h-12 flex items-center justify-center">
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 3500, // Auto slide change every 1.5 seconds
          disableOnInteraction: false,
        }}
      >
        {["BUY 5 GET EXTRA 20% OFF", "BUY 2 GET EXTRA 10% OFF"].map(
          (offer, i) => (
            <SwiperSlide key={i}>
              <center className="font-bold">
                <span className="text-orange-500">{offer.slice(0, 5)}</span>{" "}
                {offer.slice(5, 15)}
                <span className="text-lg text-orange-500 ps-[0.1rem]">
                  {" "}
                  {offer.slice(15, 22)}
                </span>
              </center>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default DiscountHeader;
