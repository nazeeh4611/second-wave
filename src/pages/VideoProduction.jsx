import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaPlay, FaVideo, FaFilm, FaMagic } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

function VideoProduction() {
  useEffect(() => {
    gsap.fromTo('.content-section',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    );
  }, []);

  const services = [
    {
      title: 'Commercial Production',
      description: 'High-impact commercials that tell your brand story and drive results.',
      icon: <FaPlay />
    },
    {
      title: 'Brand Films',
      description: 'Cinematic brand storytelling that connects with your audience emotionally.',
      icon: <FaFilm />
    },
    {
      title: 'Motion Graphics',
      description: 'Dynamic animations and visual effects that bring ideas to life.',
      icon: <FaMagic />
    },
    {
      title: 'Post-Production',
      description: 'Professional editing, color grading, and sound design for polished content.',
      icon: <FaVideo />
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Video Production
            <FiZap className="text-gray-800" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">
            Video <span className="text-gray-800">Production</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to final cut, we create compelling video content that captures attention, 
            tells your story, and drives engagement across all platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="content-section p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all group">
              <div className="text-4xl text-gray-800 mb-4 w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="content-section p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Pre-Production', 'Production', 'Post-Production', 'Delivery'].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-gray-900">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoProduction;