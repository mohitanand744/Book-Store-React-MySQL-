import { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import SearchBooks from "../../SearchBars/SearchBooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";
import ShoppingCart from "./ShoppingCarts";
import MobileMenu from "./MobileMenu";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const pathName = useLocation().pathname.replaceAll("/", "");
  const [animation, setAnimation] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, userData } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated);

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
      className={`bg-[#D3BD9D] transition-all z-[999] duration-300  ${
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
            <Link to="/nextChapter">
              <img
                className="object-cover w-full h-full"
                src="/images/logoBS.png"
                alt=""
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="items-center hidden space-x-4 lg:flex">
            <li>
              <Link
                to={"/nextChapter"}
                className={`px-3 py-1 border-[#5C4C49] text-lg font-bold  transition-all ${
                  pathName === "nextChapter" ? "text-[#5C4C49]" : "text-white"
                }  hover:scale-105  hover:text-[#5C4C49] duration-200 rounded-xl`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/nextChapter/aboutUs"
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
                  to={"/nextChapter/books"}
                  className={` border-[#5C4C49] text-lg font-bold  transition-all ${
                    pathName === "nextChapterbooks"
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

            <div
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-[#5C4C49] w-10 h-10 flex items-center justify-center rounded-full relative cursor-pointer active:scale-75 transition"
            >
              <div className="absolute flex items-center justify-center w-6 h-6 text-white bg-orange-600 rounded-full -top-2 -right-2">
                3
              </div>
              <HiOutlineShoppingCart className="text-2xl text-[#ffeccd]" />
            </div>
            {isAuthenticated ? (
              <div className="">
                <Link to="/nextChapter/user/profile">
                  <div className="w-12 h-12 cursor-pointer active:scale-75 transition border-2 bg-[#5C4C49] border-orange-500 rounded-full">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={userData?.profile_pic}
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex items-center justify-center h-8"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="outline"
                  className="items-center justify-center hidden h-8 lg:flex"
                >
                  Signup
                </Button>
              </>
            )}

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
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
