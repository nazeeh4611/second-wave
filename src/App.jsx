import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Works from './pages/Works';
import Branding from './pages/Branding';
import SEO from './pages/SEO';
import WebDevelopment from './pages/WebDevelopment';
import PerformanceMarketing from './pages/PerformanceMarketing';
import SocialMediaMarketing from './pages/SocialMediaMarketing';
import Creative from './pages/Creative';
import Production from './pages/Production';
import DigitalPR from './pages/DigitalPR';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    // Override the smooth scroll behavior from CSS
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
  
    window.lenis = lenis;
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
    
    // Force scroll to top on initial load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, duration: 0 });
    }
  
    return () => {
      lenis.destroy();
      style.remove();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative bg-[#0A0A0A] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/works" element={<Works />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/performance-marketing" element={<PerformanceMarketing />} />
            <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
            <Route path="/creative" element={<Creative />} />
            <Route path="/production" element={<Production />} />
            <Route path="/digital-pr" element={<DigitalPR />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;