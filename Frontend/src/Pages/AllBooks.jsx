import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DualRangeSlider from "../components/Inputs/DualRangeSlider";
import BookCard from "../components/Cards/BookCard";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import BooksLoader from "../components/Loaders/BooksLoader";
import ShowErrors from "../components/Errors/ShowErrors";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);
  const [showFilters, setShowFilters] = useState(false);
  const [openCategory, setOpenCategory] = useState({
    PriceFilter: false,
    CategoryFilter: false,
    LanguageFilter: false,
  });

  const categories = [
    "Fiction",
    "Science",
    "History",
    "Technology",
    "Romantic",
    "Horror",
    "Comedy",
    "Action",
  ];

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setShowFilters(false);
      }}
    >
      <div className="bg-[#fff5e4] py-4 px-6  flex gap-5 justify-between items-center">
        <h1 className=" text-xl font-semibold text-start sm:text-center text-[#5c4c49] md:text-2xl uppercase">
          We have various types of books
        </h1>

        <div className="">
          <img
            onClick={(e) => {
              e.stopPropagation();
              setShowFilters(!showFilters);
            }}
            className="w-10 transition-all duration-200 cursor-pointer active:scale-125 hover:rotate-90"
            src={`/images/${showFilters ? "close" : "filter"}.png`}
            alt=""
          />
        </div>
      </div>
      {loading ? (
        <>
          <BooksLoader />
        </>
      ) : error ? (
        <>
          <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
        </>
      ) : (
        <>
          <div className="my-10">
            <div className="flex-1">
              <div className={`grid grid-cols-12 gap-3 mx-6 lg:mx-16`}>
                {books?.books?.map((book) => (
                  <div
                    className={`col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3`}
                  >
                    <BookCard book={book} key={book.book_id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={`${
          openCategory.CategoryFilter ? "h-[68vh]" : "h-fit"
        } hideScroll overflow-y-scroll  border top-[3.6rem]  right-[1.6rem] absolute bg-white z-[9999] sm:w-[20rem] ${
          showFilters
            ? "translate-x-0 translate-y-0 scale-100"
            : "translate-x-[6rem] sm:translate-x-[8rem] translate-y-[-10rem] scale-0"
        }  overflow-hidden 
          duration-300 ease-in-out shadow-xl border-gray-200 rounded-3xl`}
      >
        <div className="p-5 border-b border-gray-200 shadow-lg rounded-3xl">
          <DualRangeSlider
            PriceFilter={openCategory.PriceFilter}
            setOpenCategory={setOpenCategory}
          />
        </div>
        <div className="p-5 border-b-2 border-gray-200 shadow-lg rounded-3xl ">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenCategory({
                PriceFilter: false,
                CategoryFilter: !openCategory.CategoryFilter,
                LanguageFilter: false,
              });
            }}
            className="flex items-center justify-between mb-2 p-3  bg-[#FFF5E4] rounded-lg"
          >
            <h1 className="text-lg font-semibold "> Filter By Category</h1>

            <img
              className={`${
                openCategory.CategoryFilter ? "rotate-90" : ""
              } transition-all w-[1.5rem] duration-300 `}
              src="/images/right.png"
              alt=""
            />
          </div>

          <ul
            className={` space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
              openCategory.CategoryFilter ? "h-[17rem] p-5" : "h-[0rem] p-0"
            }`}
          >
            {categories.map((category) => (
              <li key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  className="w-4 h-4 md:w-5 md:h-5  text-blue-600 bg-gray-300 rounded-md appearance-none checked:after:content-['✓'] checked:after:text-white flex justify-center items-center checked:bg-[#D3BD9D]"
                />
                <label
                  htmlFor={category}
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 border-b-2 border-gray-200 shadow-lg rounded-3xl ">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenCategory({
                PriceFilter: false,
                CategoryFilter: false,
                LanguageFilter: !openCategory.LanguageFilter,
              });
            }}
            className="flex items-center justify-between mb-2 p-3  bg-[#FFF5E4] rounded-lg"
          >
            <h1 className="text-lg font-semibold "> Filter By Language</h1>

            <img
              className={`${
                openCategory.LanguageFilter ? "rotate-90" : ""
              } transition-all w-[1.5rem] duration-300 `}
              src="/images/right.png"
              alt=""
            />
          </div>

          <ul
            className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
              openCategory.LanguageFilter ? "h-[6rem] p-5" : "h-[0rem] p-0"
            }`}
          >
            <li className="flex items-center">
              <input
                type="checkbox"
                id={"Hindi"}
                className="w-4 h-4 md:w-5 md:h-5  text-blue-600 bg-gray-300 rounded-md appearance-none checked:after:content-['✓'] checked:after:text-white flex justify-center items-center checked:bg-[#D3BD9D]"
              />
              <label
                htmlFor={"Hindi"}
                className="ml-2 text-gray-700 cursor-pointer"
              >
                Hindi
              </label>
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                id={"English"}
                className="w-4 h-4 md:w-5 md:h-5  text-blue-600 bg-gray-300 rounded-md appearance-none checked:after:content-['✓'] checked:after:text-white flex justify-center items-center checked:bg-[#D3BD9D]"
              />
              <label
                htmlFor={"English"}
                className="ml-2 text-gray-700 cursor-pointer"
              >
                English
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

//
