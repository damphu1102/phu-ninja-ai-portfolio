
import React from "react";
const Footer = () => {
  return (
    <footer className="w-full bg-transparent py-6 border-t border-white/10 backdrop-blur-sm relative z-10">
      <div className="section-container">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} DH.PHU. All rights reserved. Inspiration from{" "}
          <a
            href="https://x.com/BrettFromDJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff84] hover:underline"
          >
            DesignJoy's
          </a>{" "}
          BUILD WARS styling.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
