import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Ratings from "../RatingsReviews/Ratings";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWishlists,
  toggleWishlist,
} from "../../store/Redux/Slices/wishlistSlice";
import { useEffect } from "react";
import { useRef } from "react";
import useAuth from "../../Hooks/useAuth";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname.replaceAll("/", "");
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const { loading } = useSelector((state) => state.wishlists);
  const debounceRef = useRef(null);
  const { isAuthenticated, userData } = useAuth();
  const toastRef = useRef(null);

  const handleLike = (bookId) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    const previousLikedState = isLiked;

    setIsLiked(!previousLikedState);

    if (!toastRef.current) {
      toastRef.current = toast.loading("Updating wishlist...");
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await dispatch(toggleWishlist(bookId)).unwrap();

        setIsLiked(res?.message?.includes("removed") ? false : true);
        toast.success(res?.message, { id: toastRef.current });
        toastRef.current = null;

        if (path === "nextChapterwishlist") {
          dispatch(getAllWishlists());
        }
      } catch (err) {
        setIsLiked(previousLikedState);
        toast.error(err?.message || "Wishlist update failed");
      }
    }, 600);
  };

  useEffect(() => {
    setIsLiked(book.isLiked ? true : false);
  }, [book.isLiked]);

  return (
    <div
      className="relative flex flex-col bg-white border-t justify-between   shadow-xl
     md:h-[29rem] h-[26rem] card rounded-3xl"
    >
      <div className="absolute top-1 right-1 px-2 py-1 bg-[#ffcd81ab] rounded-3xl">
        <p>{book.category}</p>
      </div>
      <div className="absolute group top-1 left-1">
        <div className=" w-12 border-2 rounded-full border-orange-600 p-[0.1rem] h-12">
          <img
            src={
              book.author?.author_image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="object-cover w-full h-full rounded-full cursor-pointer"
            alt=""
          />
        </div>

        <div className="absolute left-0 w-[20rem] text-sm z-[9999] transition-all duration-300 scale-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:translate-x-0 rotate-45 group-hover:rotate-0 translate-x-[-6rem] translate-y-[-10rem]  font-medium bg-[#5C4C49] p-4 rounded-3xl">
          <div className="relative mx-auto mb-2 border-[4px] border-white h-44 w-44 rounded-3xl">
            <img
              src={
                book.author?.author_image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className="object-cover object-top w-full h-full rounded-3xl"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-white">
              {" "}
              <b className="text-[0.9rem]"> Name:</b> {book.author.author_name}
            </h1>
            <div className="flex items-center gap-1 border border-white bg-[#1a19190a] p-1 px-3 rounded-lg">
              <Ratings ratings={book.author.author_rating} />
              <span className="text-orange-400">
                {book.author.author_rating}
              </span>
            </div>
          </div>
          <p className="text-center text-white">
            <b className="text-[0.9rem]">Short Intro:</b>{" "}
            {book.author.author_description}
          </p>
        </div>
      </div>
      <div className="image w-[60%] md:w-[90%] mx-auto pt-8 h-[15rem]">
        <img
          onClick={() => navigate(`/nextChapter/book/${book.book_id}`)}
          className="object-contain w-full h-full cursor-pointer"
          src={book?.images[0]}
          alt=""
        />
      </div>
      <div className="px-4 text-xl">
        <div className="text-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold md:text-xl">
              {book.title.slice(0, 20)}...
            </h2>

            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                if (!loading) handleLike(book.book_id, userData?.userId);
              }}
              className="cursor-pointer"
            >
              <motion.div
                animate={{
                  scale: isLiked ? [1, 1.2, 1] : 1,
                  color: isLiked ? "#ff0000" : "#E9D2AF",
                }}
                transition={{ duration: 0.5 }}
              >
                <FaHeart
                  className={`${isLiked ? "text-red-500" : "text-[#E9D2AF]"}`}
                />
              </motion.div>

              {/* Optional floating hearts animation when liked */}
              {isLiked && (
                <>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.5],
                      opacity: [1, 0],
                      y: -30,
                      x: -5,
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute text-red-400 pointer-events-none"
                  >
                    <FaHeart />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.2],
                      opacity: [1, 0],
                      y: -36,
                      x: 5,
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute text-red-400 pointer-events-none"
                  >
                    <FaHeart />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 0.8],
                      opacity: [1, 0],
                      y: -40,
                      x: 5,
                    }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                    className="absolute text-red-400 pointer-events-none"
                  >
                    <FaHeart />
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-gray-500 md:text-lg">
          {book.description.slice(0, 50)}...
        </p>

        <div className="flex gap-4 mt-3 text-sm md:text-lg">
          <p className="font-medium text-gray-500 line-through">
            ₹ {Number(book.book_price) * 2}
          </p>

          <p className="font-bold text-green-500">
            ₹ {Number(book.book_price)}
          </p>
        </div>
      </div>
      <div className="bottom flex rounded-b-2xl justify-between items-center backdrop-blur-sm mt-2 bg-[#D3BD9D]/20 p-3">
        <button
          onClick={(e) => e.stopPropagation()}
          className="px-4 flex gap-1 active:scale-75 transition items-center py-1 font-semibold text-orange-600 border-[#5C4C49] border-b rounded-2xl text-[12px] sm:text-sm"
        >
          <FaPlus />
          Add to Cart
        </button>

        <div className="flex items-center text-orange-500">
          <span className="mr-2 text-[12px] sm:text-sm">4.5</span>
          <Ratings ratings={4.5} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
