import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiStar,
  FiZap,
  FiPenTool,
  FiTrendingUp,
  FiAward,
  FiCamera,
  FiFilm
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Creative() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.creative-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.creative-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      // Feature cards animations
      gsap.fromTo('.creative-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.creative-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Process steps animations
      gsap.fromTo('.creative-process',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation
      gsap.utils.toArray('.creative-icon').forEach((icon, i) => {
        gsap.to(icon, {
          y: -5,
          duration: 2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <FiZap />, title: 'Creative Direction', desc: 'Vision and concept development that pushes boundaries and captures attention' },
    { icon: <FiPenTool />, title: 'Content Creation', desc: 'Compelling visual content that tells your story and engages your audience' },
    { icon: <FiStar />, title: 'Campaign Strategy', desc: 'Strategic creative campaigns that drive growth and brand awareness' },
    { icon: <FiTrendingUp />, title: 'Brand Storytelling', desc: 'Narratives that connect emotionally and build lasting relationships' }
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Creative Studio
            <FiZap className="text-gray-800" />
          </div>
          
          <h1 className="creative-hero-title font-black text-gray-900 mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span className="inline-block">Creative</span>{' '}
            <span className="inline-block text-gray-800">Excellence</span>
          </h1>
          
          <p className="creative-hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Innovative creative solutions that drive brand growth and capture attention through compelling storytelling and strategic design thinking.
          </p>
          
          <p className="text-sm text-gray-500 mt-4 font-medium">Strategy · Growth · Innovation</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">EXPLORE</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              What We Create
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              Creative <span className="text-gray-800">Capabilities</span>
            </h2>
          </div>

          <div className="creative-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="creative-card group relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-100 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="creative-icon text-3xl mb-4 w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                  
                  <div className="mt-4 w-8 h-0.5 bg-gray-300 group-hover:w-12 group-hover:bg-gray-800 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Our Process
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              From Concept to <span className="text-gray-800">Creation</span>
            </h2>
          </div>

          <div className="process-grid grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Ideation', 'Concept', 'Creation', 'Iteration'].map((step, index) => (
              <div key={index} className="creative-process text-center group">
                <div className="text-5xl font-black text-gray-200 mb-4 group-hover:text-gray-300 transition-colors">
                  0{index + 1}
                </div>
                <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4 group-hover:w-16 group-hover:bg-gray-800 transition-all duration-300" />
                <h3 className="text-xl font-bold text-gray-900">{step}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {index === 0 && 'Brainstorming and creative exploration'}
                  {index === 1 && 'Developing core ideas and direction'}
                  {index === 2 && 'Bringing concepts to life'}
                  {index === 3 && 'Refining and perfecting the work'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)'
            }} />
            
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6 backdrop-blur-sm">
                <FiCamera />
                Let's Create Together
              </div>
              
              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Ready to Bring Your Ideas to Life?
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's collaborate to create something extraordinary that captures your vision and resonates with your audience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Start Creating</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all text-white"
                >
                  View Creative Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Creative;