import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiChevronRight } from "react-icons/fi";
import BookCard from "../components/Cards/BookCard";
import Banners from "./../components/Banners/Banners";
import SearchBooks from "../components/SearchBars/SearchBooks";
import BackButton from "../components/Buttons/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlists } from "../store/Redux/Slices/wishlistSlice";
import NoData from "./../components/EmptyData/noData";
import { BookSvg } from "../components/SVGs/SVGs";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { loading, wishlists } = useSelector((state) => state.wishlists);

  useEffect(() => {
    dispatch(getAllWishlists());
  }, [dispatch]);

  console.log("wishlists", wishlists);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F5F1ED]"
    >
      {/* Header */}

      <Banners
        titleFirst={"My Reading"}
        titleSecond={"List"}
        description={"Your saved books for later"}
      />

      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-8 md:justify-between">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mb-8"
          >
            <BackButton label="Back to Profile" />

            <SearchBooks styling="flex-1 md:w-[20rem]" />
          </motion.div>

          {/* Book Count */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2">
              {/* Animated book icon */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <BookSvg />
              </motion.div>

              {/* Count with gradient text */}
              <div className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C4C49] to-[#D3BD9D] font-bold text-lg">
                  {wishlists?.data.length}
                </span>
                <span className="text-[#5C4C49]/80 ml-1">
                  {wishlists?.data.length === 1 ? "book" : "books"} saved
                </span>

                {/* Subtle pulse effect */}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-2 -top-2 h-2 w-2 rounded-full bg-[#D3BD9D] opacity-70"
                />
              </div>
            </div>

            {/* Modern progress indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-0.5 mt-2 bg-gradient-to-r from-[#5C4C49]/20 to-[#D3BD9D] rounded-full"
            />
          </motion.div>
        </div>

        {/* Book List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {wishlists?.data.map((book) => (
              <motion.div
                key={book.book_id} // ✅ important
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {wishlists?.data.length === 0 && (
          <>
            <NoData
              title=" Your wishlist is empty"
              message="Start saving your favorite books."
              icon="heart"
              showAction={true}
              actionText="Browse Books"
              actionLink="/nextChapter/books"
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
