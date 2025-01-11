import { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import SearchBooks from "../../SearchBars/SearchBooks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMagaMenuOpen, setIsMagaMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`shadow-lg bg-[#D3BD9D]  transition-all duration-300 ${
        isFixed ? "sticky top-0 left-0 w-full z-50 shadow-xl" : "relative"
      }`}
    >
      <div className="px-6 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 w-20">
            <img
              className="object-cover w-full h-full"
              src="/images/logoBS.png"
              alt=""
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden space-x-4 lg:flex">
            <a
              href="#"
              className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl"
            >
              Home
            </a>
            <a
              href="#"
              className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl"
            >
              About
            </a>
            <ul className="group">
              <li
                href="#"
                className="px-3 flex gap-1 items-center py-1 text-lg font-bold text-white transition-all  group-hover:scale-105  group-hover:text-[#5C4C49] duration-200 rounded-xl"
              >
                Books Types{" "}
                <span>
                  <IoIosArrowDown className="transition-all group-hover:rotate-180" />
                </span>
              </li>
              {/* Mega Menu */}
              <div className="absolute z-[999999] hidden lg:block transform  opacity-0 scale-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 top-[3.8rem] inset-x-0 w-[80%] mx-auto">
                <MegaMenu />
              </div>
            </ul>
            <ul className="relative">
              <span className="absolute -top-3 -right-1 bg-[#5C4C49] w-[5rem]">
                <img src="/images/tag.avif" alt="" />
              </span>
              <li
                href="#"
                className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl"
              >
                Books
              </li>
            </ul>
            <a
              href="#"
              className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <SearchBooks />

            <div className="bg-[#5C4C49] w-10 h-10 flex items-center justify-center rounded-full relative cursor-pointer active:scale-75 transition">
              <div className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full -top-2 -right-2">
                3
              </div>
              <HiOutlineShoppingCart className="text-2xl text-[#ffeccd]" />
            </div>
            <div className="">
              <div className="w-12 h-12 p-1 border-2 bg-[#5C4C49] border-white rounded-full">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww"
                  alt=""
                />
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${
          isOpen ? "h-[13rem]" : "h-0"
        } transition-all duration-200 ease-in-out overflow-hidden`}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <li
            href="#"
            className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all    hover:text-[#5C4C49] duration-200 rounded-xl"
          >
            Home
          </li>
          <li
            href="#"
            className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all    hover:text-[#5C4C49] duration-200 rounded-xl"
          >
            About
          </li>
          <ul className="group">
            <li
              href="#"
              className="px-3 flex gap-1 items-center py-1 text-lg font-bold text-white transition-all  group-hover:text-[#5C4C49] duration-200 rounded-xl"
            >
              Books Types{" "}
              <span>
                <IoIosArrowDown className="transition-all group-hover:rotate-180" />
              </span>
            </li>
            {/* Mega Menu */}
            <div className="absolute z-50 transform  opacity-0 scale-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 top-[3.8rem] inset-x-0 w-[80%] mx-auto">
              <MegaMenu />
            </div>
          </ul>
          <ul className="relative">
            <span className="absolute top-2 left-20 bg-[#5C4C49] w-[5rem]">
              <img src="/images/tag.avif" alt="" />
            </span>
            <li
              href="#"
              className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all    hover:text-[#5C4C49] duration-200 rounded-xl"
            >
              Books
            </li>
          </ul>
          <a
            href="#"
            className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all    hover:text-[#5C4C49] duration-200 rounded-xl"
          >
            Contact
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
