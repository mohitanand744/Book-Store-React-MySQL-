import React, { useState } from "react";
import DualRangeSlider from "../components/Inputs/DualRangeSlider";
import Radio from "../components/Inputs/Radio";
import { motion } from "framer-motion";
import { defaultFilters } from "../Pages/AllBooks";

const BookListingFilter = ({
  openCategory,
  setOpenCategory,
  filters,
  setFilters,
}) => {
  const handleDiscountChange = (discountValue) => {
    setFilters((prev) => ({
      ...prev,
      discount: discountValue,
    }));
  };

  const handleLanguageChange = (languageValue) => {
    setFilters((prev) => ({
      ...prev,
      language: languageValue,
    }));
  };

  const resetFilters = (e) => {
    e.stopPropagation();
    setFilters(defaultFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={(e) => e.stopPropagation()}
      className={`hideScroll overflow-y-scroll border border-tan/30 bg-coffee/90 backdrop-blur-2xl text-cream z-[9999] sm:w-[22rem] overflow-hidden duration-300 mt-20 ease-in-out shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem]`}
    >
      {/* Panel Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between border-b border-tan/10">
        <div>
          <h2 className="text-2xl font-serif tracking-wide text-cream">Refine Search</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-cream mt-1">Filters & Preferences</p>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-medium px-4 py-2 rounded-full border border-tan/20 hover:bg-tan hover:text-coffee transition-all duration-300"
        >
          Reset
        </button>
      </div>

      <div className="px-2 py-4">
        {/* Price Filter Section */}
        <div className="mx-2 mb-2 bg-tan/5 rounded-[2rem] border border-tan/10 overflow-hidden transition-all duration-500">
          <DualRangeSlider
            PriceFilter={openCategory.PriceFilter}
            setOpenCategory={setOpenCategory}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Discount Filter Section */}
        <div className="mx-2 mb-2 bg-tan/5 rounded-[2rem] border border-tan/10 overflow-hidden transition-all duration-500">
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
            className="flex items-center justify-between p-5 cursor-pointer group hover:bg-tan/5 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-serif text-cream">Offers & Savings</span>
              <h1 className="text-lg font-medium leading-none mt-1">Discount Range</h1>
            </div>
            <motion.div
              animate={{ rotate: openCategory.DiscountFilter ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-tan/10 group-hover:bg-tan/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          <motion.ul
            initial={false}
            animate={{
              height: openCategory.DiscountFilter ? "auto" : 0,
              opacity: openCategory.DiscountFilter ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="px-6 pb-6 space-y-4 overflow-hidden"
          >
            {[
              { id: "all-discounts", label: "All Curated Offers", value: "" },
              { id: "under10", label: "Seasonal (Up to 10%)", value: "0-10" },
              { id: "under20", label: "Limited (10-20%)", value: "10-20" },
              { id: "under30", label: "Exclusive (20-30%)", value: "20-30" },
              { id: "over30", label: "Premium Savings (30%+)", value: "30-100" },
            ].map((opt) => (
              <motion.li key={opt.id} whileHover={{ x: 4 }} className="flex items-center">
                <Radio
                  id={opt.id}
                  label={opt.label}
                  checked={filters.discount === opt.value}
                  onChange={() => handleDiscountChange(opt.value)}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Language Filter Section */}
        <div className="mx-2 mb-2 bg-tan/5 rounded-[2rem] border border-tan/10 overflow-hidden transition-all duration-500">
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
            className="flex items-center justify-between p-5 cursor-pointer group hover:bg-tan/5 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-serif text-cream/90">Edition & Dialect</span>
              <h1 className="text-lg font-medium leading-none mt-1">Book Language</h1>
            </div>
            <motion.div
              animate={{ rotate: openCategory.LanguageFilter ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-tan/10 group-hover:bg-tan/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          <motion.ul
            initial={false}
            animate={{
              height: openCategory.LanguageFilter ? "auto" : 0,
              opacity: openCategory.LanguageFilter ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="px-6 pb-6 space-y-4 overflow-hidden"
          >
            {[
              { id: "Hindi", label: "Hindi Editions" },
              { id: "English", label: "English Editions" },
            ].map((lang) => (
              <motion.li key={lang.id} whileHover={{ x: 4 }} className="flex items-center">
                <Radio
                  id={lang.id}
                  label={lang.label}
                  checked={filters.language === lang.id}
                  onChange={() => handleLanguageChange(lang.id)}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
};

export default BookListingFilter;


