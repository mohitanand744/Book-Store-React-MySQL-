import { motion } from "framer-motion";
import Ratings from "../RatingsReviews/Ratings";

const TestimonialCard = ({ data, index }) => {
  const { name, profile, rating, review } = data;

  return (
    <div
      className="relative flex flex-col w-full max-w-sm mx-auto overflow-hidden transition-all duration-500 bg-coffee border border-tan/20 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] hover:-translate-y-2 group rounded-[2rem]"
    >
      <div className="flex justify-between px-6 pt-6 pb-4 items-center border-b border-tan/10 bg-gradient-to-br from-tan/5 to-transparent flex-shrink-0">
        <div className="flex items-center gap-4 z-10 w-full relative">
          <motion.img
            src={profile}
            alt={name}
            className="object-cover border-[3px] border-tan/60 rounded-full shadow-md w-16 h-16 transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <div className="flex-1">
            <h4 className="text-lg font-bold text-tan line-clamp-1">{name}</h4>
            <div className="flex items-center mt-0.5">
              <div className="flex mr-2 ">
                <Ratings ratings={rating} />
              </div>
              <span className="text-sm font-bold text-tan">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Background Quote Icon */}
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 text-tan/20 z-0 pointer-events-none"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>
      </div>

      <div className="relative flex-1 px-8 pt-4 pb-6 text-center z-10 overflow-hidden">
        <p className="leading-relaxed italic text-sm md:text-base line-clamp-4 text-tan/80">
          "{review}"
        </p>
      </div>

      <motion.div
        className="h-[6px] w-full mt-auto flex-shrink-0 bg-gradient-to-r from-tan  "
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
};

export default TestimonialCard;


