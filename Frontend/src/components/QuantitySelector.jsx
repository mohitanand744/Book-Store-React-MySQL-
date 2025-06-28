import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

const QuantitySelector = ({ initialQuantity = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const prevQuantityRef = useRef(quantity);

  const incrementQuantity = () => {
    if (quantity < 10) {
      prevQuantityRef.current = quantity;
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      prevQuantityRef.current = quantity;
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  // Determine animation direction
  const getAnimationDirection = () => {
    return quantity > prevQuantityRef.current ? "increase" : "decrease";
  };

  // Directional animation variants
  const quantityVariants = {
    increase: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.1 },
    },
    decrease: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.1 },
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className=""
    >
      <div className="flex items-center w-40">
        <button
          onClick={decrementQuantity}
          className="px-2 h-8 w-10 pb-1 flex justify-center items-center text-2xl bg-[#D3BD9D] text-[#fff] hover:bg-[#c5ae8d] transition rounded-l-full"
        >
          -
        </button>
        <div className="w-[3rem] relative border-y-2 border-[#D3BD9D] h-8 text-center">
          <AnimatePresence mode="popLayout" custom={getAnimationDirection()}>
            <motion.span
              key={quantity}
              custom={getAnimationDirection()}
              variants={quantityVariants}
              initial={getAnimationDirection()}
              animate="enter"
              exit={getAnimationDirection()}
              className="absolute inset-0 flex items-center justify-center"
            >
              {quantity}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          onClick={incrementQuantity}
          className="px-2 h-8 pb-1 w-10 flex justify-center items-center text-xl text-white bg-[#D3BD9D] hover:bg-[#c5ae8d] transition rounded-r-full"
        >
          +
        </button>
      </div>
    </motion.div>
  );
};

export default QuantitySelector;
