import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo('.nav-item',
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, delay: 0.15, ease: 'power3.out' }
    );
    let last = 0;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const cur = self.scroll();
        setScrolled(cur > 40);
        gsap.to('.navbar', { y: cur > last && cur > 100 ? -68 : 0, duration: 0.3, ease: 'power2.out' });
        last = cur;
      },
    });
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/6 h-[58px]' : 'bg-black/30 backdrop-blur-md h-[64px]'}`}>
<div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-between">
        <div className="hidden md:flex items-center gap-0.5">
          {[['/', 'Home'], ['/services', 'Services']].map(([to, label]) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `nav-item px-4 py-2 rounded-full text-[11px] font-extrabold tracking-[0.22em] uppercase transition-all duration-200 ${
                  isActive ? 'text-white bg-white/10' : 'text-white/40 hover:text-white hover:bg-white/6'
                }`
              }
            >{label}</NavLink>
          ))}
        </div>

        <Link to="/" className="nav-item absolute left-1/2 -translate-x-1/2">
          <img src="/lg.png" alt="SecondWave" className="h-7 sm:h-8 md:h-[34px] w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {[['works', 'Works'], ['about', 'About Us']].map(([path, label]) => (
            <NavLink key={path} to={`/${path}`}
              className={({ isActive }) =>
                `nav-item px-4 py-2 rounded-full text-[11px] font-extrabold tracking-[0.22em] uppercase transition-all duration-200 ${
                  isActive ? 'text-white bg-white/10' : 'text-white/40 hover:text-white hover:bg-white/6'
                }`
              }
            >{label}</NavLink>
          ))}
          <Link to="/contact"
            className="nav-item ml-2 text-white font-black text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:opacity-90"
            style={{ background: ACCENT }}>
            Get in Touch
          </Link>
        </div>

        <button onClick={() => setIsMenuOpen(o => !o)}
          className="nav-item md:hidden text-white/45 hover:text-white transition-colors ml-auto" aria-label="menu">
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-t border-white/8 shadow-2xl" style={{ background: '#0a0a0a' }}>
          <div className="py-6 flex flex-col px-4">
            {[['/', 'Home'], ['/services', 'Services'], ['/works', 'Works'], ['/about', 'About']].map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3.5 px-4 rounded-xl text-[11px] font-black tracking-[0.28em] uppercase transition-colors ${
                    isActive ? 'bg-white/8 text-white' : 'text-white/35 hover:text-white'
                  }`
                }
              >{label}</NavLink>
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}
              className="mt-4 text-white font-black px-8 py-3 rounded-full text-xs tracking-widest uppercase text-center transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}>
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}