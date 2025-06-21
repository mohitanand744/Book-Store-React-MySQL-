import { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import SearchBooks from "../../SearchBars/SearchBooks";
import { Link, useLocation } from "react-router-dom";
import Button from "../../Buttons/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const pathName = useLocation().pathname.replaceAll("/", "");
  const [animation, setAnimation] = useState(false);

  console.log(pathName);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 && !isFixed) {
        setIsFixed(true);
        setAnimation(true);
        setTimeout(() => setAnimation(false), 300);
      } else if (window.scrollY <= 40 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

  return (
    <nav
      className={`bg-[#D3BD9D] transition-all z-[999999] duration-300  ${
        isFixed
          ? animation
            ? "sticky top-[-8rem] left-0 w-full opacity-80 shadow-xl animate-slideDown"
            : "sticky opacity-100 top-0 left-0 w-full shadow-xl"
          : "relative shadow-lg"
      }`}
    >
      <div className="container px-4 py-3 mx-auto">
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
          <ul className="items-center hidden space-x-4 lg:flex">
            <li>
              <Link
                to={"/bookstore"}
                className={`px-3 py-1 border-[#5C4C49] text-lg font-bold  transition-all ${
                  pathName === "bookstore" ? "text-[#5C4C49]" : "text-white"
                }  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/bookstore/aboutUs"
                className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl"
              >
                About
              </Link>
            </li>
            <ul className="group">
              <li
                className={`px-3 flex gap-1 items-center py-1 text-lg font-bold text-white transition-all    group-hover:text-[#5C4C49] duration-200 rounded-xl `}
              >
                Books Types{" "}
                <span>
                  <IoIosArrowDown className="transition-all group-hover:rotate-180" />
                </span>
              </li>
              {/* Mega Menu */}
              <div className="absolute z-[999999] hidden lg:block  opacity-0 scale-0 transition-all duration-500 group-hover:opacity-100 translate-y-[-7rem] group-hover:translate-y-0 group-hover:scale-100 top-[3.8rem] inset-x-0 w-[80%] mx-auto">
                <MegaMenu />
              </div>
            </ul>
            <ul className="relative">
              <span className="absolute -top-3 -right-1 bg-[#5C4C49] w-[5rem]">
                <img src="/images/tag.avif" alt="" />
              </span>

              <li className="px-3 py-1">
                <Link
                  to={"/bookstore/books"}
                  className={` border-[#5C4C49] text-lg font-bold  transition-all ${
                    pathName === "bookstorebooks"
                      ? "text-[#5C4C49]"
                      : "text-white"
                  }  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl`}
                >
                  Books{" "}
                </Link>
              </li>
            </ul>
            <li>
              <a
                href="#"
                className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <SearchBooks />

            <div className="bg-[#5C4C49] w-10 h-10 flex items-center justify-center rounded-full relative cursor-pointer active:scale-75 transition">
              <div className="absolute flex items-center justify-center w-6 h-6 text-white bg-orange-600 rounded-full -top-2 -right-2">
                3
              </div>
              <HiOutlineShoppingCart className="text-2xl text-[#ffeccd]" />
            </div>
            {/* <div className="">
              <div className="w-12 h-12 cursor-pointer active:scale-75 transition border-2 bg-[#5C4C49] border-orange-500 rounded-full">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHyzy1C_qA0SZxKf_Fq9xc1ZViTXyUhvDFc2QRbb7vdjRB1KDUEMniw4GdDaJqdYoacTs&usqp=CAU"
                  alt=""
                />
              </div>
            </div> */}

            <Link to="/">
              <Button
                variant="outline"
                className="flex items-center justify-center h-8"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                className="items-center justify-center hidden h-8 lg:flex"
              >
                Signup
              </Button>
            </Link>

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
            <Link to="/bookstore">Home</Link>
          </li>
          <li className="px-3 py-1 border-[#5C4C49] text-lg font-bold text-white transition-all    hover:text-[#5C4C49] duration-200 rounded-xl">
            <Link to="/bookstore/aboutUs">About</Link>
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
              <Link to="/bookstore/books"> Books</Link>
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
