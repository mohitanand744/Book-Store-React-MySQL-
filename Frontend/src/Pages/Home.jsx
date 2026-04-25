import React, { useEffect } from "react";
import HomeBanner from "../components/Banners/HomeBanner";
import Search from "../components/SearchBars/Search";

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
import SectionHeading from "../components/Headings/SectionHeading";

import { useLoader } from "../Hooks/useLoader";
import { toast } from "sonner";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const provider = searchParams.get("loginProvider");
    const isNewUser = searchParams.get("isNewUser") === "true";
    const accountLinked = searchParams.get("accountLinked") === "true";

    if (provider === "google") {
      let message = "Successfully logged in with Google";
      if (isNewUser) {
        message = "Successfully signed up with Google";
      } else if (accountLinked) {
        message = "Your Google account has been successfully linked.";
      }

      toast.success(message);

      navigate(window.location.pathname, { replace: true });
    }
  }, []);
  const dispatch = useDispatch();
  const { books, error, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <div className="">
      <div className="search">
        <Search
          styling="w-full block md:hidden"
          inputStylrs="rounded-[0px] py-4"
          iconStyles="top-3 right-3"
        />
      </div>
      <HomeBanner />
      <div className="mx-auto w-[97%]">
        {loading ? (
          <div className="py-20 flex items-center justify-center min-h-[40vh]">
            <BooksLoader />
          </div>
        ) : (
          <>
            <div className="mb-14">
              <SectionHeading subtitle="Limited Time Offer">
                Deal of the day
              </SectionHeading>
              <CountdownTimer />
              <ScrollBooks books={books} />
            </div>

            <div className="mb-14">
              <SectionHeading subtitle="Our Most Loved Books">
                Top Sellers
              </SectionHeading>
              <ScrollBooks autoScroll={false} books={books} />
              <div className="flex justify-center my-5">
                <Link to={"/nextChapter/books"}>
                  <Button variant="primary">View All</Button>
                </Link>
              </div>
            </div>

            <div className="mb-14 ">
              <SectionHeading subtitle="Discover Great Minds">
                Find Your Favorite Author
              </SectionHeading>
              <AuthorSlider books={books} />
              <div className="flex justify-center my-5">
                <Link to={"/nextChapter/authors"}>
                  <Button variant="primary">View All Authors</Button>
                </Link>
              </div>
            </div>

            <div className="container">
              <SectionHeading subtitle="Testimonials">
                What Our Readers Say About Us
              </SectionHeading>
              <ReviewsContainer />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;


