import React, { useState } from "react";
import DualRangeSlider from "../components/Inputs/DualRangeSlider";
import Checkbox from "../components/Inputs/Checkbox";
import { motion } from "framer-motion";

const BookListingFilter = ({ openCategory, setOpenCategory }) => {
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Technology",
    "Biography",
    "Self-Help",
    "Romance",
    "Mystery",
    "Thriller",
    "Fantasy",
    "Science Fiction",
    "Children's Books",
    "Poetry",
    "Adventure",
    "Drama",
    "Horror",
    "Comedy",
    "Action",
  ];

  const [discountFilter, setDiscountFilter] = useState({
    all: true,
    under10: false,
    under20: false,
    under30: false,
    over30: false,
  });

  const handleDiscountChange = (filter) => {
    if (filter === "all") {
      setDiscountFilter({
        all: true,
        under10: false,
        under20: false,
        under30: false,
        over30: false,
      });
    } else {
      setDiscountFilter((prev) => ({
        ...prev,
        all: false,
        [filter]: !prev[filter],
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`hideScroll overflow-y-scroll border bg-white z-[9999] sm:w-[20rem] overflow-hidden duration-300 mt-32 ease-in-out shadow-xl border-gray-200 rounded-3xl`}
    >
      {/* Price Filter Section */}
      <div className="p-5 border-b border-gray-200 shadow-lg rounded-3xl">
        <DualRangeSlider
          PriceFilter={openCategory.PriceFilter}
          setOpenCategory={setOpenCategory}
        />
      </div>

      {/* Discount Filter Section - New */}
      <div className="p-5 border-b-2 border-gray-200 shadow-lg rounded-3xl">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenCategory({
              PriceFilter: false,
              CategoryFilter: false,
              LanguageFilter: false,
              DiscountFilter: !openCategory.DiscountFilter,
            });
          }}
          className="flex items-center justify-between mb-2 p-3 bg-[#FFF5E4] rounded-lg cursor-pointer"
        >
          <h1 className="text-lg font-semibold">Discount Range</h1>
          <motion.img
            animate={{ rotate: openCategory.DiscountFilter ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-[1.5rem]"
            src="/images/right.png"
            alt=""
          />
        </div>

        <motion.ul
          initial={{ height: 0 }}
          animate={{
            height: openCategory.DiscountFilter ? "12rem" : "0rem",
          }}
          transition={{ duration: 0.3 }}
          className="space-y-2 overflow-hidden"
        >
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="all-discounts"
              label="All Discounts"
              checked={discountFilter.all}
              onChange={() => handleDiscountChange("all")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="under10"
              label="Up to 10% off"
              checked={discountFilter.under10}
              onChange={() => handleDiscountChange("under10")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="under20"
              label="10-20% off"
              checked={discountFilter.under20}
              onChange={() => handleDiscountChange("under20")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="under30"
              label="20-30% off"
              checked={discountFilter.under30}
              onChange={() => handleDiscountChange("under30")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="over30"
              label="30%+ off"
              checked={discountFilter.over30}
              onChange={() => handleDiscountChange("over30")}
            />
          </motion.li>
        </motion.ul>
      </div>

      {/* Category Filter Section */}
      <div className="p-5 border-b-2 border-gray-200 shadow-lg rounded-3xl">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenCategory({
              PriceFilter: false,
              CategoryFilter: !openCategory.CategoryFilter,
              LanguageFilter: false,
              DiscountFilter: false,
            });
          }}
          className="flex items-center justify-between mb-2 p-3 bg-[#FFF5E4] rounded-lg cursor-pointer"
        >
          <h1 className="text-lg font-semibold">Filter By Category</h1>
          <motion.img
            animate={{ rotate: openCategory.CategoryFilter ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-[1.5rem]"
            src="/images/right.png"
            alt=""
          />
        </div>

        <motion.ul
          initial={{ height: 0 }}
          animate={{
            height: openCategory.CategoryFilter ? "24rem" : "0rem",
          }}
          transition={{ duration: 0.3 }}
          className="space-y-2 overflow-y-auto max-h-[24rem]"
        >
          {categories.map((category) => (
            <motion.li
              key={category}
              whileHover={{ y: -3 }}
              className="flex items-center"
            >
              <Checkbox id={category} label={category} />
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Language Filter Section */}
      <div className="p-5 border-b-2 border-gray-200 shadow-lg rounded-3xl">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenCategory({
              PriceFilter: false,
              CategoryFilter: false,
              LanguageFilter: !openCategory.LanguageFilter,
              DiscountFilter: false,
            });
          }}
          className="flex items-center justify-between mb-2 p-3 bg-[#FFF5E4] rounded-lg cursor-pointer"
        >
          <h1 className="text-lg font-semibold">Filter By Language</h1>
          <motion.img
            animate={{ rotate: openCategory.LanguageFilter ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-[1.5rem]"
            src="/images/right.png"
            alt=""
          />
        </div>

        <motion.ul
          initial={{ height: 0 }}
          animate={{
            height: openCategory.LanguageFilter ? "4rem" : "0rem",
          }}
          transition={{ duration: 0.3 }}
          className="space-y-2 overflow-hidden"
        >
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox id="Hindi" label="Hindi" />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox id="English" label="English" />
          </motion.li>
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default BookListingFilter;
