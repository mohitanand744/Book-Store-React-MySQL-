import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Ratings from "../RatingsReviews/Ratings";

const BookCard = ({ book }) => {
  return (
    <div className="relative flex flex-col border-t justify-between z-40  shadow-xl h-[29rem] card rounded-3xl">
      <div className="absolute top-1 right-1 px-2 py-1 bg-[#ffcd8186] rounded-3xl">
        <p>{book.category}</p>
      </div>
      <div className="absolute w-12 group border-2 border-orange-600 p-[0.1rem] h-12 top-1 left-1 rounded-full ">
        <img
          src={
            book.author?.author_image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          className="object-cover w-full h-full rounded-full"
          alt=""
        />
        <div className="absolute left-0  md:-left-6 text-sm  transition-all duration-300 scale-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:translate-x-0 rotate-45 group-hover:rotate-0 translate-x-[-7rem] translate-y-[-10rem] z-50 font-medium bg-[#D3BD9D] p-4 rounded-3xl w-[20rem]">
          <div className="mb-2 border border-white h-44 w-44 rounded-3xl">
            <img
              src={
                book.author?.author_image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className="object-cover object-top w-full h-full rounded-3xl"
              alt=""
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-white">
              {" "}
              <b className="text-[0.9rem]"> Name:</b> {book.author.author_name}
            </h1>
            <div className="flex items-center gap-1 border border-white bg-[#1a19190a] p-1 px-3 rounded-lg">
              <Ratings ratings={book.author.author_rating} />
              <span className="text-orange-600">
                {book.author.author_rating}
              </span>
            </div>
          </div>
          <p className="text-white">
            <b className="text-[0.9rem]">Short Intro:</b>{" "}
            {book.author.author_description}
          </p>
        </div>
      </div>
      <div className="image w-[60%] md:w-[90%] mx-auto pt-2 h-[15rem]">
        <img
          className="object-contain w-full h-full"
          src={book?.images[0]}
          alt=""
        />
      </div>
      <div className="px-4 text-xl">
        <h2 className="text-lg font-semibold md:text-xl">
          {book.title.slice(0, 20)}...
        </h2>
        <p className="text-sm text-gray-500 md:text-lg">
          {book.description.slice(0, 50)}...
        </p>

        <div className="flex gap-4 mt-3 text-sm md:text-lg">
          <p className="font-medium text-gray-500 line-through">
            ₹ {Number(book.book_price) * 2}
          </p>

          <p className="font-bold text-green-500">
            ₹ {Number(book.book_price)}
          </p>
        </div>
      </div>
      <div className="bottom flex rounded-b-2xl justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
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
  );
};

export default BookCard;
