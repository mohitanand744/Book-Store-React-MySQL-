import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
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
              className="w-full max-w-md border-2 border-[#2e26246a] bg-[#D3BD9D] p-6 rounded-xl shadow-xl"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
