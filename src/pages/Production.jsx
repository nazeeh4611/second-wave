import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCamera, FiFilm, FiMusic, FiEdit, FiZap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Production() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.production-section',
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
    <div ref={pageRef} className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Production
            <FiZap className="text-gray-800" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">Production</h1>
          <p className="text-2xl text-gray-700 mb-4 font-medium">Sound, Camera, Action</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            <div key={index} className="production-section p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all duration-300 text-center group">
              <div className="text-4xl text-gray-800 mb-4 w-16 h-16 mx-auto bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="production-section p-12 bg-gray-50 border border-gray-200 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">Production Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-2xl font-black text-gray-900 mb-2">4K/8K</div>
              <p className="text-gray-600">Cinematic Quality</p>
            </div>
            <div className="text-center p-6">
              <div className="text-2xl font-black text-gray-900 mb-2">Dolby Atmos</div>
              <p className="text-gray-600">Immersive Audio</p>
            </div>
            <div className="text-center p-6">
              <div className="text-2xl font-black text-gray-900 mb-2">VFX/Animation</div>
              <p className="text-gray-600">Visual Effects</p>
            </div>
          </div>
        </div>

        <div className="production-section text-center">
          <h3 className="text-3xl font-black text-gray-900 mb-6">Ready to Start Production?</h3>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all group">
            <span>Lights, Camera, Action!</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Production;