import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MarqueeSection from "@/components/MarqueeSection";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Code,
  Palette,
  TrendingUp,
  Bot,
  Video,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import Hero from "@/components/Hero";

import SkillsSection from "@/components/SkillsSection";

import ProjectsSection from "@/components/ProjectsSection";

import ContactSection from "@/components/ContactSection";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("hero-hidden")) {
              entry.target.classList.add("hero-visible");
            } else {
              entry.target.classList.add("reveal-visible");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".reveal-hidden, .hero-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* SVG Filter for removing black background */}
      <svg width="0" height="0" className="absolute">
        <filter id="remove-black-about" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    3 3 3 0 -1.5" 
          />
        </filter>
      </svg>

      {/* Hero Section */}
      <div id="home" className="hero-hidden">
        <Hero />
      </div>

      <div className="reveal-hidden relative z-20">
        <MarqueeSection />
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-transparent reveal-hidden">
         <div className="container mx-auto px-4">
             <div className="flex flex-col md:flex-row items-center gap-12">
                 {/* Left Column - Image */}
                 <div className="w-full md:w-5/12 relative group">
                     {/* Background Glow */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff84]/20 to-transparent blur-3xl opacity-50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700"></div>
                     <img 
                        src="/about_portrait.png" 
                        alt="Dam Huu Phu with Laptop" 
                        className="relative z-10 w-full max-w-lg mx-auto object-cover"
                        style={{ filter: 'url(#remove-black-about) drop-shadow(0 0 20px rgba(0, 255, 132, 0.15))' }}
                     />
                 </div>

                 {/* Right Column - Content */}
                 <div className="w-full md:w-7/12 text-left">
                     <div className="flex items-center gap-4 mb-4">
                        <span className="h-[2px] w-12 bg-[#00ff84]"></span>
                        <span className="text-[#00ff84] font-medium tracking-widest uppercase text-sm">About Me</span>
                        <span className="h-[2px] w-12 bg-[#00ff84]"></span>
                     </div>
                     
                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                         Frontend is experience, <br/>
                         <span className="text-gray-400">not just code</span>
                     </h2>

                     <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                         Frontend Developer specializing in ReactJS. Focused on building optimized, user-friendly digital interfaces from clean code to transform complex UX/UI designs into smooth and efficient web experiences.
                     </p>

                     <div className="grid grid-cols-1 gap-4 space-y-2">
                         {/* Info Rows */}
                         <div className="flex flex-col sm:flex-row sm:items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300">
                             <span className="w-40 text-[#00ff84] font-semibold text-lg">Name:</span>
                             <span className="text-white text-lg font-light">Dam Huu Phu</span>
                         </div>
                         <div className="flex flex-col sm:flex-row sm:items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300">
                             <span className="w-40 text-[#00ff84] font-semibold text-lg">Date of birth:</span>
                             <span className="text-white text-lg font-light">Feb 02, 2003</span>
                         </div>
                         <div className="flex flex-col sm:flex-row sm:items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300">
                             <span className="w-40 text-[#00ff84] font-semibold text-lg">Address:</span>
                             <span className="text-white text-lg font-light">Hoang Mai District, Hanoi</span>
                         </div>
                         <div className="flex flex-col sm:flex-row sm:items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300">
                             <span className="w-40 text-[#00ff84] font-semibold text-lg">Email:</span>
                             <span className="text-white text-lg font-light">damphu207@gmail.com</span>
                         </div>
                         <div className="flex flex-col sm:flex-row sm:items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300">
                             <span className="w-40 text-[#00ff84] font-semibold text-lg">Phone:</span>
                             <span className="text-white text-lg font-light">(+84) 397 706 411</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
