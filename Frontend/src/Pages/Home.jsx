import React, { useEffect } from "react";
import HomeBanner from "../components/Banners/HomeBanner";
import SearchBooks from "../components/SearchBars/SearchBooks";

import CountdownTimer from "../components/OfferCounter/OfferCounter";
import ScrollBooks from "../components/ScrollingContainer/ScrollBooks";
import AuthorSlider from "../components/ScrollingContainer/AuthorSlider";
import ReviewsContainer from "../components/ScrollingContainer/ReviewsContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks } from "../store/Redux/Slices/BooksSlice";
import ShowErrors from "../components/Errors/ShowErrors";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  // Remove duplicates based on a unique property (e.g., book id or title)
  const removeDuplicates = (booksArray) => {
    const uniqueBooks = [];
    const seen = new Set();

    for (const book of booksArray) {
      const uniqueKey = book.book_id || book.title; // Replace with the property that uniquely identifies a book
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueBooks.push(book);
      }
    }

    return uniqueBooks;
  };

  const uniqueBooks = books?.books ? removeDuplicates(books.books) : [];

  return (
    <div className="">
      <div className="search">
        <SearchBooks
          styling="w-full  block md:hidden"
          inputStylrs="rounded-[0px] py-4"
          iconStyles="top-3 right-3"
        />
      </div>
      <HomeBanner />
      <div className="mx-auto w-[97%]">
        <div className="">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Deal of the day
            <CountdownTimer />
          </h1>

          {loading ? (
            <center>
              <img
                className="w-28"
                src="https://icon-library.com/images/progress-icon-gif/progress-icon-gif-1.jpg"
                alt=""
              />
            </center>
          ) : error ? (
            <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
          ) : (
            <ScrollBooks books={uniqueBooks} />
          )}
        </div>

        <div className="">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Explore Your Favorite Books
          </h1>

          {loading ? (
            <center>
              <img
                className="w-28"
                src="https://icon-library.com/images/progress-icon-gif/progress-icon-gif-1.jpg"
                alt=""
              />
            </center>
          ) : error ? (
            <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
          ) : (
            <ScrollBooks autoScroll={false} books={uniqueBooks.slice(25)} />
          )}

          <div className="flex justify-center my-5">
            <Link to={"/bookstore/books"}>
              <button className="px-10 py-2 text-white bg-[#5c4c49] hover:bg-[#D3BD9D] hover:scale-105 transition duration-200 active:scale-95 font-semibold rounded-2xl">
                View All
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Find Your Favorite Author
          </h1>
          {loading ? (
            <center>
              <img
                className="w-28"
                src="https://icon-library.com/images/progress-icon-gif/progress-icon-gif-1.jpg"
                alt=""
              />
            </center>
          ) : error ? (
            <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
          ) : (
            <AuthorSlider books={uniqueBooks} />
          )}
        </div>

        <div className="">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            What Our Readers Say About Us
          </h1>
          <ReviewsContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
