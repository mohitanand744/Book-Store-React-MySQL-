import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import Ratings from "../RatingsReviews/Ratings";
import SwiperNavButtons from "../Buttons/SwiperNavButtons";

function AuthorSlider({ books }) {
  const swiperRef = useRef(null);

  const findUniqueAuthors = (booksArray) => {
    const uniqueAuthors = [];
    const seen = new Set();

    for (const book of booksArray) {
      const uniqueKey = book.author.author_id;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueAuthors.push(book);
      }
    }

    return uniqueAuthors;
  };

  const uniqueAuthors = books ? findUniqueAuthors(books) : [];

  return (
    <div className="mx-auto relative container xl-custom:w-[100rem]  authorSlider">
      {/* Custom Navigation Buttons */}
      <SwiperNavButtons
        swiperRef={swiperRef}
        className="my-custom-class"
        position={{ top: "37%" }}
        prevButtonclassName=""
        nextButtonclassName=""
      />
      <Swiper
        effect={"coverflow"}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 10,
          depth: 140,
          modifier: 1,
        }}
        //autoplay={{
        //delay: 3500,
        //disableOnInteraction: false,
        //}}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
      >
        {uniqueAuthors?.map((author, i) => (
          <SwiperSlide key={i}>
            <div className="border-l-2 border-r-2 border-orange-500 p-4 overflow-hidden flex  gap-5 border-2 h-36 author justify-between  w-full md:w-80 rounded-3xl bg-[#fcfaf7]">
              <div className="w-16 h-full p-1 overflow-hidden bg-orange-600 rounded-full">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={
                    author.author.author_image_url
                      ? author.author.author_image_url
                      : "https://cdn.vectorstock.com/i/500p/40/53/accurate-silhouette-of-a-man-for-profile-picture-vector-14714053.jpg"
                  }
                  alt=""
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-500">
                  {author.author.author_name}
                </p>
                <div className="flex items-center text-orange-500">
                  <Ratings ratings={author.author.author_rating} />
                  <span className="ps-2">{author.author.author_rating}</span>
                </div>
                <p className="text-gray-500">
                  {author.author.author_description?.slice(0, 50)}...
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AuthorSlider;
