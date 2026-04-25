import React from "react";
import { motion } from "framer-motion";

const FloatingReaction = ({ Icon, activeText }) => {
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 1.5],
          opacity: [1, 0],
          y: -30,
          x: -5,
        }}
        transition={{ duration: 0.8 }}
        className={`absolute pointer-events-none ${activeText}`}
      >
        <Icon />
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 1.2],
          opacity: [1, 0],
          y: -36,
          x: 5,
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`absolute pointer-events-none ${activeText}`}
      >
        <Icon />
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 0.8],
          opacity: [1, 0],
          y: -40,
          x: 5,
        }}
        transition={{ duration: 0.2, delay: 0.4 }}
        className={`absolute pointer-events-none ${activeText}`}
      >
        <Icon />
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 0.9],
          opacity: [1, 0],
          y: -46,
          x: 5,
        }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className={`absolute pointer-events-none ${activeText}`}
      >
        <Icon />
      </motion.div>
    </>
  );
};

export default FloatingReaction;


