import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { mockBooks } from "../../Data/mockData";
import BookCard from "../components/Cards/BookCard";
import ScrollBooks from "./../components/ScrollingContainer/ScrollBooks";

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    rating: 5,
    date: "2023-10-15",
    title: "Absolutely loved it!",
    comment:
      "This book exceeded all my expectations. The storytelling is captivating and the characters are well-developed. Couldn't put it down!",
  },
  {
    id: 2,
    user: {
      name: "Sarah Miller",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    rating: 4,
    date: "2023-09-28",
    title: "Great read",
    comment:
      "Really enjoyed this book. The plot twists kept me engaged throughout. Only reason for 4 stars is the slow start.",
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    rating: 5,
    date: "2023-08-10",
    title: "Masterpiece",
    comment:
      "One of the best books I've read this year. The author's writing style is impeccable and the themes are thought-provoking.",
  },
  {
    id: 4,
    user: {
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    rating: 3,
    date: "2023-07-22",
    title: "Good but not great",
    comment:
      "It was an enjoyable read but I found some parts predictable. Still worth reading though.",
  },
];

// Static additional product images
const additionalProductImages = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
];

const SingleBooks = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [allImages, setAllImages] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  });
  const prevQuantityRef = useRef(quantity);

  useEffect(() => {
    const foundBook = mockBooks.find((book) => book.book_id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
      const combinedImages = [...foundBook.images, ...additionalProductImages];
      setAllImages(combinedImages);
      setMainImage(combinedImages[0]);
    }
  }, [id]);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-2xl text-[#5C4C49]">Loading...</div>
      </div>
    );
  }

  // Animation for button press
  const buttonTap = {
    scale: 0.95,
    transition: { duration: 0.1 },
  };

  const handleImageChange = (img) => {
    setMainImage(img);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      prevQuantityRef.current = quantity;
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      prevQuantityRef.current = quantity;
      setQuantity(quantity - 1);
    }
  };

  // Directional animation variants
  const quantityVariants = {
    increase: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.1 },
    },
    decrease: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.1 },
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  // Determine animation direction
  const getAnimationDirection = () => {
    return quantity > prevQuantityRef.current ? "increase" : "decrease";
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Handle review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: {
        name: "You",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      title: newReview.title,
      comment: newReview.comment,
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, title: "", comment: "" });
  };

  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  /*  const relatedBooks = mockBooks
    .filter(
      (b) =>
        b.author.author_id === book.author.author_id &&
        b.book_id !== book.book_id
    )
    .slice(0, 5); */

  const relatedBooks = mockBooks.slice(5, 17);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-12 mx-auto max-w-7xl"
    >
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center mb-6 text-sm text-gray-500"
      >
        <span className="hover:text-[#5C4C49] cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="hover:text-[#5C4C49] cursor-pointer">Books</span>
        <span className="mx-2">/</span>
        <span className="hover:text-[#5C4C49] cursor-pointer">
          {book.category}
        </span>
        <span className="mx-2">/</span>
        <span className="text-[#5C4C49] font-medium">{book.title}</span>
      </motion.div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Book Images */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl overflow-hidden mb-4 border border-[#EDE7DC]"
          >
            <img
              src={mainImage}
              alt={book.title}
              className="w-full h-[600px] object-contain rounded-3xl p-8"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 px-1 py-2 overflow-x-auto hideScroll"
          >
            {allImages.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleImageChange(img)}
                className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 ${
                  mainImage === img ? "border-[#5C4C49]" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-24 h-24"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Book Details */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#EDE7DC]"
          >
            <div className="flex items-start justify-between mb-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-[#F3E9D9] text-[#5C4C49] text-xs px-2 py-1 rounded-full">
                  {book.category}
                </span>
                <h1 className="text-3xl font-bold text-[#5C4C49] mt-2 mb-1">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600">
                  by {book.author.author_name}
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center bg-[#F8F5F0] px-3 py-1 rounded-full"
              >
                <svg
                  className="w-5 h-5 mr-1 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[#5C4C49] font-medium">
                  {book.author.author_rating}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="my-6"
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl font-bold text-[#5C4C49] mr-3">
                  ₹{book.book_price.toFixed(2)}
                </span>
                <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded">
                  In Stock
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Inclusive of all taxes | Free delivery
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="relative mb-6">
              <div className="flex relative border-b border-[#EDE7DC]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 font-medium text-sm sm:text-base ${
                      activeTab === tab.id
                        ? "text-[#5C4C49]"
                        : "text-gray-500 hover:text-[#5C4C49]/80"
                    } transition-colors duration-200`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 rounded-full h-1 bg-[#5C4C49]"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          bounce: 0.5,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "description" ? (
                <>
                  <p className="mb-6 leading-relaxed text-gray-700">
                    {book.description}
                  </p>

                  {/* Author Card */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#F8F5F0] rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-[#D3BD9D]">
                        <img
                          src={book.author.author_image_url}
                          alt={book.author.author_name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#5C4C49]">
                          {book.author.author_name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {book.author.author_books_count} books published
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">
                      {book.author.author_description}
                    </p>
                  </motion.div>
                </>
              ) : (
                <div className="space-y-6">
                  {/* Review Summary */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#F8F5F0] rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-4xl text-center font-bold text-[#5C4C49]">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex mt-1">
                          {renderStars(Math.round(averageRating))}
                        </div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = reviews.filter(
                            (r) => r.rating === star
                          ).length;
                          const percentage = (count / reviews.length) * 100;
                          return (
                            <div key={star} className="flex items-center mb-1">
                              <p className="text-sm w-9 text-gray-6r00 text-nowrap">
                                {star} star{parseInt(star) > 1 ? "s" : ""}
                              </p>
                              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: 0.4 + (5 - star) * 0.1 }}
                                  className="h-full bg-yellow-400 rounded-full"
                                />
                              </div>
                              <span className="w-8 text-sm text-gray-600">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-white border border-[#EDE7DC] rounded-lg p-4"
                      >
                        <div className="flex items-center mb-3">
                          <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className="w-10 h-10 mr-3 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium text-[#5C4C49]">
                              {review.user.name}
                            </h4>
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="mb-2 text-lg font-semibold">
                          {review.title}
                        </h5>
                        <p className="text-gray-700">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Form */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 0.3,
                    }}
                    className="bg-white border border-[#EDE7DC] rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-6">
                      <svg
                        className="w-6 h-6 text-[#EAB308] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-[#5C4C49]">
                        Share Your Experience
                      </h3>
                    </div>

                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-6">
                        <label className="block mb-3 font-medium text-gray-700">
                          How would you rate this product?
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setNewReview({ ...newReview, rating: star })
                              }
                              className="transition-transform focus:outline-none"
                            >
                              <svg
                                className={`w-8 h-8 ${
                                  star <= newReview.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                } transition-colors duration-200`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block mb-3 font-medium text-gray-700">
                          Review Title
                        </label>
                        <motion.div whileFocusWithin={{ scale: 1.01 }}>
                          <input
                            type="text"
                            value={newReview.title}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                title: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-[#EDE7DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent transition"
                            placeholder="Summarize your experience"
                            required
                          />
                        </motion.div>
                      </div>

                      <div className="mb-6">
                        <label className="block mb-3 font-medium text-gray-700">
                          Your Review
                        </label>
                        <motion.div whileFocusWithin={{ scale: 1.01 }}>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                comment: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-[#EDE7DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4C49] focus:border-transparent transition"
                            rows="5"
                            placeholder="Share details about your experience with this product..."
                            required
                          />
                        </motion.div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-[#5C4C49] to-[#3E3432] text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition-all"
                      >
                        Submit Review
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Quantity Selector */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-[#5C4C49] mb-3">
                Quantity
              </h3>
              <div className="flex items-center w-40">
                <button
                  onClick={decrementQuantity}
                  className="px-4 h-10 w-10 pb-2 flex justify-center items-center text-4xl bg-[#D3BD9D] text-[#fff] hover:bg-[#c5ae8d] transition rounded-l-full"
                >
                  -
                </button>
                <div className="w-[3rem] relative border-y-2 border-[#D3BD9D] p h-10 text-center">
                  <AnimatePresence
                    mode="popLayout"
                    custom={getAnimationDirection()}
                  >
                    <motion.span
                      key={quantity}
                      custom={getAnimationDirection()}
                      variants={quantityVariants}
                      initial={getAnimationDirection()}
                      animate="enter"
                      exit={getAnimationDirection()}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  onClick={incrementQuantity}
                  className="px-4 h-10 pb-1 w-10 flex justify-center items-center text-2xl text-white bg-[#D3BD9D] hover:bg-[#c5ae8d] transition rounded-r-full"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#5C4C49] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#4a3d3b] transition flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#D3BD9D] text-[#5C4C49] py-3 px-6 rounded-lg font-medium hover:bg-[#c5ae8d] transition flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Buy Now
              </motion.button>
            </motion.div>

            {/* Delivery Info */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 border-t border-[#EDE7DC] pt-4"
            >
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-[#5C4C49] mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-[#5C4C49]">
                    Delivery Information
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Free standard delivery on orders over ₹500. Expected
                    delivery in 3-5 business days.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* More Details Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-[#EDE7DC]"
      >
        <h2 className="text-2xl font-bold text-[#5C4C49] mb-6">
          Product Details
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-[#5C4C49] mb-3">
              Specifications
            </h3>
            <ul className="space-y-2">
              <li className="flex">
                <span className="w-32 text-gray-600">Publisher</span>
                <span className="text-[#5C4C49]">Penguin Random House</span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-600">Language</span>
                <span className="text-[#5C4C49]">English</span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-600">Paperback</span>
                <span className="text-[#5C4C49]">320 pages</span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-600">ISBN-10</span>
                <span className="text-[#5C4C49]">1234567890</span>
              </li>
              <li className="flex">
                <span className="w-32 text-gray-600">Dimensions</span>
                <span className="text-[#5C4C49]">13.97 x 1.85 x 21.59 cm</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#5C4C49] mb-3">
              About the Book
            </h3>
            <p className="mb-4 text-gray-700">
              {book.description} This special edition includes bonus content and
              a foreword by the author.
            </p>
            <div className="bg-[#F8F5F0] p-3 rounded-lg">
              <h4 className="font-medium text-[#5C4C49] mb-1">
                Why you'll love it:
              </h4>
              <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                <li>Beautifully designed cover</li>
                <li>Premium quality paper</li>
                <li>Perfect gift for book lovers</li>
                <li>Collector's edition</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related Books Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-[#5C4C49] mb-6">
          {/*  More by {book.author.author_name} */}
          Related Books
        </h2>
        <div className="">
          <ScrollBooks autoScroll={false} books={relatedBooks} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SingleBooks;
/* 
  useEffect(() => {
    getSingleBook(id);
  }, []);

*/
