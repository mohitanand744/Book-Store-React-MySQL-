import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ ratings }) => {
  const rating = Array.from({ length: 5 }, (_, i) => {
    let pointNumbers = i + 0.5;

    return (
      <span key={i}>
        {ratings >= i + 1 ? (
          <FaStar />
        ) : ratings >= pointNumbers ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar className="text-[1.1rem] mt-[0.2rem]" />
        )}
      </span>
    );
  });

  return <div className="flex items-center text-yellow-400">{rating}</div>;
};

export default Ratings;
