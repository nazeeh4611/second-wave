import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCode, FiSmartphone, FiShoppingCart, FiZap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function WebDevelopment() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.web-section',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top center+=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Website Development</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Dynamic, User Friendly</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Build powerful, responsive websites that convert visitors into customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FiCode />, title: 'Custom Development', desc: 'Tailored solutions with modern tech' },
            { icon: <FiShoppingCart />, title: 'E-commerce', desc: 'Powerful online stores' },
            { icon: <FiSmartphone />, title: 'Responsive Design', desc: 'Perfect on all devices' },
            { icon: <FiZap />, title: 'Performance', desc: 'Lightning fast load times' }
          ].map((item, index) => (
            <div key={index} className="web-section glass-morphism p-6 rounded-2xl text-center">
              <div className="text-4xl text-[#9945FF] mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="web-section glass-morphism p-12 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'Node.js', 'MongoDB', 'Vue.js', 'Laravel', 'WordPress', 'Shopify'].map((tech, index) => (
              <span key={index} className="px-6 py-3 bg-white/5 rounded-full text-lg border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="web-section text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h3>
          <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 gradient-bg rounded-full font-semibold hover-glow group">
            <span>Start Your Project</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WebDevelopment;