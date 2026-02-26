import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="nav-item flex items-center -mt-2 mb-4">
              <img
                src="/logo.png"
                alt="SecondWave logo"
                className="h-9 md:h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-400 mb-6">
              Riding the digital wave to transform your brand into an unforgettable experience.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-[#9945FF] transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-[#9945FF] transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
              <a
                href="https://www.instagram.com/secondwave.ads?igsh=dmo2d3NtN3Zlenlz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-[#9945FF] transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-[#9945FF] transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-[#9945FF] transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {['Branding', 'SEO', 'Web Development', 'Performance Marketing', 'Social Media', 'Creative', 'Production', 'Digital PR'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-[#9945FF] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {['About', 'Work', 'Careers', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-[#9945FF] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a 
                  href="mailto:info@secondwave.in" 
                  className="hover:text-[#9945FF] transition-colors"
                >
                  info@secondwave.in
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919072532221" 
                  className="hover:text-[#9945FF] transition-colors"
                >
                  +91 90725 32221
                </a>
              </li>
              <li>Kochi,Kerala</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SecondWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;