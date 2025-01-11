import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBooks = ({
  styling = "hidden md:block w-[15rem]",
  inputStylrs = "rounded-full py-2",
  iconStyles = "top-1 right-1",
}) => {
  return (
    <div className={`relative ${styling} searchbar `}>
      <input
        type="text"
        className={`${inputStylrs} w-full px-4   focus:outline-none`}
        placeholder="Search books here... "
      />
      <div
        className={`absolute ${iconStyles} active:scale-75 transition bg-[#5C4C49] h-8 w-8 flex items-center justify-center rounded-full`}
      >
        <FaSearch className="text-[#ffeccd]" />
      </div>
    </div>
  );
};

export default SearchBooks;
