// src/App.jsx
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
import Contact from './pages/Contact'; // add
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <div className="relative bg-[#0A0A0A]">
        <Navbar />
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
        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
