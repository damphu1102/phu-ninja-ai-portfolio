import { Facebook, Github, Linkedin, ChevronRight } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "EDUCATION", href: "#education" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-black/40 border-t border-white/10 backdrop-blur-md relative z-10 pt-16 pb-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00ff84]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-between">
          
          {/* Left Column: Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Dam Huu Phu
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              "Transforming vision into superior web solutions, elevating experiences and optimizing business results."
            </p>
            
            {/* Social Icons - Update these URLs with your actual profiles */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/damphu207" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#052e16] flex items-center justify-center text-[#00ff84] hover:bg-[#00ff84] hover:text-black transition-all duration-300"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/damphu1102"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#052e16] flex items-center justify-center text-[#00ff84] hover:bg-[#00ff84] hover:text-black transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/damphu207"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#052e16] flex items-center justify-center text-[#00ff84] hover:bg-[#00ff84] hover:text-black transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Navigation */}
          <div className="flex flex-col md:items-end">
            <div className="flex flex-col items-start space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center text-white font-medium hover:text-[#00ff84] transition-colors duration-300 tracking-wider"
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-white group-hover:text-[#00ff84] transition-colors" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] w-full bg-white/10 mt-16 mb-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2025 All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
