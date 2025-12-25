import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,255,132,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,132,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff84] rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff84]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00ff84]/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '0.5s' }} />

          {/* Main Content */}
          <div className="relative flex flex-col items-center gap-8">
            
            {/* Animated Rings */}
            <div className="relative w-32 h-32">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-[#00ff84]/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-2 border-2 border-dashed border-[#00ff84]/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Progress Ring */}
              <svg className="absolute inset-4 w-24 h-24 -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="rgba(0,255,132,0.1)"
                  strokeWidth="4"
                  fill="none"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="#00ff84"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{
                    strokeDasharray: "276.46",
                    filter: "drop-shadow(0 0 6px rgba(0,255,132,0.5))",
                  }}
                />
              </svg>

              {/* Center Logo - Code Symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl font-mono font-bold flex items-center"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0,255,132,0.5))" }}
                >
                  <span className="text-white">&lt;</span>
                  <motion.span 
                    className="text-[#00ff84] mx-0.5"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    /
                  </motion.span>
                  <span className="text-white">&gt;</span>
                </motion.div>
              </div>
            </div>

            {/* Progress Counter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-5xl font-bold text-white tabular-nums">
                {Math.round(progress)}
                <span className="text-[#00ff84] text-3xl">%</span>
              </div>
              
              {/* Loading Bar */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00ff84] via-[#00ff84] to-[#00ff84]/50 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{
                    boxShadow: "0 0 10px rgba(0,255,132,0.5)",
                  }}
                />
              </div>

              {/* Status Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-gray-400 text-sm tracking-widest uppercase"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-[#00ff84] rounded-full"
                />
                Loading Experience
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 text-gray-500 text-xs tracking-wider"
          >
            DAM HUU PHU © 2025
          </motion.div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00ff84]/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00ff84]/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00ff84]/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00ff84]/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
