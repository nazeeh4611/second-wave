import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaPaintBrush, FaBullseye, FaPalette, FaComment } from 'react-icons/fa';

function BrandSolutions() {
  useEffect(() => {
    gsap.fromTo('.brand-section',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 }
    );
  }, []);

  const services = [
    {
      title: 'Brand Strategy',
      description: 'Develop a clear roadmap for your brand with positioning, messaging, and market differentiation.',
      icon: <FaBullseye />
    },
    {
      title: 'Visual Identity',
      description: 'Create a distinctive visual language including logos, color palettes, and typography.',
      icon: <FaPaintBrush />
    },
    {
      title: 'Brand Guidelines',
      description: 'Comprehensive guidelines to ensure consistent brand representation across all touchpoints.',
      icon: <FaPalette />
    },
    {
      title: 'Brand Voice',
      description: 'Define your brand personality and communication style to connect authentically.',
      icon: <FaComment />
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          Brand <span className="text-gradient">Solutions</span>
        </h1>
        
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Comprehensive branding strategies that define your identity, tell your story, 
          and create lasting connections with your audience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="brand-section glass-effect p-8 rounded-2xl">
              <div className="text-4xl text-purple-400 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="brand-section glass-effect p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Our Branding Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Discovery', 'Strategy', 'Execution'].map((phase, index) => (
              <div key={index} className="p-6 bg-purple-500/10 rounded-xl">
                <h4 className="text-xl font-semibold mb-3 text-purple-400">{phase}</h4>
                <p className="text-gray-400">
                  {index === 0 && 'Research, analysis, and deep understanding of your market, audience, and competition.'}
                  {index === 1 && 'Develop positioning, messaging, and visual direction aligned with your goals.'}
                  {index === 2 && 'Bring your brand to life through design, content, and consistent implementation.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSolutions;