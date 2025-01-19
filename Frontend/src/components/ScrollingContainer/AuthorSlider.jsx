import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Ratings from "../RatingsReviews/Ratings";

function AuthorSlider({ books }) {
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
    <div className="mx-auto xl-custom:w-[100rem]  authorSlider">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 20,
          depth: 200,
          modifier: 1,
        }}
        navigation={{ clickable: true }}
        modules={[EffectCoverflow, Navigation]}
      >
        {uniqueAuthors?.map((author, i) => (
          <SwiperSlide key={i}>
            <div className="border-l-2 border-r-2 border-orange-500 p-4 overflow-hidden flex  gap-5 border-2 h-36 author justify-between  w-full md:w-80 rounded-3xl bg-[#F6F2EB]">
              <div className="w-16 h-full p-1 overflow-hidden bg-orange-600 rounded-full">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={
                    author.author.author_image
                      ? author.author.author_image
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
