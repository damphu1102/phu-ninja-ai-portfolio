import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DotGrid from "../DotGrid";
import BackToTop from "../BackToTop";
import Preloader from "../Preloader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col relative bg-black overflow-hidden">
        {/* Global Interactive Background */}
        <DotGrid 
          baseColor="#333333" 
          activeColor="#00ff84" 
          gap={40} 
          dotSize={2} 
          proximity={120} 
          shockRadius={200}
        />
        
        <Header />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Layout;