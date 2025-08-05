import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiX,
  FiShoppingBag,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import { FaHeart, FaBookOpen } from "react-icons/fa";
import { mockBooks } from "../../Data/mockData";
import BookCard from "../components/Cards/BookCard";
import Banners from "./../components/Banners/Banners";
import SearchBooks from "../components/SearchBars/SearchBooks";

const Wishlist = () => {
  const [books, setBooks] = useState([
    {
      id: "1",
      title: "The Silent Grove",
      author: "Martha Wells",
      price: 24.99,
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      liked: true,
      genre: "Fantasy",
      rating: 4.5,
    },
    {
      id: "2",
      title: "Architecture of Tomorrow",
      author: "James Clear",
      price: 29.99,
      coverImage:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      liked: true,
      genre: "Non-Fiction",
      rating: 4.2,
    },
    {
      id: "3",
      title: "Desert Storms",
      author: "Elena Ferrante",
      price: 19.99,
      coverImage:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      liked: true,
      genre: "Adventure",
      rating: 4.7,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const toggleLike = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, liked: !book.liked } : book
      )
    );
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#5C4C49]"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </motion.div>

              {/* Count with gradient text */}
              <div className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C4C49] to-[#D3BD9D] font-bold text-lg">
                  {mockBooks.length}
                </span>
                <span className="text-[#5C4C49]/80 ml-1">
                  {mockBooks.length === 1 ? "book" : "books"} saved
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
            {mockBooks?.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                className=""
              >
                <BookCard book={book} key={book.book_id} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {mockBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="py-16 text-center"
          >
            <div className="mx-auto w-24 h-24 bg-[#D3BD9D] rounded-full flex items-center justify-center mb-6">
              <FiHeart className="text-4xl text-[#5C4C49]" />
            </div>
            <h3 className="text-xl font-medium text-[#5C4C49] mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-[#5C4C49]/80 mb-6">
              Start saving your favorite books!
            </p>
            <button className="bg-[#5C4C49] text-[#FFE6C1] px-6 py-3 rounded-lg hover:bg-[#5C4C49]/90 transition-colors flex items-center mx-auto">
              Browse Books <FiChevronRight className="ml-2" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
