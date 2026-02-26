import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' instead of 'smooth'
      });
      
      // Fallback for browsers that don't support 'instant'
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Also try with Lenis if it exists
      if (window.lenis) {
        window.lenis.scrollTo(0, { 
          immediate: true, 
          duration: 0,
          force: true 
        });
      }
    }, 0);
    
    // Second attempt after a tiny delay to ensure DOM is ready
    setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }, 50);
    
  }, [pathname]);

  return null;
};

export default ScrollToTop;