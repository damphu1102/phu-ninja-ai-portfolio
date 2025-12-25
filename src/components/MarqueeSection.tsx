import React from "react";
import Marquee from "@/components/ui/marquee";

const MarqueeSection = () => {
  return (
    <div className="w-full bg-[#052e16]/50 py-3 md:py-4 overflow-hidden relative border-t border-[#00ff84]/20 z-10 backdrop-blur-sm">
      <Marquee className="[--gap:3rem]" speed={50} repeat={4}>
        <div className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider flex items-center">
          Welcome to my portfolio <span className="ml-4 text-[#00ff84]">👋</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider flex items-center">
          Software Engineer <span className="ml-4 text-[#00ff84]">💻</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider flex items-center">
          Creative Coder <span className="ml-4 text-[#00ff84]">🎨</span>
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;
