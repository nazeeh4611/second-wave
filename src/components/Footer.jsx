import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Second</span>Wave.
            </h3>
            <p className="text-gray-400 mb-6">
              Riding the digital wave to transform your brand into an unforgettable experience.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-2xl text-gray-400 hover:text-[#9945FF] transition-colors"
                >
                  <Icon />
                </a>
              ))}
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
              <li>hello@secondwave.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SecondWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;