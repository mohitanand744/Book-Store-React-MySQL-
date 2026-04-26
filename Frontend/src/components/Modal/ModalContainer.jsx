import { motion, AnimatePresence } from "framer-motion";
import BooksLoader from "../Loaders/BooksLoader";

const Modal = ({ isOpen, onClose, loading, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[999] bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: -170 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 170 }}
            onClick={onClose}
          >
            <motion.div
              layout
              transition={{
                layout: { duration: 0.35, ease: "easeInOut" },
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-auto overflow-y-auto scrollbar-hide max-h-[93vh]  max-w-md relative border-2 border-tan bg-coffee text-tan p-6 rounded-3xl shadow-xl"
            >


              <AnimatePresence>
                {loading && (
                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.35, ease: "easeInOut" },
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-coffee/60 backdrop-blur-[2px] rounded-[2rem]"
                  >
                    <BooksLoader height="0rem" imgHeight="16" imgWidth="16" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="z-10">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;


