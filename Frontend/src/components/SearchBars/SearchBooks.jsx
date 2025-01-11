import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBooks = ({
  styling = "hidden md:block w-[15rem]",
  inputStylrs = "rounded-full",
}) => {
  return (
    <div className={`relative ${styling} searchbar `}>
      <input
        type="text"
        className={`${inputStylrs} w-full px-4 py-2  focus:outline-none`}
        placeholder="Search books here... "
      />
      <div className="absolute top-1 right-1 active:scale-75 transition bg-[#5C4C49] h-[80%] w-8 flex items-center justify-center rounded-full">
        <FaSearch className="text-[#ffeccd]" />
      </div>
    </div>
  );
};

export default SearchBooks;
