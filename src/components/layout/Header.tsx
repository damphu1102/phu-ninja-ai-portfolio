import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, User, Zap, Briefcase, Mail, Clock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "HOME",
    href: "#home",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  {
    icon: <User className="h-5 w-5" />,
    label: "ABOUT",
    href: "#about",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "EXPERIENCE",
    href: "#experience",
    gradient: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)",
    iconColor: "group-hover:text-pink-500 dark:group-hover:text-pink-400",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    label: "EDUCATION",
    href: "#education",
    gradient: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.06) 50%, rgba(3,105,161,0) 100%)",
    iconColor: "group-hover:text-sky-500 dark:group-hover:text-sky-400",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "SKILLS",
    href: "#skills",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "PROJECTS",
    href: "#projects",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "CONTACT",
    href: "#contact",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400",
  },
];

// Animation variants
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname === '/') {
        const sections = menuItems.map(item => item.href.substring(1));
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
            }
          }
        }
      }
    };

    if (location.pathname === '/') {
        // Initial check
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    } else {
        // Map routes to sections
        if (location.pathname.includes('/gioi-thieu/ky-nang')) setActiveSection('skills');
        else if (location.pathname.includes('/gioi-thieu/du-an')) setActiveSection('projects');
        else if (location.pathname.includes('/lien-he')) setActiveSection('contact');
        else if (location.pathname.includes('/gioi-thieu')) setActiveSection('about');
        else setActiveSection('');
    }
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 relative flex justify-center">
        
        {/* Desktop Navigation - MenuBar Style */}
        <div className="hidden lg:block">
          <motion.nav
            className="flex items-center gap-4 p-2 pl-6 rounded-2xl bg-white/10 dark:bg-black/60 backdrop-blur-lg border border-white/10 shadow-lg relative overflow-hidden"
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(239,68,68,0.1) 100%)"
              }}
              variants={navGlowVariants}
            />
            
            {/* Logo inside the pill */}


            <ul className="flex items-center gap-2 relative z-10">
                {menuItems.map((item: MenuItem) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                  <motion.li key={item.label} className="relative">
                    <motion.div
                      className="block rounded-xl overflow-visible group relative"
                      style={{ perspective: "600px" }}
                      whileHover="hover"
                      initial="initial"
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                        variants={glowVariants}
                        animate={isActive ? "hover" : "initial"}
                        style={{
                          background: item.gradient,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      {/* Front-facing menu item */}
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (location.pathname !== '/') {
                             window.location.href = '/' + item.href;
                          } else {
                              const element = document.querySelector(item.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                              setActiveSection(item.href.substring(1));
                          }
                        }}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl",
                          isActive ? "text-white" : "text-gray-200 group-hover:text-white"
                        )}
                      >
                         <motion.div
                           variants={itemVariants}
                           transition={sharedTransition}
                           style={{
                             transformStyle: "preserve-3d",
                             transformOrigin: "center bottom",
                             display: "flex",
                             alignItems: "center",
                             gap: "0.5rem"
                           }}
                         >
                            <span className={cn(
                                "transition-colors duration-300", 
                                isActive ? item.iconColor.replace(/group-hover:/g, '') : item.iconColor
                            )}>
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                         </motion.div>
                      </a>
                      
                       {/* Back-facing menu item for the 3D flip effect */}
                       <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (location.pathname !== '/') {
                             window.location.href = '/' + item.href;
                          } else {
                              const element = document.querySelector(item.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                              setActiveSection(item.href.substring(1));
                          }
                        }}
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                      >
                         <motion.div
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 bg-transparent transition-colors rounded-xl text-gray-200 group-hover:text-white"
                            )}
                            variants={backVariants}
                            transition={sharedTransition}
                            style={{
                              transformStyle: "preserve-3d",
                              transformOrigin: "center top",
                              transform: "rotateX(90deg)"
                            }}
                          >
                            <span className={cn("transition-colors duration-300", item.iconColor)}>
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </motion.div>
                      </a>
                    </motion.div>
                  </motion.li>
                );
                })}
              </ul>
          </motion.nav>
        </div>

        {/* Mobile Menu Toggle (absolute positioned to right for consistency) */}
        <button
          className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

        {/* Mobile Menu */}
        <AnimatePresence>
            {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="fixed inset-0 z-40 bg-black flex flex-col pt-24 px-8 lg:hidden"
            >
                <nav className="flex flex-col space-y-6 items-center">
                    {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={cn(
                        "text-xl font-medium py-3 w-full text-center hover:text-[#00ff84] transition-colors flex items-center justify-center gap-3",
                        activeSection === item.href.substring(1) ? "text-[#00ff84]" : "text-white"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMobileMenuOpen(false);
                          
                          if (location.pathname !== '/') {
                             window.location.href = '/' + item.href;
                          } else {
                              const element = document.querySelector(item.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                              setActiveSection(item.href.substring(1));
                          }
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </a>
                    ))}
                </nav>
            </motion.div>
            )}
        </AnimatePresence>
    </header>
  );
};

export default Header;
