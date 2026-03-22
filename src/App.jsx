import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Services from './pages/Services';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';
import Branding from './pages/Branding';
import SEO from './pages/SEO';
import WebDevelopment from './pages/WebDevelopment';
import PerformanceMarketing from './pages/PerformanceMarketing';
import SocialMediaMarketing from './pages/SocialMediaMarketing';
import Creative from './pages/Creative';
import Production from './pages/Production';
import DigitalPR from './pages/DigitalPR';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import JobDetail from './pages/Jobdetail';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminWorkForm from './pages/admin/WorkForm';
import AdminCareers from './pages/admin/Admincareers';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import BrandSolutions from './pages/BrandSolutions';

function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `body { scroll-behavior: auto !important; }`;
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
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (lenis) lenis.scrollTo(0, { immediate: true, duration: 0 });

    return () => { lenis.destroy(); style.remove(); };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative bg-[#0A0A0A] min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/works/:slug" element={<WorkDetail />} />
                    <Route path="/branding" element={<Branding />} />
                    <Route path="/seo" element={<SEO />} />
                    <Route path="/web-development" element={<WebDevelopment />} />
                    <Route path="/performance-marketing" element={<PerformanceMarketing />} />
                    <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
                    <Route path="/creative" element={<Creative />} />
                    <Route path="/production" element={<Production />} />
                    <Route path="/digital-pr" element={<DigitalPR />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/careers/:id" element={<JobDetail />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="works/new" element={<AdminWorkForm />} />
            <Route path="works/:id" element={<AdminWorkForm />} />
            <Route path="careers" element={<AdminCareers />} />
          </Route>
        </Routes>

        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;