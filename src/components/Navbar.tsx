
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Zap, Briefcase, Mail, User } from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("skills");

  const navLinks = [
    { name: "ABOUT", href: "#about", icon: <User size={20} /> },
    { name: "SKILLS", href: "#skills", icon: <Zap size={20} /> },
    { name: "PROJECTS", href: "#projects", icon: <Briefcase size={20} /> },
    { name: "CONTACT", href: "#contact", icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Brand Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
         <a 
          href="#" 
          className="text-2xl font-bold tracking-wide text-[#00ff84] hover:opacity-90 transition-opacity drop-shadow-md"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          Linhcct
        </a>
      </div>

      {/* Floating Dock Navigation - Bottom Center */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="flex items-center gap-2 px-2 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-[#00ff84]/10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 font-medium text-sm tracking-wide",
                activeSection === link.href.substring(1)
                  ? "bg-[#00ff84] text-black shadow-[0_0_20px_rgba(0,255,132,0.3)] transform scale-105" 
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(link.href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                setActiveSection(link.href.substring(1));
              }}
            >
              <span className={cn("transition-transform duration-300", activeSection === link.href.substring(1) ? "scale-110" : "")}>
                {link.icon}
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
