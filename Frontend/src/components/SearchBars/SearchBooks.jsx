import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import React, { useEffect } from "react";


const SearchBooks = ({
  styling = "hidden md:block w-[15rem]",
  inputStylrs = "rounded-full py-2",
  iconStyles = "top-1 right-1",
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/nextChapter/books?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`/nextChapter/books`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${styling} searchbar`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (!window.location.pathname.includes("/nextChapter/books")) {
            navigate(`/nextChapter/books`);
          }
        }}
        className={`${inputStylrs} w-full px-4   focus:outline-none`}
        placeholder="Search books here... "
      />
      <div
        onClick={handleSearch}
        className={`absolute ${iconStyles} cursor-pointer active:scale-75 transition bg-[#5C4C49] h-8 w-8 flex items-center justify-center rounded-full`}
      >
        <FaSearch className="text-[#ffeccd]" />
      </div>
    </div>
  );
};

export default SearchBooks;
