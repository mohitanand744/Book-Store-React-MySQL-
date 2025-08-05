import React from "react";
import { motion } from "framer-motion";
import { GiBookPile } from "react-icons/gi";

const Banners = ({ titleFirst, titleSecond, description }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative px-4 py-24 overflow-hidden text-center sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="relative max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 text-5xl font-bold text-[#5E4C37] md:text-6xl"
        >
          {titleFirst} <span className="text-[#b1946a]">{titleSecond}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8 text-xl font-medium leading-relaxed text-[#5E4C37] md:text-2xl"
        >
          {description ? (
            description
          ) : (
            <>
              <b>NextChapter</b> began as a shared dream between friends in
              2018. Today, we're a community of 50,000+ readers discovering new
              worlds together.
            </>
          )}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <GiBookPile className="mx-auto text-7xl text-[#b1946a]" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Banners;
