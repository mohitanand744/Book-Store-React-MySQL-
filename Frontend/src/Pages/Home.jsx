import React from "react";
import HomeBanner from "../components/Banners/HomeBanner";
import SearchBooks from "../components/SearchBars/SearchBooks";

import CountdownTimer from "../components/OfferCounter/OfferCounter";
import ScrollBooks from "../components/BooksScrollingContainer/ScrollBooks";
import AuthorSlider from "../components/BooksScrollingContainer/AuthorSlider";

const Home = () => {
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

          <ScrollBooks />
        </div>

        <div className="">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Explore Your Favorite Books
          </h1>

          <ScrollBooks autoScroll={false} />
        </div>
        <div className="">
          <h1 className="my-5 text-2xl font-semibold text-center md:text-4xl ">
            Find Your Favorite Author
          </h1>

          <AuthorSlider />
        </div>
      </div>
    </div>
  );
};

export default Home;
