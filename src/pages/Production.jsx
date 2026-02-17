import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCamera, FiFilm, FiMusic, FiEdit } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Production() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.production-section',
        { x: 100, opacity: 0 },
        {
          x: 0,
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
            <span className="gradient-text">Production</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Sound, Camera, Action</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional video and audio production services that bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FiCamera />, title: 'Video Production', desc: 'Commercials, brand films, content' },
            { icon: <FiFilm />, title: 'Post-Production', desc: 'Editing, color grading, VFX' },
            { icon: <FiMusic />, title: 'Sound Design', desc: 'Audio production and mixing' },
            { icon: <FiEdit />, title: 'Photography', desc: 'Product, lifestyle, corporate' }
          ].map((item, index) => (
            <div key={index} className="production-section glass-morphism p-6 rounded-2xl text-center">
              <div className="text-4xl text-[#9945FF] mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="production-section glass-morphism p-12 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Production Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-2xl font-bold mb-2">4K/8K</div>
              <p className="text-gray-400">Cinematic Quality</p>
            </div>
            <div className="text-center p-6">
              <div className="text-2xl font-bold mb-2">Dolby Atmos</div>
              <p className="text-gray-400">Immersive Audio</p>
            </div>
            <div className="text-center p-6">
              <div className="text-2xl font-bold mb-2">VFX/Animation</div>
              <p className="text-gray-400">Visual Effects</p>
            </div>
          </div>
        </div>

        <div className="production-section text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Production?</h3>
          <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 gradient-bg rounded-full font-semibold hover-glow group">
            <span>Lights, Camera, Action!</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Production;