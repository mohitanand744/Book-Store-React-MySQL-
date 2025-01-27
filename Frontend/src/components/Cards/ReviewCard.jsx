import React from "react";

import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Ratings from "../RatingsReviews/Ratings";

const TestimonialCard = () => {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white border shadow-lg rounded-2xl">
      <div className="flex bg-[#F6F2EB] justify-between p-3 items-center">
        <div className="flex items-center gap-2">
          {/* Profile Image */}
          <img
            src="https://a.storyblok.com/f/191576/1176x882/f95162c213/profile_picture_hero_before.webp"
            alt="Profile"
            className="object-cover w-12 h-12 mr-4 rounded-full"
          />
          {/* User Name and Rating */}
          <div>
            <h4 className="font-bold text-gray-800">Jenny Wilson</h4>
            <div className="flex items-center">
              <span className="mr-1 text-sm font-bold text-orange-500">
                4.5
              </span>
              <div className="flex text-orange-500">
                {/* Stars */}
                <Ratings ratings={4.5} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 ">
          <img src="/images/quote.svg" alt="" />
        </div>
      </div>
      {/* Quote and Review Text */}
      <div className="p-4 text-sm italic text-gray-500">
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
