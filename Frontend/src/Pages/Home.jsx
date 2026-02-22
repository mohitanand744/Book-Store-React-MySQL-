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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BooksLoader from "../components/Loaders/BooksLoader";
import Button from "../components/Buttons/Button";
import { mockBooks } from "../../Data/mockData";
import { useLoader } from "../Hooks/useLoader";
import { toast } from "sonner";

const Home = () => {
  const { loading } = useLoader();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const provider = searchParams.get("loginProvider");

    if (provider === "google") {
      toast.success("Successfully logged in with Google");

      // remove query params from URL
      navigate(window.location.pathname, { replace: true });
    }
  }, []);
  /*   const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const removeDuplicates = (booksArray) => {
    const uniqueBooks = [];
    const seen = new Set();

    for (const book of booksArray) {
      const uniqueKey = book.title; 
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        uniqueBooks.push(book);
      }
    }

    return uniqueBooks;
  };

  const uniqueBooks = books?.books ? removeDuplicates(books.books) : []; */
  console.log("Loader :", loading);

  const books = mockBooks;
  const uniqueBooks = books;
  const error = null;

  return (
    <div className="">
      <div className="search">
        <SearchBooks
          styling="w-full block md:hidden"
          inputStylrs="rounded-[0px] py-4"
          iconStyles="top-3 right-3"
        />
      </div>
      <HomeBanner />
      <div className="mx-auto w-[97%]">
        <div className="mb-14">
          <h1 className="relative mx-auto my-5 text-2xl font-semibold text-center w-fit md:text-4xl ">
            Deal of the day <CountdownTimer   />
          </h1>

          {loading ? (
            <BooksLoader />
          ) : error ? (
            <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
          ) : (
            <ScrollBooks books={uniqueBooks} />
          )}
        </div>

        <div className="mb-14">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Explore Your Favorite Books
          </h1>

          {loading ? (
            <BooksLoader />
          ) : error ? (
            <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
          ) : (
            <ScrollBooks
              autoScroll={false}
              books={uniqueBooks.slice(5, uniqueBooks.length)}
            />
          )}

          <div className="flex justify-center my-5">
            <Link to={"/nextChapter/books"}>
              <Button variant="primary">View All</Button>
            </Link>
          </div>
        </div>

        <div className="mb-14">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Find Your Favorite Author
          </h1>
          {loading ? (
            <BooksLoader />
          ) : error ? (
            <ShowErrors text={error || "Sorry we are Unable Fetch Books"} />
          ) : (
            <AuthorSlider books={uniqueBooks} />
          )}
        </div>

        <div className="container">
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
