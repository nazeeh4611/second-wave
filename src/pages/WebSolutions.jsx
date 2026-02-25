import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaCode, FaMobile, FaShoppingCart, FaCogs } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';

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
    <div className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Web Solutions
            <FiZap className="text-gray-800" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">
            Web <span className="text-gray-800">Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge websites and web applications that are dynamic, user-friendly, 
            and optimized for performance and conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="web-section p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all group">
              <div className="text-4xl text-gray-800 mb-4 w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="web-section p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Development Process</h2>
          <div className="space-y-4">
            {['Planning & Strategy', 'Design & Prototype', 'Development', 'Testing & Launch'].map((phase, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{phase}</h4>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-gray-800 rounded-full" style={{ width: `${(index + 1) * 25}%` }}></div>
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