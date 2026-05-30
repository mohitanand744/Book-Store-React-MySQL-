import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GiBookPile } from "react-icons/gi";


const Search = ({
  styling = "hidden md:block w-[15rem]",
  inputStylrs = "rounded-full py-2 bg-coffee/20 text-tan",
  iconStyles = "top-1 right-1",
  onSearch,
  onChange,
  placeholder = "Search books here... ",
  value,
  nav,
  enableSuggestions = false,
  suggestions = [],
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [isBlinking, setIsBlinking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
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
    if (onChange && !onSearch) {
      return;
    }

    if (nav) {
      if (searchTerm.trim()) {
        navigate(`/nextChapter/books?search=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`/nextChapter/books`);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const word = "MohitAnand love"

  const handleHighlightedChar = (word, searchTerm) => {
    return word?.split("")?.map((l, i) => searchTerm?.toLowerCase()?.includes(l?.toLowerCase()) ? (<span key={i} className="text-coffee bg-tan/20 px-0.5 rounded-[2px] font-bold">
      {l}
    </span>)
      : l)
  }

  const filteredSuggestions = suggestions?.filter((suggestion) => {
    const title = suggestion?.title?.toLowerCase().trim();
    const search = searchTerm?.toLowerCase().trim();

    if (!search) return false;

    return title?.startsWith(search);
  });

  return (
    <div className={`relative ${styling} searchbar group`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);

          if (onChange) onChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className={`${inputStylrs} w-full px-3 text-tan/80 placeholder:font-semibold placeholder:!text-tan/60 focus:outline-none`}
        placeholder={placeholder}
      />


      <AnimatePresence>
        {
          enableSuggestions && searchTerm.trim() && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ scale: 0, y: -160, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: -60, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute max-h-[20rem] z-[9999] rounded-2xl overflow-y-scroll scrollbar-hide top-full left-0 mt-1 bg-sepia shadow-lg w-full`}>
              {filteredSuggestions?.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(`/nextChapter/book/${suggestion?.title?.replaceAll(" ", "-")}`)
                    setSearchTerm("")
                  }}
                  className="flex items-center hover:rounded-t-2xl border-b border-coffee/30  rounded-b-2xl shadow-lg  gap-3 px-4 py-2 hover:bg-coffee/20 transition-all duration-300 hover:scale-95 cursor-pointer"
                >
                  <div className="h-10 w-8 rounded-lg">
                    <img className="h-full w-full object-cover" src={suggestion?.cover_image} alt="" />
                  </div>
                  <div className="">
                    <h3 className="text-tan truncate w-40">{handleHighlightedChar(suggestion?.title, searchTerm)}</h3>
                    <div className="flex gap-3 items-center">
                      {
                        suggestion?.book_price && (
                          <p className="text-tan/70 line-through">₹{suggestion?.book_price * 2}</p>
                        )
                      }
                      {
                        suggestion?.book_price && (
                          <p className="text-tan/70">₹{suggestion?.book_price}</p>
                        )
                      }
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </AnimatePresence>

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
        className={`absolute ${iconStyles}  cursor-pointer group-hover:text-cream active:scale-75 text-tan transition bg-coffee h-7 w-7 flex items-center justify-center rounded-full`}
      >
        <FaSearch className="text-sm" />
      </motion.div>
    </div>
  );
};

export default Search;


