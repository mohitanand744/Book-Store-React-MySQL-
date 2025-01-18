import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const BookCard = ({ book }) => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden border-2 h-[29rem] card rounded-3xl">
      <div className="absolute top-1 right-1 px-2 py-1 bg-[#d3bd9d86] rounded-3xl">
        <p>{book.category}</p>
      </div>
      <div className="absolute w-12 group border-2 border-orange-600 p-[0.1rem] h-12 top-1 left-1 bg-[#d3bd9d86] rounded-full">
        <img
          src={
            book.author?.author_image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          className="object-cover w-full h-full rounded-full"
          alt=""
        />
        <span className="absolute text-sm text-center text-gray-600 transition scale-0 group-hover:scale-100 font-medium bg-[#ffcd82] p-2 rounded-xl w-44">
          <b> Author Name:</b> {book.author.author_name}
        </span>
      </div>
      <div className="image w-[90%] mx-auto pt-2 h-[15rem]">
        <img
          className="object-contain w-full h-full"
          src={book?.images[0]}
          alt=""
        />
      </div>
      <div className="px-4 text-xl">
        <h2 className="text-xl font-semibold">{book.title.slice(0, 20)}...</h2>
        <p className="text-lg text-gray-500">
          {book.description.slice(0, 50)}...
        </p>

        <div className="flex gap-4 mt-3">
          <p className="font-medium text-gray-500 line-through">
            ₹ {Number(book.book_price) * 2}
          </p>

          <p className="font-bold text-green-500">
            ₹ {Number(book.book_price)}
          </p>
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
  );
};

export default BookCard;
