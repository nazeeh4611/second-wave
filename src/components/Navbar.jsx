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

    gsap.to('.navbar', {
      backdropFilter: 'blur(14px)',
      background: 'rgba(10,10,11,0.9)',
      borderBottom: '1px solid rgba(153,69,255,0.25)',
      scrollTrigger: {
        trigger: 'body',
        start: 'top -40px',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 py-4 h-20">
      <div className="container-custom flex items-center justify-between h-full">
        <Link to="/" className="nav-item flex items-center">
          <img
            src="/logo.png"
            alt="SecondWave logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-item text-white/60 hover:text-[#9FE870] transition-colors duration-300 ${
                  isActive ? 'text-[#9FE870]' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="nav-item md:hidden text-white/70 hover:text-[#9FE870] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-morphism border-t border-white/10">
          <div className="container-custom py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-white/70 hover:text-[#9FE870] transition-colors"
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
