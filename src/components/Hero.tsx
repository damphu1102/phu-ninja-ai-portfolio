
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";


const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            if (!containerRef.current || !imageRef.current) {
                rafId = 0;
                return;
            }
            
            const {
                left,
                top,
                width,
                height
            } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
            rafId = 0;
        });
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      const speed = 0.05; // Hardcoded since we use ref
      const yPos = -scrollY * speed;
      parallaxRef.current.style.transform = `translateY(${yPos}px)`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="relative bg-transparent" 
      id="hero" 
      style={{
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      {/* Container for background effects to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-[#00ff84] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
          <div 
            ref={parallaxRef}
            className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" 
            style={{ willChange: 'transform' }}
          ></div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            {/* Green Status Dot */}
            <div 
              className="w-6 h-6 rounded-full bg-[#00ff84] mb-6 animate-fade-in shadow-[0_0_15px_rgba(0,255,132,0.5)]"
              style={{ animationDelay: "0.05s" }}
            />

            <p 
              className="text-xl sm:text-2xl mb-4 font-medium text-white animate-fade-in flex items-center gap-2"
              style={{ animationDelay: "0.1s" }}
            >
              Hello, I'm Dam Huu Phu <span className="animate-wave">👋</span>
            </p>
            
            <h1 
              className="font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight animate-fade-in mb-6 tracking-tight" 
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-white block">FRONTEND</span>
              <span className="text-[#00ff84] block">DEVELOPER</span>
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="mt-6 mb-8 leading-relaxed animate-fade-in text-gray-400 font-normal text-base sm:text-lg text-left max-w-lg"
            >
              Building beautiful, responsive, and user-friendly web interfaces with modern technologies.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <a 
                href="#contact" 
                className="flex items-center justify-center group w-full sm:w-auto text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,132,0.4)] hover:-translate-y-1" 
                style={{
                  backgroundColor: '#00ff84',
                  borderRadius: '1440px',
                  boxSizing: 'border-box',
                  color: '#000000',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '16px',
                  lineHeight: '24px',
                  padding: '16px 32px',
                  border: 'none',
                }}
              >
                Contact Me
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="relative animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {/* SVG Filter to render black pixels transparent (Green Screen effect for Black) */}
              <svg width="0" height="0" className="absolute">
                <filter id="remove-black" colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            3 3 3 0 -1.5" 
                  />
                </filter>
              </svg>

              {/* Apply the filter to the image */}
              <img 
                ref={imageRef} 
                src="/hero_portrait.png" 
                alt="DH.PHU Portfolio Portrait" 
                className="relative z-10 w-full h-auto max-w-2xl lg:max-w-4xl mx-auto object-cover hover:scale-[1.05] transition-transform duration-500 ease-out translate-y-16 scale-125 lg:scale-135" 
                style={{ filter: 'url(#remove-black)', willChange: 'transform' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
