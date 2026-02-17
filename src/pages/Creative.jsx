import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiStar,
  FiZap,          // ✅ replace
  FiPenTool,
  FiTrendingUp
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Creative() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.creative-section',
        { y: 100, opacity: 0 },
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
            <span className="gradient-text">Creative</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Strategy, growth</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Innovative creative solutions that drive brand growth and capture attention
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FiZap />, title: 'Creative Direction', desc: 'Vision and concept development' },
            { icon: <FiPenTool />, title: 'Content Creation', desc: 'Compelling visual content' },
            { icon: <FiStar />, title: 'Campaign Strategy', desc: 'Strategic creative campaigns' },
            { icon: <FiTrendingUp />, title: 'Brand Storytelling', desc: 'Narratives that connect' }
          ].map((item, index) => (
            <div key={index} className="creative-section glass-morphism p-6 rounded-2xl text-center">
              <div className="text-4xl text-[#14F195] mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="creative-section glass-morphism p-12 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Creative Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Ideation', 'Concept', 'Creation', 'Iteration'].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">0{index + 1}</div>
                <h3 className="text-xl font-bold">{step}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="creative-section text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Creative?</h3>
          <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 gradient-bg rounded-full font-semibold hover-glow group">
            <span>Start Creating</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Creative;