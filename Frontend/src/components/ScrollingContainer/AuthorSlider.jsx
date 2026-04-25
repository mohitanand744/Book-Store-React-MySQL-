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
import { useNavigate } from "react-router-dom";

function AuthorSlider({ books }) {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

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
        loop={true}
        initialSlide={3}
        effect={"coverflow"}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        grabCursor={true}
        centeredSlides={true}

        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
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
          <SwiperSlide key={i} className="!w-[240px] py-10 md:!w-[280px]">
            <div className="relative w-full h-[280px] mx-auto overflow-hidden bg-coffee backdrop-blur-xl rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 border border-tan/20 group">
              {/* Decorative Top Banner */}
              <div className="absolute top-0 left-0 w-full z-0 transition-transform duration-700 ease-in-out group-hover:scale-[1.10] origin-top">
                <DecorativeHeader />
              </div>

              <div className="relative flex flex-col items-center px-5 pt-10 h-full">
                {/* Author Avatar */}
                <div className="w-16 h-16 md:w-20 md:h-20 p-1 mb-2 md:mb-4 bg-tan/20 rounded-full shadow-lg z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-tan/30">
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
                <h3 className="mb-1 text-lg md:text-xl font-bold text-center text-tan line-clamp-1">
                  {author?.author?.author_name || "Unknown Author"}
                </h3>

                <div className="flex items-center gap-2 mb-3 text-tan">
                  <Ratings ratings={author?.author?.author_rating || 5} />
                  <span className="text-[10px] md:text-xs font-semibold text-tan">
                    ({author?.author?.author_rating || 5})
                  </span>
                </div>

                <p className="text-[10px] md:text-xs text-center text-tan/70 line-clamp-3 transition-opacity duration-300 md:group-hover:opacity-0">
                  {author?.author?.author_description || "A brilliant author with captivating stories that take you on incredible journeys with every new release."}
                </p>

                {/* Floating Action Button (Revealed on Hover) */}
                <div className="absolute bottom-5 md:bottom-6 left-0 w-full px-5 md:px-6 md:opacity-0 md:translate-y-6 translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] pointer-events-none md:group-hover:pointer-events-auto">
                  <Button
                    onClick={() => navigate(`/nextChapter/author/${author?.author?.author_id}`)}
                    variant="primary" className="!w-full border-2 border-tan !rounded-[0.8rem] !text-[10px] md:!text-[12px] active:scale-95">
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


