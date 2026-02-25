import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

function SocialMedia() {
  useEffect(() => {
    gsap.fromTo('.social-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );
  }, []);

  const platforms = [
    { icon: <FaInstagram />, name: 'Instagram' },
    { icon: <FaFacebook />, name: 'Facebook' },
    { icon: <FaTwitter />, name: 'Twitter' },
    { icon: <FaLinkedin />, name: 'LinkedIn' },
    { icon: <FaTiktok />, name: 'TikTok' },
    { icon: <FaYoutube />, name: 'YouTube' }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Social Media
            <FiZap className="text-gray-800" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">
            Social Media <span className="text-gray-800">Marketing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic social media campaigns that build communities, drive engagement, 
            and grow your brand presence across all platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="social-card p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-800 hover:shadow-lg transition-all text-center group"
            >
              <div className="text-4xl text-gray-800 mb-2 group-hover:scale-110 transition-transform">{platform.icon}</div>
              <div className="text-sm font-medium text-gray-700">{platform.name}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="social-card p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Strategy</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">✓ Content Calendar Planning</li>
              <li className="flex items-center gap-2">✓ Visual Content Creation</li>
              <li className="flex items-center gap-2">✓ Copywriting & Captions</li>
              <li className="flex items-center gap-2">✓ Hashtag Strategy</li>
              <li className="flex items-center gap-2">✓ Story & Reel Production</li>
            </ul>
          </div>

          <div className="social-card p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Management</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">✓ Engagement & Responses</li>
              <li className="flex items-center gap-2">✓ Community Building</li>
              <li className="flex items-center gap-2">✓ Influencer Partnerships</li>
              <li className="flex items-center gap-2">✓ Crisis Management</li>
              <li className="flex items-center gap-2">✓ Analytics & Reporting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;