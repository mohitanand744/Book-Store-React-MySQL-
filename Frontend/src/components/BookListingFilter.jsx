import React, { useState } from "react";
import DualRangeSlider from "../components/Inputs/DualRangeSlider";
import Checkbox from "../components/Inputs/Checkbox";
import { motion } from "framer-motion";

const BookListingFilter = ({
  openCategory,
  setOpenCategory,
  filters,
  setFilters,
}) => {
  const handleDiscountChange = (discountValue) => {
    setFilters((prev) => ({
      ...prev,
      discount: prev.discount === discountValue ? "" : discountValue,
    }));
  };

  const handleLanguageChange = (languageValue) => {
    setFilters((prev) => ({
      ...prev,
      language: prev.language === languageValue ? "" : languageValue,
    }));
  };

  return (
    <motion.div
      className={`hideScroll  overflow-y-scroll border bg-white z-[9999] sm:w-[20rem] overflow-hidden duration-300 mt-32 ease-in-out shadow-xl border-gray-200 rounded-3xl`}
    >
      {/* Price Filter Section */}
      <div className="p-5 border-b border-gray-200 shadow-lg rounded-3xl">
        <DualRangeSlider
          PriceFilter={openCategory.PriceFilter}
          setOpenCategory={setOpenCategory}
          filters={filters}
          setFilters={setFilters}
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
          animate={{ height: openCategory.DiscountFilter ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 overflow-hidden"
        >
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="all-discounts"
              label="All Discounts"
              checked={filters.discount === ""}
              onChange={() => handleDiscountChange("")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="under10"
              label="Up to 10% off"
              checked={filters.discount === "0-10"}
              onChange={() => handleDiscountChange("0-10")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="under20"
              label="10-20% off"
              checked={filters.discount === "10-20"}
              onChange={() => handleDiscountChange("10-20")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="under30"
              label="20-30% off"
              checked={filters.discount === "20-30"}
              onChange={() => handleDiscountChange("20-30")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="over30"
              label="30%+ off"
              checked={filters.discount === "30-100"}
              onChange={() => handleDiscountChange("30-100")}
            />
          </motion.li>
        </motion.ul>
      </div>

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
            <Checkbox
              id="Hindi"
              label="Hindi"
              checked={filters.language === "Hindi"}
              onChange={() => handleLanguageChange("Hindi")}
            />
          </motion.li>
          <motion.li whileHover={{ x: 5 }} className="flex items-center">
            <Checkbox
              id="English"
              label="English"
              checked={filters.language === "English"}
              onChange={() => handleLanguageChange("English")}
            />
          </motion.li>
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default BookListingFilter;
