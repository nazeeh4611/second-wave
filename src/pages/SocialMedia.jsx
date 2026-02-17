import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

function SocialMedia() {
  useEffect(() => {
    gsap.fromTo('.social-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );
  }, []);

  const platforms = [
    { icon: <FaInstagram />, name: 'Instagram', color: 'from-purple-500 to-pink-500' },
    { icon: <FaFacebook />, name: 'Facebook', color: 'from-blue-600 to-blue-800' },
    { icon: <FaTwitter />, name: 'Twitter', color: 'from-blue-400 to-blue-600' },
    { icon: <FaLinkedin />, name: 'LinkedIn', color: 'from-blue-700 to-blue-900' },
    { icon: <FaTiktok />, name: 'TikTok', color: 'from-black to-gray-800' },
    { icon: <FaYoutube />, name: 'YouTube', color: 'from-red-600 to-red-800' }
  ];

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          Social Media <span className="text-gradient">Marketing</span>
        </h1>
        
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Strategic social media campaigns that build communities, drive engagement, 
          and grow your brand presence across all platforms.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className={`social-card glass-effect p-6 rounded-xl text-center bg-gradient-to-br ${platform.color} bg-opacity-10 hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-4xl mb-2">{platform.icon}</div>
              <div className="text-sm font-semibold">{platform.name}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="social-card glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Content Strategy</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">✓ Content Calendar Planning</li>
              <li className="flex items-center gap-2">✓ Visual Content Creation</li>
              <li className="flex items-center gap-2">✓ Copywriting & Captions</li>
              <li className="flex items-center gap-2">✓ Hashtag Strategy</li>
              <li className="flex items-center gap-2">✓ Story & Reel Production</li>
            </ul>
          </div>

          <div className="social-card glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Community Management</h3>
            <ul className="space-y-3 text-gray-300">
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