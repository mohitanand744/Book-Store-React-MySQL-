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
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = (e) => {
    e.stopPropagation();
    setFilters(defaultFilters);
  };

  const toggleCategory = (cat) => {
    setOpenCategory((prev) => {
      const newState = {
        PriceFilter: false,
        CategoryFilter: false,
        LanguageFilter: false,
        DiscountFilter: false,
        AvailabilityFilter: false,
        BindingFilter: false,
        RatingFilter: false,
      };
      newState[cat] = !prev[cat];
      return newState;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={(e) => e.stopPropagation()}
      className={`hideScroll overflow-y-scroll border border-tan/30 bg-coffee/95 backdrop-blur-3xl text-cream z-[9999] sm:w-[24rem] overflow-hidden duration-300 mt-20 ease-in-out shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-[3rem]`}
    >
      {/* Panel Header */}
      <div className="px-8 pt-10 pb-6 flex items-center justify-between border-b border-tan/10">
        <div>
          <h2 className="text-3xl font-serif tracking-tight text-cream">Curation Filters</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-tan/60 mt-1 font-bold">Tailor Your Discovery</p>
        </div>
        <button
          onClick={resetFilters}
          className="text-[10px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border border-tan/20 hover:bg-tan hover:text-coffee transition-all duration-300 bg-tan/5"
        >
          Reset All
        </button>
      </div>

      <div className="px-4 py-6 space-y-3">
        {/* Price Filter Section */}
        <div className="bg-tan/5 rounded-[2.5rem] border border-tan/10 overflow-hidden transition-all duration-500">
          <DualRangeSlider
            PriceFilter={openCategory.PriceFilter}
            setOpenCategory={setOpenCategory}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Dynamic Filter Sections */}
        {[
          {
            id: "DiscountFilter",
            title: "Savings & Offers",
            subtitle: "Price Reductions",
            options: [
              { id: "all-discounts", label: "All Curated Offers", value: "" },
              { id: "under10", label: "Seasonal (Up to 10%)", value: "0-10" },
              { id: "under20", label: "Limited (10-20%)", value: "10-20" },
              { id: "under30", label: "Exclusive (20-30%)", value: "20-30" },
              { id: "over30", label: "Premium Savings (30%+)", value: "30-100" },
            ],
            key: "discount"
          },
          {
            id: "RatingFilter",
            title: "Reader Acclaim",
            subtitle: "Minimum Rating",
            options: [
              { id: "all-ratings", label: "All Reviews", value: 0 },
              { id: "4plus", label: "Exceptional (4.5+)", value: 4.5 },
              { id: "4only", label: "Highly Rated (4.0+)", value: 4 },
              { id: "3plus", label: "Recommended (3.5+)", value: 3.5 },
            ],
            key: "rating"
          },
          {
            id: "LanguageFilter",
            title: "Edition & Dialect",
            subtitle: "Available Languages",
            options: [
              { id: "Hindi", label: "Hindi Editions", value: "Hindi" },
              { id: "English", label: "English Editions", value: "English" },
            ],
            key: "language"
          },
          {
            id: "BindingFilter",
            title: "Format & Feel",
            subtitle: "Physical Binding",
            options: [
              { id: "hardcover", label: "Hardcover (Classic)", value: "Hardcover" },
              { id: "paperback", label: "Paperback (Standard)", value: "Paperback" },
              { id: "ebook", label: "Digital (E-Book)", value: "E-Book" },
            ],
            key: "binding"
          }
        ].map((section) => (
          <div key={section.id} className="bg-tan/5 rounded-[2.5rem] border border-tan/10 overflow-hidden transition-all duration-500">
            <div
              onClick={() => toggleCategory(section.id)}
              className="flex items-center justify-between p-6 cursor-pointer group hover:bg-tan/5 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-tan/40 font-bold">{section.subtitle}</span>
                <h3 className="text-xl font-serif text-cream mt-1 group-hover:text-tan transition-colors">{section.title}</h3>
              </div>
              <motion.div
                animate={{ rotate: openCategory[section.id] ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-tan/10 group-hover:bg-tan/20 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            <motion.ul
              initial={false}
              animate={{
                height: openCategory[section.id] ? "auto" : 0,
                opacity: openCategory[section.id] ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="px-8 pb-8 space-y-5 overflow-hidden"
            >
              {section.options.map((opt) => (
                <motion.li key={opt.id} whileHover={{ x: 6 }} className="flex items-center">
                  <Radio
                    id={opt.id}
                    label={opt.label}
                    checked={filters[section.key] === opt.value}
                    onChange={() => handleFilterChange(section.key, opt.value)}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookListingFilter;


