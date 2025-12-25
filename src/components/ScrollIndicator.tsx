import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mouse } from "lucide-react";

const ScrollIndicator = () => {
  const handleClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
      onClick={handleClick}
    >
      {/* Mouse Icon with animation */}
      <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-[#00ff84]/50 transition-colors duration-300">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 h-2 bg-[#00ff84] rounded-full mt-2"
        />
      </div>

      {/* Scroll Text */}
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-3 text-xs text-gray-400 tracking-widest uppercase group-hover:text-[#00ff84] transition-colors"
      >
        Scroll
      </motion.span>

      {/* Chevron Arrow */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      >
        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#00ff84] transition-colors" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
