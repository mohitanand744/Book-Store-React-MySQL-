import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/Cards/BookCard";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import BooksLoader from "../components/Loaders/BooksLoader";
import ShowErrors from "../components/Errors/ShowErrors";
import { AnimatePresence, motion } from "framer-motion";
import BookListingFilter from "../components/BookListingFilter";
import CategorySlider from "../components/ScrollingContainer/CategorySlider";
import NoData from "../components/EmptyData/noData";

import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../Hooks/useDebounce";

const defaultFilters = {
  limit: 10,
  cursor: "",
  category: "",
  minPrice: 0,
  maxPrice: 10000,
  discount: "",
  language: "",
  search: "",
};
import { useMemo } from "react";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

const AllBooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { books, error, loading, hasMore, nextCursor } = useSelector(
    (state) => state.books,
  );

  const sentinelRef = useRef();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    limit: 8,
    cursor: "",
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    discount: "",
    language: "",
    search: initialSearch,
  });

  const [openCategory, setOpenCategory] = useState({
    PriceFilter: false,
    CategoryFilter: false,
    LanguageFilter: false,
    DiscountFilter: false,
  });

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search).get("search") || "";
    setFilters((prev) => ({ ...prev, search: urlSearch, cursor: "" }));
  }, [location.search]);

  const { category, minPrice, maxPrice, discount, language, search } = filters;
  useEffect(() => {
    setFilters((prev) => ({ ...prev, cursor: "" }));
  }, [category, minPrice, maxPrice, discount, language, search]);

  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedMinPrice = useDebounce(filters.minPrice, 500);
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500);

  useEffect(() => {
    dispatch(
      fetchAllBooks({
        ...filters,
        search: debouncedSearch,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      }),
    );
  }, [
    dispatch,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    filters.category,
    filters.discount,
    filters.language,
    filters.limit,
    filters.cursor,
  ]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setFilters((prev) => ({ ...prev, cursor: nextCursor }));
        }
      },
      { threshold: 0.1 },
    );

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasMore, nextCursor, loading]);

  const appliedFiltersCount = useMemo(() => {
    const ignoreKeys = ["limit", "cursor"];

    return Object.keys(filters).filter(
      (key) =>
        !ignoreKeys.includes(key) && filters[key] !== defaultFilters[key],
    ).length;
  }, [filters]);

  console.log(books);

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setShowFilters(false);
      }}
    >
      <div className="bg-[#fff5e4] py-4 px-6">
        <div className="container flex items-center justify-between gap-5 md:px-4">
          <h1 className="text-xl font-semibold text-start sm:text-center text-[#5c4c49] md:text-2xl uppercase">
            We have various types of books
          </h1>

          <div className="flex items-center gap-2">
            {appliedFiltersCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#E8D9C5]/50 border border-[#5C4C49]/20 w-fit">
                <span className="text-[#5C4C49] font-medium">Filters:</span>

                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#5C4C49] text-white">
                  {appliedFiltersCount}
                </span>

                <span className="bg-red-600/20 rounded-xl">
                  <XCircleIcon
                    onClick={() => setFilters(defaultFilters)}
                    className="bottom-0 right-0 w-5 h-5 text-red-600 transition-all duration-200 ease-linear cursor-pointer active:scale-75 hover:scale-105"
                  />
                </span>
              </div>
            )}
            <motion.img
              onClick={(e) => {
                e.stopPropagation();
                setShowFilters(!showFilters);
              }}
              whileTap={{ scale: 1.2 }}
              className="w-10 cursor-pointer"
              src={`/images/${showFilters ? "close" : "filter"}.png`}
              alt=""
            />
          </div>
        </div>
      </div>

      <CategorySlider filters={filters} setFilters={setFilters} />

      {books?.length === 0 ? (
        <div className="my-20">
          <NoData
            title="No Books Found"
            message="We couldn't find any books matching your current filters. Try adjusting your search or filters."
            icon="search"
            showAction={true}
            actionText="Clear All Filters"
            onActionClick={() => {
              navigate("/nextChapter/books");
              setFilters({
                limit: 10,
                cursor: "",
                category: "",
                minPrice: 0,
                maxPrice: 10000,
                discount: "",
                language: "",
                search: "",
              });
            }}
          />
        </div>
      ) : (
        <div className="my-10">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`grid container mx-auto grid-cols-12 gap-3 px-6`}
            >
              {books?.map((book) => (
                <motion.div
                  key={book.book_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3`}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Sentinel */}
            <div
              ref={sentinelRef}
              className="flex items-center justify-center w-full h-10 mt-5"
            >
              {loading && (
                <div className="flex items-center justify-center">
                  <BooksLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: 200, scale: 0.5 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: 300, scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
            className="fixed top-[3.6rem] right-[1.6rem] z-[9999]"
          >
            <BookListingFilter
              filters={filters}
              setFilters={setFilters}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllBooks;
