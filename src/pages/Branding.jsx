import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiEye, FiHeart, FiStar, FiTarget } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Branding() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.brand-section',
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
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Branding</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Eye catchy</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Create unforgettable brand experiences that resonate with your audience and stand out in the digital landscape
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FiEye />, title: 'Visual Identity', desc: 'Distinctive logos, color palettes, and typography' },
            { icon: <FiHeart />, title: 'Brand Strategy', desc: 'Strategic positioning and messaging framework' },
            { icon: <FiStar />, title: 'Brand Guidelines', desc: 'Comprehensive rules for consistent branding' },
            { icon: <FiTarget />, title: 'Brand Voice', desc: 'Unique personality and communication style' }
          ].map((item, index) => (
            <div key={index} className="brand-section glass-morphism p-6 rounded-2xl text-center">
              <div className="text-4xl text-[#9945FF] mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="brand-section glass-morphism p-12 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Branding Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: '深入了解您的品牌、市场和受众' },
              { step: '02', title: 'Strategy', desc: '制定独特的品牌定位和策略' },
              { step: '03', title: 'Execution', desc: '将策略转化为视觉和内容' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="brand-section text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Build Your Brand?</h3>
          <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 gradient-bg rounded-full font-semibold hover-glow group">
            <span>Start Your Brand Journey</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Branding;