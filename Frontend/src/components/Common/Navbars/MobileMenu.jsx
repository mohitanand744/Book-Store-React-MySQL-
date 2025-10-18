import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import MegaMenu from "./MegaMenu";

export default function MobileMenu({ isOpen, setIsOpen }) {
  // Mobile Menu
  return (
    <div
      className={`lg:hidden transition-[max-height] duration-500 ease-in-out 
                  ${isOpen ? "max-h-screen" : "max-h-0"}`}
    >
      {isOpen && (
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Home */}
          <li>
            <Link
              to="/nextChapter"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-lg font-bold text-white rounded-xl
                       hover:text-[#5C4C49] transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              to="/nextChapter/aboutUs"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-lg font-bold text-white rounded-xl
                       hover:text-[#5C4C49] transition-colors duration-200"
            >
              About
            </Link>
          </li>

          {/* Books Types with MegaMenu */}
          <li className="relative group">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
              className="w-full px-3 py-1 flex items-center gap-1 text-lg font-bold text-white
                       rounded-xl transition-colors duration-200 group-hover:text-[#5C4C49]"
            >
              Books Types
              <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div
              className="absolute z-50 left-1/2 -translate-x-1/2 w-[80%]
                       opacity-0 scale-0 transform transition-all duration-300
                       group-hover:opacity-100 group-hover:scale-100"
            >
              <MegaMenu />
            </div>
          </li>

          {/* Books with Tag Image */}
          <li className="relative">
            <span className="absolute top-2 left-20 w-[5rem]">
              <img src="/images/tag.avif" alt="New Tag" />
            </span>
            <Link
              to="/nextChapter/books"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-lg font-bold text-white rounded-xl
                       hover:text-[#5C4C49] transition-colors duration-200"
            >
              Books
            </Link>
          </li>

          {/* Contact (placeholder link) */}
          <li>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-lg font-bold text-white rounded-xl
                       hover:text-[#5C4C49] transition-colors duration-200"
            >
              Contact
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
