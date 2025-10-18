import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/Cards/BookCard";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import BooksLoader from "../components/Loaders/BooksLoader";
import ShowErrors from "../components/Errors/ShowErrors";
import { motion } from "framer-motion";
import BookListingFilter from "../components/BookListingFilter";
import CategorySlider from "../components/ScrollingContainer/CategorySlider";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);
  const [showFilters, setShowFilters] = useState(false);
  const [openCategory, setOpenCategory] = useState({
    PriceFilter: false,
    CategoryFilter: false,
    LanguageFilter: false,
  });

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

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

          <div className="">
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

      <CategorySlider />

      {loading ? (
        <BooksLoader />
      ) : error ? (
        <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
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
          </div>
        </div>
      )}

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-[3.6rem] right-[1.6rem] z-[9999]"
        >
          <BookListingFilter
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
          />
        </motion.div>
      )}
    </div>
  );
};

export default AllBooks;
