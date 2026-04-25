import React, { useState } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import { MdOutlineAddShoppingCart } from "react-icons/md";
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
import FloatingReaction from "../UI/FloatingReaction";
import Button from "../Buttons/Button";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname.replaceAll("/", "");
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const { loading } = useSelector((state) => state.wishlists);
  const debounceRef = useRef(null);
  const { isAuthenticated, userData, getUserUpdatedDetails } = useAuth();
  const toastRef = useRef(null);

  const handleLike = (bookId) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    const previousLikedState = isLiked;

    setIsLiked(!previousLikedState);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!toastRef.current) {
      toastRef.current = toast.loading("Updating wishlist...");
    }

    console.log("toastContainer", toastRef);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await dispatch(toggleWishlist(bookId)).unwrap();

        setIsLiked(res?.message?.includes("removed") ? false : true);
        toast.success(res?.message, { id: toastRef.current });
        toastRef.current = null;

        if (path === "nextChapterwishlist") {
          dispatch(getAllWishlists());
        } else {
          await getUserUpdatedDetails();
        }
      } catch (err) {
        setIsLiked(previousLikedState);
        if (err?.status !== 401) {
          toast.error(err?.message || "Wishlist update failed", {
            id: toastRef.current,
          });
        } else {
          toast.dismiss(toastRef.current);
        }
        toastRef.current = null;
      }
    }, 600);
  };

  useEffect(() => {
    setIsLiked(book?.isLiked ? true : false);
  }, [book?.isLiked]);

  return (
    <div
      className="relative flex flex-col bg-coffee border border-tan/10 justify-between shadow-2xl
     md:h-[29rem] h-[26rem] z-10 hover:z-[99] transition-all duration-300 card rounded-3xl "
    >
      <div className="absolute top-0 right-0 px-3 py-1 bg-tan/20 text-tan text-xs font-medium backdrop-blur-md rounded-bl-2xl border-l border-b rounded-tr-3xl border-tan/10">
        <p>{book?.category}</p>
      </div>
      <div className="absolute group top-1 left-1">
        <div className=" w-12 border-2 rounded-full border-tan p-[0.1rem] h-12">
          <img
            src={
              book?.author?.author_image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="object-cover w-full h-full rounded-full cursor-pointer"
            alt=""
          />
        </div>

        <div className="absolute border-2 border-tan shadow-lg left-[-4rem] w-[20rem] text-sm z-[11111] transition-all duration-300 scale-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:translate-x-0 rotate-90 group-hover:rotate-0 translate-x-[-5rem] translate-y-[-11.7rem] font-medium bg-coffee/50 backdrop-blur-md p-4 rounded-3xl">
          <div className="relative mx-auto mb-2 border-[4px] border-tan h-44 w-44 rounded-3xl">
            <img
              src={
                book?.author?.author_image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className="object-cover object-top w-full h-full rounded-3xl"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center gap-3 mb-2">
            <h1 className="text-cream">
              {" "}
              <b className="text-[0.9rem]"> Name:</b> {book?.author?.author_name}
            </h1>
            <div className="flex items-center gap-1 border-2 border-tan  p-1 px-3 rounded-t-2xl">
              <Ratings ratings={book?.author?.author_rating} />
              <span className="text-cream">
                {book?.author?.author_rating}
              </span>
            </div>
          </div>
          <p className="text-center text-cream">
            <b className="text-[0.9rem]">Short Intro:</b>{" "}
            <motion.span
              key={isReadMore ? "more" : "less"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isReadMore
                ? book?.author?.author_description
                : book?.author?.author_description?.length > 50
                  ? `${book?.author?.author_description?.slice(0, 50)}...`
                  : book?.author?.author_description}
            </motion.span>
            {book?.author?.author_description?.length > 50 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReadMore(!isReadMore);
                }}
                className="pl-1 text-xs text-cream cursor-pointer hover:underline inline-block"
              >
                {isReadMore ? "Show less" : "Read more"}
              </span>
            )}
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/nextChapter/author/${book?.author?.author_id}`);
              }}
              className="w-full flex items-center justify-center gap-2 group"
            >
              <HiOutlineEye className="text-base group-hover:scale-110 transition-transform duration-300" />
              View Profile
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="image w-[60%] md:w-[90%] mx-auto pt-8 h-[15rem]">
        <img
          onClick={() => navigate(`/nextChapter/book/${book?.book_id}`)}
          className="object-contain w-full h-full cursor-pointer"
          src={book?.images?.[0]}
          alt=""
        />
      </div>
      <div className="px-4 text-xl">
        <div className="text-xl">
          <div className="flex items-center justify-between">
            <h2 className="mr-2 text-cream text-lg font-semibold truncate md:text-xl">
              {book?.title}
            </h2>
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                if (!loading) handleLike(book?.book_id, userData?.userId);
              }}
              className="cursor-pointer"
            >
              <motion.div
                animate={{
                  scale: isLiked ? [1, 1.2, 1] : 1,
                  color: isLiked ? "#ef4444" : "#ffe6c1",
                }}
                transition={{ duration: 0.5 }}
              >
                <FaHeart
                  className={`${isLiked ? "text-red-500" : "text-cream"}`}
                />
              </motion.div>

              {isLiked && (
                <FloatingReaction Icon={FaHeart} activeText="text-red-400" />
              )}
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-cream/80 md:text-lg">
          {book?.description?.slice(0, 50)}...
        </p>

        <div className="flex gap-4 mt-3 text-sm md:text-lg">
          <p className="font-medium text-cream/70 line-through">
            ₹ {Number(book?.book_price) * 2}
          </p>
          <p className="font-bold text-cream">
            ₹ {Number(book?.book_price)}
          </p>
        </div>
      </div>
      <div className="bottom flex rounded-b-2xl justify-between items-center backdrop-blur-md mt-2 bg-tan/10 p-4 border-t border-tan/10">
        <button
          onClick={(e) => e.stopPropagation()}
          className="px-4 flex gap-2 active:scale-75 transition items-center py-2 font-semibold text-cream bg-tan/20 rounded-xl group hover:bg-tan/30 border border-tan/20"
        >
          <MdOutlineAddShoppingCart className="group-hover:-rotate-12 duration-300 text-[22px]" />
          <span className="text-sm">Add</span>
        </button>

        <div className="flex items-center text-cream">
          <span className="mr-2 text-[14px] sm:text-sm font-bold">4.5</span>
          <Ratings ratings={book?.book_rating} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;


