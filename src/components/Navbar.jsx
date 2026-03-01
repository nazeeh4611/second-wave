import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/works' },
  { label: 'Contact', to: '/contact' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Initial fade + slide animation
    gsap.fromTo(
      '.nav-item',
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      }
    );

    let lastScroll = 0;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        
        // Update scrolled state
        setIsScrolled(currentScroll > 20);

        if (currentScroll > lastScroll && currentScroll > 80) {
          // Scroll Down → Hide
          gsap.to('.navbar', {
            y: -120,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          // Scroll Up → Show
          gsap.to('.navbar', {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        }

        lastScroll = currentScroll;
      },
    });
  }, []);

  return (
    <nav 
      className={`
        navbar 
        fixed 
        top-0 
        left-0 
        w-full 
        z-50 
        h-20 
        transition-all 
        duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-white/90 backdrop-blur-xl border-b border-white/30'
        }
      `}
    >
      <div className="container-custom flex items-center justify-between h-full px-6 mx-auto max-w-7xl">

        {/* Logo */}
        <Link to="/" className="nav-item flex items-center">
          <img
            src="/lg.png"
            alt="SecondWave logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                nav-item
                relative
                text-sm
                font-medium
                tracking-wide
                ${isScrolled ? 'text-gray-800' : 'text-gray-800'}
                transition-all duration-300
                hover:text-black
                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[2px]
                after:w-0
                after:bg-black
                after:transition-all
                after:duration-300
                hover:after:w-full
                ${isActive ? 'text-black font-semibold after:w-full' : ''}
                `
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Optional: Contact button */}
          <Link
            to="/contact"
            className="nav-item bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Get in touch
          </Link>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="nav-item md:hidden text-gray-800 hover:text-black transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full 
          bg-white 
          border-t border-gray-200 
          shadow-xl
          animate-slideDown">

          <div className="py-8 flex flex-col items-center gap-6 text-lg font-medium">

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-black transition-colors ${isActive ? 'text-black font-bold' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors mt-4"
            >
              Get in touch
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;