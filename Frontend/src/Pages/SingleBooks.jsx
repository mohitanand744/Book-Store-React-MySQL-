import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import BookCard from "../components/Cards/BookCard";
import ScrollBooks from "./../components/ScrollingContainer/ScrollBooks";
import QuantitySelector from "../components/QuantitySelector";
import Input from "../components/Inputs/Input";
import Button from "../components/Buttons/Button";
import SectionHeading from "../components/Headings/SectionHeading";

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
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

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

  useEffect(() => {
    if (books?.length === 0) {
      dispatch(fetchAllBooks());
    }
  }, [dispatch, books]);

  useEffect(() => {
    if (books?.length > 0) {
      const foundBook = books.find((book) => book.book_id === parseInt(id));
      if (foundBook) {
        setBook(foundBook);
        const combinedImages = [
          foundBook.images?.[0] || foundBook.image,
          ...additionalProductImages
        ];
        setAllImages(combinedImages);
        setMainImage(combinedImages[0]);
      }
    }
  }, [id, books]);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-2xl text-coffee">Loading...</div>
      </div>
    );
  }

  const handleImageChange = (img) => {
    setMainImage(img);
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

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
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      const isFull = starValue <= rating;
      const isHalf = starValue - 0.5 <= rating && !isFull;

      return (
        <div key={i} className="relative">
          <svg
            className={`w-5 h-5 ${isFull ? "text-yellow-400" : "text-tan/20"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {isHalf && (
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>
      );
    });
  };

  const relatedBooks = books || [];

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
        className="flex items-center mb-8 text-xs uppercase tracking-[0.2em] text-cream/90 font-medium"
      >
        <span className="hover:text-coffee transition-colors cursor-pointer">Home</span>
        <span className="mx-3 opacity-30">/</span>
        <span className="hover:text-coffee transition-colors cursor-pointer">Books</span>
        <span className="mx-3 opacity-30">/</span>
        <span className="hover:text-coffee transition-colors cursor-pointer">
          {book?.category}
        </span>
        <span className="mx-3 opacity-30">/</span>
        <span className="text-coffee tracking-normal font-serif lowercase italic">{book?.title}</span>
      </motion.div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Book Images */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="bg-coffee/95 text-cream rounded-[2.5rem] overflow-hidden mb-4 border border-tan/20 shadow-2xl backdrop-blur-xl"
          >
            <img
              src={mainImage}
              alt={book?.title}
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
                className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 ${mainImage === img ? "border-coffee" : "border-transparent"
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
            className="bg-coffee/95 text-cream rounded-[2.5rem] p-8 shadow-2xl border border-tan/20 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-tan/10 text-tan text-xs px-3 py-1 rounded-full border border-tan/20">
                  {book?.category}
                </span>
                <h1 className="text-3xl font-serif tracking-tight text-cream mt-3 mb-1">
                  {book?.title}
                </h1>
                <p className="text-cream/90 mt-2 font-serif italic text-lg">
                  Explore more titles from similar categories and authors
                </p>
                <span className="text-cream font-bold not-italic hover:underline cursor-pointer">
                  {book?.author?.author_name}
                </span>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center  px-3 py-1 rounded-full"
              >
                <svg
                  className="w-5 h-5 mr-1 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-cream font-medium">
                  {book?.author?.author_rating}
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
                <p className="font-medium text-cream/90 line-through mr-3">
                  ₹ {Number(book?.book_price) * 2}
                </p>
                <span className="text-4xl font-serif text-cream mr-3">
                  ₹{Number(book?.book_price || 0).toFixed(2)}
                </span>
                <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded">
                  In Stock
                </span>
              </div>
              <p className="text-sm text-cream/90">
                Inclusive of all taxes | Free delivery
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="relative mb-6">
              <div className="flex relative border-b border-tan/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 font-medium text-sm sm:text-base ${activeTab === tab.id
                      ? "text-cream"
                      : "text-cream/90 hover:text-cream"
                      } transition-colors duration-200`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 rounded-full h-1 bg-tan"
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
                  <div className="prose prose-invert max-w-none">
                    <p className="text-cream leading-relaxed text-lg">
                      {book?.book_description || book?.description}
                    </p>
                  </div>

                  {/* Author Card */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className=" rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-tan">
                        <img
                          src={book?.author?.author_image_url}
                          alt={book?.author?.author_name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl text-cream">
                          {book?.author?.author_name}
                        </h4>
                        <p className="text-sm text-cream/90 uppercase tracking-widest mt-1">
                          {book?.author?.author_books_count} books published
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-cream/90 leading-relaxed italic">
                      {book?.author?.author_description}
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
                    className=" rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-4xl text-center font-serif text-cream">
                          {Number(averageRating || 0).toFixed(1)}
                        </div>
                        <div className="flex mt-1">
                          {renderStars(Math.round(averageRating))}
                        </div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = reviews.filter(
                            (r) => r.rating === star,
                          ).length;
                          const percentage = (count / reviews.length) * 100;
                          return (
                            <div key={star} className="flex items-center mb-1">
                              <p className="text-sm w-9 text-cream/90 text-nowrap">
                                {star} star{parseInt(star) > 1 ? "s" : ""}
                              </p>
                              <div className="flex-1 h-2 mx-2 bg-tan/10 rounded-full">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ delay: 0.4 + (5 - star) * 0.1 }}
                                  className="h-full bg-yellow-400 rounded-full"
                                />
                              </div>
                              <span className="w-8 text-sm text-cream/90">
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
                        className="bg-coffee/40 text-cream border border-tan/10 backdrop-blur-sm rounded-2xl p-6"
                      >
                        <div className="flex items-center mb-3">
                          <img
                            src={review.user.avatar}
                            alt={review.user.name}
                            className="w-10 h-10 mr-3 rounded-full"
                          />
                          <div>
                            <h4 className="font-serif text-lg text-cream">
                              {review.user.name}
                            </h4>
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-tan/40 tracking-wider font-serif">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="mb-2 text-lg font-serif italic text-cream/90">
                          {review.title}
                        </h5>
                        <p className="text-cream/90 leading-relaxed font-serif">{review.comment}</p>
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
                    className="bg-coffee/95 text-cream border border-tan/20 rounded-[2.5rem] p-8 mb-6 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center mb-6">
                      <svg
                        className="w-6 h-6  mr-2"
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
                      <h3 className="text-2xl font-serif tracking-wide text-cream">
                        Share Your Experience
                      </h3>
                    </div>

                    <form onSubmit={handleReviewSubmit}>
                      <div className="flex flex-col sm:flex-row gap-6 mb-6">
                        <div className="sm:w-48">
                          <Input
                            label="Rating (0.5 - 5)"
                            labelClassName="font-serif text-lg text-cream/90"
                            type="number"
                            min="0.5"
                            max="5"
                            step="0.5"
                            placeholder="e.g. 4.5"
                            value={newReview.rating}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                rating: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="!bg-tan/5 !border-tan/10 !text-cream !rounded-2xl !px-6 !py-4 focus:!ring-tan/30 h-auto w-full"
                            required
                          />
                          <div className="flex gap-1 mt-2 px-1">
                            {renderStars(newReview.rating)}
                          </div>
                        </div>

                        <Input
                          label="Review Title"
                          labelClassName="font-serif text-lg text-cream/90"
                          placeholder="Summarize your experience"
                          value={newReview.title}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              title: e.target.value,
                            })
                          }
                          className="!bg-tan/5 !border-tan/10 !text-cream !rounded-2xl !px-6 !py-4 focus:!ring-tan/30 h-auto flex-1"
                          required
                        />
                      </div>

                      <Input
                        as="textarea"
                        label="Your Review"
                        labelClassName="font-serif text-lg text-cream/90"
                        placeholder="Share details about your experience with this product..."
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            comment: e.target.value,
                          })
                        }
                        rows={5}
                        className="!bg-tan/5 !border-tan/10 !text-cream !rounded-2xl !px-6 !py-4 focus:!ring-tan/30 h-auto"
                        required
                      />

                      <Button
                        type="submit"
                        variant="outline"
                        isSerif
                        className="w-full !rounded-2xl !py-4 !text-lg tracking-wide"
                      >
                        Submit Review
                      </Button>
                    </form>
                  </motion.div>
                </div>
              )}
            </motion.div>

            <div className="my-3">
              <QuantitySelector
                initialQuantity={quantity}
                onChange={setQuantity}
              />
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col mt-5 gap-4 sm:flex-row"
            >
              <Button
                variant="primary"
                isSerif
                className="flex-1 !rounded-2xl !py-4 !text-lg flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
              </Button>
              <Button
                variant="outline"
                isSerif
                className="flex-1 !rounded-2xl !py-4 !text-lg flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
              </Button>
            </motion.div>

            {/* Delivery Info */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 border-t border-tan/10 pt-6"
            >
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-cream mr-3 mt-1"
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
                  <h4 className="font-serif text-lg text-cream">
                    Delivery Information
                  </h4>
                  <p className="mt-2 text-sm text-cream/90 font-serif leading-relaxed">
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
        className="mt-12 bg-coffee/95 text-cream rounded-[2.5rem] p-10 shadow-2xl border border-tan/20 backdrop-blur-xl"
      >
        <h2 className="text-3xl font-serif tracking-wide text-cream mb-8">
          Product Details
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-serif text-tan/90 mb-4 border-b border-tan/10 pb-2">
              Specifications
            </h3>
            <ul className="space-y-2">
              <li className="flex">
                <p className="text-tan/50 w-44 font-serif">Publisher</p>
                <p className="w-44 text-cream">Penguin Random House</p>
              </li>
              <li className="flex">
                <p className="text-tan/50 w-44 font-serif">Language</p>
                <p className="w-44 text-cream">English</p>
              </li>
              <li className="flex">
                <p className="text-tan/50 w-44 font-serif">Paperback</p>
                <p className="w-44 text-cream">320 pages</p>
              </li>
              <li className="flex">
                <p className="text-tan/50 w-44 font-serif">ISBN-10</p>
                <p className="w-44 text-cream">1234567890</p>
              </li>
              <li className="flex">
                <p className="text-tan/50 w-44 font-serif">Dimensions</p>
                <p className="w-44 text-cream">13.97 x 1.85 x 21.59 cm</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif text-tan/90 mb-4 border-b border-tan/10 pb-2">
              About the Book
            </h3>
            <p className="mb-6 text-tan/70 leading-relaxed font-serif italic">
              {book?.description} This special edition includes bonus content and
              a foreword by the author.
            </p>
            <div className=" p-3 rounded-lg">
              <h4 className="font-serif text-lg text-cream/90 mb-2">
                Why you'll love it:
              </h4>
              <ul className="space-y-2 text-sm text-cream/90 list-disc list-inside font-serif">
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
        className="mt-20 border-t border-tan/10 pt-16"
      >
        <div className="mb-2">
          <SectionHeading
            align="left"
            subtitle={`Discover more from ${book?.author?.author_name}`}
          >
            More by this Author
          </SectionHeading>
        </div>

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


