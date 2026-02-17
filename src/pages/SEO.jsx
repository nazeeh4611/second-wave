import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaSearch, FaChartLine, FaLink, FaFileAlt } from 'react-icons/fa';

function SEO() {
  useEffect(() => {
    gsap.fromTo('.seo-card',
      { opacity: 0, rotateY: 90 },
      { opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.1 }
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
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          Search Engine <span className="text-gradient">Optimization</span>
        </h1>
        
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Data-driven SEO strategies that improve your visibility, drive organic traffic, 
          and help you dominate search rankings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {strategies.map((strategy, index) => (
            <div key={index} className="seo-card glass-effect p-8 rounded-2xl">
              <div className="text-4xl text-purple-400 mb-4">{strategy.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{strategy.title}</h3>
              <p className="text-gray-400">{strategy.description}</p>
            </div>
          ))}
        </div>

        <div className="seo-card glass-effect p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">SEO Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">+150%</div>
              <p className="text-gray-400">Organic Traffic</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">Top 3</div>
              <p className="text-gray-400">Google Rankings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">+200%</div>
              <p className="text-gray-400">Conversion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SEO;