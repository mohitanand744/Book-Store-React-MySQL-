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
import { DecorativeHeader } from "../SVGs/SVGs";
import Button from "../Buttons/Button";

function AuthorSlider({ books }) {
  const swiperRef = useRef(null);

  const findUniqueAuthors = (booksArray) => {
    const uniqueAuthors = [];
    const seen = new Set();

    for (const book of booksArray) {
      const uniqueKey = book?.author?.author_id;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueAuthors.push(book);
      }
    }

    return uniqueAuthors;
  };

  const uniqueAuthors = books ? findUniqueAuthors(books) : [];

  return (
    <div className="mx-auto relative container   authorSlider">
      {/* Custom Navigation Buttons */}
      <SwiperNavButtons
        swiperRef={swiperRef}
        position={{ top: "40%" }}
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
          stretch: 20,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="w-full pt-10 pb-16"
      >
        {uniqueAuthors?.map((author, i) => (
          <SwiperSlide key={i} className="!w-[280px] py-12 md:!w-[320px]">
            <div className="relative w-full h-[320px] md:h-[360px] mx-auto overflow-hidden bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-2xl transition-all duration-300 border border-white group">
              {/* Decorative Top Banner */}
              <div className="absolute top-0 left-0 w-full z-0 transition-transform duration-700 ease-in-out group-hover:scale-[1.10] origin-top">
                <DecorativeHeader />
              </div>

              <div className="relative flex flex-col items-center px-6 pt-12 h-full">
                {/* Author Avatar */}
                <div className="w-20 h-20 md:w-28 md:h-28 p-1.5 mb-2 md:mb-5 bg-white rounded-full shadow-lg z-10 transition-transform duration-500 ease-out group-hover:-translate-y-3">
                  <div className="w-full h-full overflow-hidden rounded-full">
                    <img
                      className="object-cover w-full h-full transition-all duration-700 grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110"
                      src={
                        author?.author?.author_image
                          ? author?.author?.author_image
                          : "https://cdn.vectorstock.com/i/500p/40/53/accurate-silhouette-of-a-man-for-profile-picture-vector-14714053.jpg"
                      }
                      alt={author?.author?.author_name || "Author"}
                    />
                  </div>
                </div>

                {/* Author Info Area */}
                <h3 className="mb-1.5 text-xl md:text-2xl font-bold text-center text-[#5C4C49] line-clamp-1">
                  {author?.author?.author_name || "Unknown Author"}
                </h3>

                <div className="flex items-center gap-2 mb-4 text-[#D3BD9D]">
                  <Ratings ratings={author?.author?.author_rating || 5} />
                  <span className="text-sm font-semibold text-gray-500">
                    ({author?.author?.author_rating || 5})
                  </span>
                </div>

                <p className="text-xs md:text-sm text-center text-gray-500 line-clamp-3 transition-opacity duration-300 md:group-hover:opacity-0">
                  {author?.author?.author_description || "A brilliant author with captivating stories that take you on incredible journeys with every new release."}
                </p>

                {/* Floating Action Button (Revealed on Hover) */}
                <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-6 md:px-8 md:opacity-0 md:translate-y-6 translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] pointer-events-none md:group-hover:pointer-events-auto">
                  <Button variant="primary" className="!w-full !rounded-[1rem] !py-2 md:!py-3 !text-[11px] md:!text-sm !tracking-wide shadow-[0_8px_20px_-6px_rgba(92,76,73,0.6)] active:scale-95">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AuthorSlider;
