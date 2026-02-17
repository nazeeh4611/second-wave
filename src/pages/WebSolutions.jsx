import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaCode, FaMobile, FaShoppingCart, FaCogs } from 'react-icons/fa';

function WebSolutions() {
  useEffect(() => {
    gsap.fromTo('.web-section',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 }
    );
  }, []);

  const services = [
    {
      title: 'Custom Development',
      description: 'Tailored web solutions built with modern technologies for optimal performance.',
      icon: <FaCode />,
      tech: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      title: 'E-commerce',
      description: 'Powerful online stores that drive sales and provide seamless shopping experiences.',
      icon: <FaShoppingCart />,
      tech: ['Shopify', 'WooCommerce', 'Magento', 'Custom']
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first designs that look and perform perfectly on all devices.',
      icon: <FaMobile />,
      tech: ['Mobile-First', 'Cross-Browser', 'Optimized']
    },
    {
      title: 'CMS Integration',
      description: 'Easy-to-manage content systems that give you full control of your website.',
      icon: <FaCogs />,
      tech: ['WordPress', 'Sanity', 'Contentful', 'Custom']
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          Web <span className="text-gradient">Solutions</span>
        </h1>
        
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Cutting-edge websites and web applications that are dynamic, user-friendly, 
          and optimized for performance and conversions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="web-section glass-effect p-8 rounded-2xl">
              <div className="text-4xl text-purple-400 mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="web-section glass-effect p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Development Process</h2>
          <div className="space-y-4">
            {['Planning & Strategy', 'Design & Prototype', 'Development', 'Testing & Launch'].map((phase, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{phase}</h4>
                  <div className="h-2 bg-gray-700 rounded-full mt-2">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(index + 1) * 25}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebSolutions;