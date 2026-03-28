import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Search = ({
  styling = "hidden md:block w-[15rem]",
  inputStylrs = "rounded-full py-2 border-b border-[#5C4C49]/20 shadow-lg",
  iconStyles = "top-1 right-1",
  onSearch,
  onChange,
  placeholder = "Search books here... ",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    // If text is cleared in navbar search, wait 500ms and clear global filter
    if (
      searchTerm.trim() === "" &&
      !onSearch &&
      !onChange &&
      location.search.includes("search=")
    ) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, onSearch, onChange, location.search]);

  useEffect(() => {
    // Only blink if it's the navbar search (no local handlers) and there's text
    if (!searchTerm.trim() || onSearch || onChange) {
      setIsBlinking(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsBlinking(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      setIsBlinking(false);
    };
  }, [searchTerm, onSearch, onChange]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
      return;
    }
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
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (
            !onSearch &&
            !onChange &&
            !window.location.pathname.includes("/nextChapter/books")
          ) {
            navigate(`/nextChapter/books`);
          }
        }}
        className={`${inputStylrs} w-full px-3   focus:outline-none`}
        placeholder={placeholder}
      />
      <motion.div
        onClick={handleSearch}
        animate={
          isBlinking
            ? {
              scale: [1, 1.1, 0.7, 1],
            }
            : { scale: 1 }
        }
        transition={
          isBlinking
            ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }
            : { duration: 0.2 }
        }
        className={`absolute ${iconStyles} cursor-pointer active:scale-75 transition bg-[#5C4C49] h-7 w-7 flex items-center justify-center rounded-full`}
      >
        <FaSearch className="text-[#ffeccd] text-sm" />
      </motion.div>
    </div>
  );
};

export default Search;
