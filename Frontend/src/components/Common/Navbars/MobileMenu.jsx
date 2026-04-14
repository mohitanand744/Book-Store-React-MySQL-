import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import MegaMenu from "./MegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const [openMegaMenu, setOpenMegaMenu] = useState(false);

  const menuVariants = {
    hidden: { 
      height: 0, 
      opacity: 0, 
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98], when: "afterChildren" } 
    },
    visible: { 
      height: "auto", 
      opacity: 1, 
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98], when: "beforeChildren", staggerChildren: 0.08 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="lg:hidden overflow-hidden bg-[#D3BD9D]/90 backdrop-blur-xl border-t border-white/20 shadow-2xl origin-top"
        >
          <ul className="px-5 pt-6 pb-8 space-y-4">
            {/* Home */}
            <motion.li variants={itemVariants}>
              <Link
                to="/nextChapter"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 text-lg font-bold text-[#5C4C49] bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 active:scale-95 transition-all duration-300 shadow-sm"
              >
                Home
              </Link>
            </motion.li>

            {/* About */}
            <motion.li variants={itemVariants}>
              <Link
                to="/nextChapter/aboutUs"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 text-lg font-bold text-[#5C4C49] bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 active:scale-95 transition-all duration-300 shadow-sm"
              >
                About
              </Link>
            </motion.li>

            {/* Books Types with Accordion */}
            <motion.li variants={itemVariants} className="overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm transition-all duration-300">
              <button
                type="button"
                onClick={() => setOpenMegaMenu(!openMegaMenu)}
                className="w-full px-5 py-3 flex justify-between items-center text-lg font-bold text-[#5C4C49] hover:bg-white/40 active:bg-white/60 transition-colors duration-300"
              >
                Books Types
                <motion.div 
                   animate={{ rotate: openMegaMenu ? 180 : 0 }} 
                   transition={{ duration: 0.3, ease: "backOut" }}
                >
                  <IoIosArrowDown className="text-xl" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openMegaMenu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden border-t border-[#5C4C49]/10"
                  >
                    <div 
                      className="py-3 px-1" 
                      onClick={(e) => {
                        if (e.target.tagName === 'A') setIsOpen(false);
                      }}
                    >
                      {/* Scale slightly so MegaMenu adapts better to mobile */}
                      <div className="transform origin-top scale-[0.85] w-[117%] -ml-[8.5%] pb-4">
                        <MegaMenu />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>

            {/* Books with Tag Image */}
            <motion.li variants={itemVariants} className="relative">
              <Link
                to="/nextChapter/books"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-5 py-3 text-lg font-bold text-[#5C4C49] bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 active:scale-95 transition-all duration-300 shadow-sm relative overflow-hidden"
              >
                Books
                <span className="w-14 relative z-10 flex items-center justify-center">
                  <img src="/images/tag.avif" alt="New Tag" className="object-contain drop-shadow-md drop-shadow-white" />
                </span>
              </Link>
            </motion.li>

            {/* Contact */}
            <motion.li variants={itemVariants}>
              <Link
                to="/nextChapter/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-5 py-3 text-lg font-bold text-[#5C4C49] bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 active:scale-95 transition-all duration-300 shadow-sm"
              >
                Contact
              </Link>
            </motion.li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
