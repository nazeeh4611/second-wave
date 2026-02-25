import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaSearch, FaChartLine, FaLink, FaFileAlt } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

function SEO() {
  useEffect(() => {
    gsap.fromTo('.seo-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
    );
  }, []);

  const strategies = [
    {
      title: 'Keyword Research',
      description: 'Data-driven keyword analysis to target high-value search terms.',
      icon: <FaSearch />
    },
    {
      title: 'On-Page SEO',
      description: 'Optimize content, meta tags, and structure for better rankings.',
      icon: <FaFileAlt />
    },
    {
      title: 'Technical SEO',
      description: 'Improve site speed, mobile optimization, and crawlability.',
      icon: <FaChartLine />
    },
    {
      title: 'Link Building',
      description: 'Build high-quality backlinks to increase domain authority.',
      icon: <FaLink />
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            SEO
            <FiZap className="text-gray-800" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">
            Search Engine <span className="text-gray-800">Optimization</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data-driven SEO strategies that improve your visibility, drive organic traffic, 
            and help you dominate search rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {strategies.map((strategy, index) => (
            <div key={index} className="seo-card p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all duration-300 group">
              <div className="text-4xl text-gray-800 mb-4 w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {strategy.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{strategy.title}</h3>
              <p className="text-gray-600">{strategy.description}</p>
            </div>
          ))}
        </div>

        <div className="seo-card p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-3xl font-black text-gray-900 mb-6">SEO Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">+150%</div>
              <p className="text-gray-600">Organic Traffic</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">Top 3</div>
              <p className="text-gray-600">Google Rankings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-gray-900 mb-2">+200%</div>
              <p className="text-gray-600">Conversion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SEO;