import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaPlay, FaVideo, FaFilm, FaMagic } from 'react-icons/fa';

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
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          Video <span className="text-gradient">Production</span>
        </h1>
        
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          From concept to final cut, we create compelling video content that captures attention, 
          tells your story, and drives engagement across all platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="content-section glass-effect p-8 rounded-2xl">
              <div className="text-4xl text-purple-400 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="content-section glass-effect p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Pre-Production', 'Production', 'Post-Production', 'Delivery'].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {index + 1}
                </div>
                <h4 className="font-semibold">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoProduction;