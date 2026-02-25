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
    <nav className="navbar fixed top-0 left-0 w-full z-50 
      h-20 
      bg-white/30 
      backdrop-blur-2xl 
      border-b border-white/20
      shadow-[0_8px_32px_rgba(0,0,0,0.05)]
      transition-all duration-300">

      <div className="container-custom flex items-center justify-between h-full px-6">

        {/* Logo */}
        <Link to="/" className="nav-item flex items-center">
          <img
            src="/lg.png"
            alt="SecondWave logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">

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
                text-gray-700
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

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="nav-item md:hidden text-gray-700 hover:text-black transition-colors"
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
          bg-white/90 backdrop-blur-xl 
          border-t border-gray-200 
          shadow-lg">

          <div className="py-6 flex flex-col items-center gap-6 text-lg font-medium">

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </NavLink>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;