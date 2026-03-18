import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8 px-4 sm:px-6 md:px-8 pt-14 sm:pt-20 pb-8">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="block mb-5">
              <img src="/logo.png" alt="SecondWave" className="h-7 sm:h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-white/25 text-xs sm:text-sm leading-relaxed mb-6 max-w-xs">
              Kochi's leading digital marketing agency — riding the wave to transform your brand into an unforgettable experience.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[
                { href: 'https://facebook.com',                           Icon: FiFacebook  },
                { href: 'https://twitter.com',                             Icon: FiTwitter   },
                { href: 'https://www.instagram.com/secondwave.ads',        Icon: FiInstagram },
                { href: 'https://linkedin.com',                            Icon: FiLinkedin  },
                { href: 'https://youtube.com',                             Icon: FiYoutube   },
              ].map(({ href, Icon }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-white/20 hover:text-[#c8f731] transition-colors text-lg sm:text-xl">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-white/25 mb-4 sm:mb-5">Pages</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[['/', 'Home'], ['/services', 'Services'], ['/works', 'Works'], ['/contact', 'Contact'], ['/about', 'About']].map(([to, l]) => (
                <li key={l}>
                  <Link to={to} className="text-white/30 hover:text-[#c8f731] text-xs sm:text-sm transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Works */}
          <div>
            <h4 className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-white/25 mb-4 sm:mb-5">Our Works</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                ['Branding',             '/branding'             ],
                ['Digital Marketing',    '/production'           ],
                ['Web Development',      '/web-development'      ],
                ['Performance Marketing','/performance-marketing'],
                ['Social Media',         '/social-media-marketing'],
                ['Production',           '/production'           ],
              ].map(([l, to]) => (
                <li key={l}>
                  <Link to={to} className="text-white/30 hover:text-[#c8f731] text-xs sm:text-sm transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-white/25 mb-4 sm:mb-5">Office Address</h4>
            <ul className="space-y-2 sm:space-y-3 text-white/30 text-xs sm:text-sm">
              <li>
                <a href="mailto:info@secondwave.in" className="hover:text-[#c8f731] transition-colors">
                  info@secondwave.in
                </a>
              </li>
              <li>
                <a href="tel:+919072532221" className="hover:text-[#c8f731] transition-colors">
                  +91 90725 32221
                </a>
              </li>
              <li className="leading-relaxed">
                Kochi, Kerala<br />India — 682 001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/18 text-[10px] sm:text-xs tracking-wide text-center sm:text-left">
            &copy; {new Date().getFullYear()} SecondWave. All rights reserved. Kochi, Kerala.
          </p>
          <div className="flex items-center gap-1.5 text-white/15 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f731] animate-pulse" />
            Available for new projects
          </div>
        </div>
      </div>
    </footer>
  );
}