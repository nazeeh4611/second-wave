import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo('.nav-item',
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, delay: 0.2, ease: 'power3.out' }
    );
    let last = 0;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const cur = self.scroll();
        setScrolled(cur > 30);
        gsap.to('.navbar', {
          y: cur > last && cur > 80 ? -80 : 0,
          duration: 0.3, ease: 'power2.out',
        });
        last = cur;
      },
    });
  }, []);

  const lc = ({ isActive }) =>
    `nav-item text-[11px] font-extrabold tracking-[0.28em] uppercase transition-colors ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`;

  return (
    <nav className={`navbar fixed top-0 left-0 w-full z-50 h-[60px] transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a] border-b border-white/8' : 'bg-black/40 backdrop-blur-md'}`}>
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between relative">
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={lc}>Home</NavLink>
          <NavLink to="/services" className={lc}>Services</NavLink>
        </div>

        <Link to="/" className="nav-item absolute left-1/2 -translate-x-1/2">
          <img src="/lg.png" alt="SecondWave" className="h-8 md:h-10 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/works" className={lc}>Works</NavLink>
          <NavLink to="/contact" className={lc}>Contact</NavLink>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="nav-item md:hidden text-white/50 hover:text-white ml-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-white/8">
          <div className="py-10 flex flex-col items-center gap-7">
            {[['/', 'Home'], ['/services', 'Services'], ['/works', 'Works'], ['/contact', 'Contact']].map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `text-[11px] font-black tracking-[0.3em] uppercase ${isActive ? 'text-white' : 'text-white/35 hover:text-white'}`}>
                {label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}
              className="bg-[#c8f731] text-black font-black px-8 py-3 rounded-full text-xs tracking-widest uppercase mt-2">
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}