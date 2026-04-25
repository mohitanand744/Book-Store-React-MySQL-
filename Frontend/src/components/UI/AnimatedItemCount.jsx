import { motion } from "framer-motion";
const AnimatedItemCount = ({ count = 0, label = "item", suffix = "saved", delay = 0.4, Icon }) => {
  const pluralLabel = count === 1 ? label : `${label}s`;
  ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center gap-1">
        {/* Animated Item Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {
            Icon && <Icon className="text-coffee text-5xl" />
          }
        </motion.div>

        {/* Count with gradient text */}
        <div className="relative font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r  to-coffee  text-lg">
            {count}
          </span>
          <span className="text-coffee/80 ">
            {pluralLabel} {suffix}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.4, duration: 1 }}
        className="h-0.5 mt-1 bg-gradient-to-r from-coffee/20 to-sepia rounded-full"
      />
    </motion.div>
  );
};

export default AnimatedItemCount;


