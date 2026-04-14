import { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import Search from "../../SearchBars/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";
import ShoppingCart from "./ShoppingCarts";
import MobileMenu from "./MobileMenu";
import useAuth from "../../../Hooks/useAuth";
import { useUser } from "../../../store/Context/UserContext";
import Spinner from "../../Loaders/Spinner";
import { useImagePreview } from "../../../store/Context/ImagePreviewContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const pathName = useLocation().pathname.replaceAll("/", "");
  const [animation, setAnimation] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, userData } = useAuth();
  const { preview, isUploading, setPreview } = useUser();
  const { openPreview } = useImagePreview();
  const [viewImage, setViewImage] = useState(false);
  const navigate = useNavigate();
  console.log(isAuthenticated);

  console.log("pathName", pathName);

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

  useEffect(() => {
    if (userData) {
      if (userData.profilePic) {
        setPreview(userData.profilePic);
      }
    }
  }, [userData]);

  return (
    <nav
      className={`transition-all z-[999] duration-300 ${isFixed
        ? animation
          ? "sticky top-[-8rem] left-0 w-full opacity-0 shadow-xl"
          : "sticky top-0 left-0 w-full bg-[#D3BD9D]/85 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] opacity-100 border-b border-white/20 animate-slideDown"
        : "relative bg-[#D3BD9D] shadow-lg"
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
          <ul className="items-center hidden space-x-2 lg:flex">
            <li>
              <Link
                to={"/nextChapter"}
                className={`px-5 py-2 text-[1.02rem] font-bold transition-all duration-300 rounded-2xl shadow-sm ${pathName === "nextChapter" ? "bg-white/60 text-[#5C4C49]" : "text-white bg-transparent shadow-none hover:bg-white/30 hover:text-[#5C4C49]"
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/nextChapter/aboutUs"
                className={`px-5 py-2 text-[1.02rem] font-bold transition-all duration-300 rounded-2xl shadow-sm ${pathName === "nextChapteraboutUs" ? "bg-white/60 text-[#5C4C49]" : "text-white bg-transparent shadow-none hover:bg-white/30 hover:text-[#5C4C49]"
                  }`}
              >
                About
              </Link>
            </li>
            <ul className="group">
              <li
                className={`px-5 py-2 flex gap-1 items-center text-[1.02rem] font-bold text-white transition-all cursor-pointer hover:bg-white/30 hover:text-[#5C4C49] duration-300 rounded-2xl `}
              >
                Books Types{" "}
                <span>
                  <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                </span>
              </li>
              {/* Mega Menu */}
              <div className="absolute z-[999999] hidden lg:block opacity-0 scale-95 pointer-events-none origin-top transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 top-[3.8rem] inset-x-0 w-[80%] mx-auto drop-shadow-2xl">
                <MegaMenu />
              </div>
            </ul>
            <ul className="relative">
              <span className="absolute -top-3 -right-2 w-11 drop-shadow-md pointer-events-none z-10 transition-transform duration-300 group-hover:rotate-12">
                <img src="/images/tag.avif" alt="New" className="object-contain" />
              </span>

              <li className="px-1 py-1">
                <Link
                  to={"/nextChapter/books"}
                  className={`px-5 py-2 text-[1.02rem] font-bold transition-all duration-300 rounded-2xl shadow-sm ${pathName === "nextChapterbooks"
                    ? "bg-white/60 text-[#5C4C49]"
                    : "text-white bg-transparent shadow-none hover:bg-white/30 hover:text-[#5C4C49]"
                    }`}
                >
                  Books{" "}
                </Link>
              </li>
            </ul>
            <li>
              <Link
                to="/nextChapter/contact"
                className={`px-5 py-2 text-[1.02rem] font-bold transition-all duration-300 rounded-2xl shadow-sm ${pathName === "nextChaptercontact" ? "bg-white/60 text-[#5C4C49]" : "text-white bg-transparent shadow-none hover:bg-white/30 hover:text-[#5C4C49]"
                  }`}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Search />

            <div
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-white/40 hover:bg-white/60 backdrop-blur-md w-11 h-11 flex items-center justify-center rounded-2xl relative cursor-pointer active:scale-95 transition-all duration-300 shadow-sm border border-white/20 text-[#5C4C49]"
            >
              <div className="absolute flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-orange-600 rounded-full -top-1 -right-1 shadow-md border-2 border-[#D3BD9D]">
                3
              </div>
              <HiOutlineShoppingCart className="text-[1.4rem]" />
            </div>
            {isAuthenticated ? (
              <div className="">
                <Link to="/nextChapter/user/profile">
                  <div className="w-11 h-11 relative cursor-pointer active:scale-95 transition-all duration-300 border-[2px] border-white/50 hover:border-white shadow-sm rounded-full overflow-hidden">
                    <img
                      src={preview || "/images/loading.gif"}
                      alt="Profile"
                      className="object-cover w-full h-full rounded-full bg-white"
                      onClick={() => {
                        if (pathName === "nextChapteruserprofile") {
                          openPreview(preview, "Profile Image");
                        }
                      }}
                    />

                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                        <Spinner size={16} />
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate("/")}
                  className=""
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="hidden lg:flex"
                >
                  Signup
                </Button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/40 hover:bg-white/60 w-11 h-11 flex items-center justify-center rounded-2xl text-[#5C4C49] focus:outline-none transition-all duration-300 shadow-sm border border-white/20 active:scale-95"
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
