import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
/* //////////////////////////////////// */

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ScrollBooks = ({ autoScroll = true }) => {
  return (
    <div className="mb-10 ">
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
            slidesPerView: 1.2,
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
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/61UpLKUsDtL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/71pAu-PTefL._SL1500_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/619gqFN+XeL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/71FF0AsDa+L._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/619gqFN+XeL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/619gqFN+XeL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/619gqFN+XeL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/619gqFN+XeL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>{" "}
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="relative overflow-hidden border-2 card rounded-3xl">
            <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
              <p>NOVEL</p>
            </div>
            <div className="image w-[90%] mx-auto h-[15rem]">
              <img
                className="object-contain w-full h-full"
                src="https://m.media-amazon.com/images/I/619gqFN+XeL._SY425_.jpg"
                alt=""
              />
            </div>
            <div className="px-4 text-xl">
              <h2 className="text-xl font-semibold">No Matter What</h2>
              <p className="text-lg text-gray-500">
                No Matter What . . . I will always love you!
              </p>

              <div className="flex gap-4">
                <p className="font-medium line-through">₹ 999</p>

                <p className="font-bold text-green-500">₹ 599</p>
              </div>
            </div>
            <div className="bottom flex justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
              <button className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-sm">
                <FaPlus />
                Add to Cart
              </button>

              <div className="flex items-center text-orange-500">
                <span className="mr-2">4.5</span>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
              </div>
            </div>
          </div>{" "}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ScrollBooks;
