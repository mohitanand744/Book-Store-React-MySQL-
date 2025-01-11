import React from "react";
import HomeBanner from "../components/Banners/HomeBanner";
import SearchBooks from "../components/SearchBars/SearchBooks";

const Home = () => {
  return (
    <div>
      <div className="search">
        <SearchBooks
          styling="w-full  block md:hidden"
          inputStylrs="rounded-[0px]"
        />
      </div>
      <HomeBanner />
    </div>
  );
};

export default Home;
