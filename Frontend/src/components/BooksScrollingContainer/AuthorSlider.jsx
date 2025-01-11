import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

function AuthorSlider() {
  return (
    <div className="mx-auto mb-24 authorSlider">
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
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-full md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-full md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-l-2 border-r-2 border-orange-500 p-4 flex  gap-5 border-2  author justify-between  w-72 md:w-80 rounded-3xl bg-[#F6F2EB]">
            <div className="p-1 bg-orange-600 rounded-full w-28 md:w-32 h-28 md:h-32">
              <img
                className="object-cover w-full h-full rounded-full"
                src="https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture-of-a-female-with-long-hair-in-brown-and-white-suit-using-Fotor-AI-LinkedIn-photo-generator.jpg"
                alt=""
              />
            </div>

            <div className="">
              <p className="font-semibold text-gray-500">Plato (Aristocles)</p>
              <div className="flex items-center text-orange-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <span className="ps-2">4.5</span>
              </div>
              <p className="text-gray-500">
                Philosopher, Teacher, Idealism, Dialogues
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default AuthorSlider;
