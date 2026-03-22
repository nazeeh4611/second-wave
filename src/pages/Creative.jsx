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
  FiFilm,
  FiTarget
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

function Creative() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.creative-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.creative-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      if (heroImgRef.current && heroSectionRef.current) {
        gsap.to(heroImgRef.current, {
          scale: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      gsap.fromTo('.creative-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.creative-process',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
          },
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { 
      icon: <FiZap />, 
      title: 'Creative Direction', 
      desc: 'Vision and concept development that pushes boundaries',
      features: ['Concept Development', 'Art Direction', 'Visual Strategy', 'Campaign Vision']
    },
    { 
      icon: <FiPenTool />, 
      title: 'Content Creation', 
      desc: 'Compelling visual content that tells your story',
      features: ['Photography', 'Videography', 'Graphic Design', 'Copywriting']
    },
    { 
      icon: <FiStar />, 
      title: 'Campaign Strategy', 
      desc: 'Strategic creative campaigns that drive growth',
      features: ['Campaign Planning', 'Brand Storytelling', 'Channel Strategy', 'Performance Creative']
    },
    { 
      icon: <FiTrendingUp />, 
      title: 'Brand Storytelling', 
      desc: 'Narratives that connect emotionally with audiences',
      features: ['Brand Narrative', 'Emotional Connection', 'Authentic Voice', 'Brand Experience']
    }
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-[#0a0a0a] pt-16 sm:pt-20">
      <section
        ref={heroSectionRef}
        className="relative overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div
          ref={heroImgRef}
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: 'center center', willChange: 'transform' }}
        >
          <img
            src="/sercre.webp"
            alt="Creative Hero"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div 
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full text-[10px] sm:text-xs backdrop-blur-md"
            style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, color: ACCENT }}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: ACCENT, animation: 'pulse 2s infinite' }} />
            Creative Studio
            <FiZap style={{ color: ACCENT }} className="text-xs sm:text-sm" />
          </div>
          
          <h1 className="creative-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Creative</span>{' '}
            <span className="inline-block" style={{ color: ACCENT }}>Excellence</span>
          </h1>
          
          <p className="creative-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Innovative creative solutions that drive brand growth and capture attention through compelling storytelling and strategic design thinking.
          </p>
          
          <p className="text-white/40 text-xs sm:text-sm mt-4 font-medium tracking-wide">
            Strategy · Growth · Innovation
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">CREATE</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      <section className="features-section py-20 sm:py-24 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              What We Create
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Creative <span style={{ color: ACCENT }}>Capabilities</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="creative-card group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div 
                  className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-all duration-500"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div 
                    className="text-3xl sm:text-4xl mb-4 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: `${ACCENT}15`, color: ACCENT }}
                  >
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm mb-4 leading-relaxed">{feature.desc}</p>
                  
                  <div className="space-y-1.5">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiArrowRight className="text-white/40 text-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section py-20 sm:py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              Our Process
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              From Concept to <span style={{ color: ACCENT }}>Creation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Ideation', 'Concept', 'Creation', 'Iteration'].map((step, index) => (
              <div key={index} className="creative-process text-center group">
                <div className="text-5xl font-black mb-4 transition-colors" style={{ color: `${ACCENT}20` }}>
                  0{index + 1}
                </div>
                <div className="w-12 h-0.5 mx-auto mb-4 transition-all duration-300 group-hover:w-16" style={{ background: `${ACCENT}40` }} />
                <h3 className="text-xl font-bold text-white mb-2">{step}</h3>
                <p className="text-sm text-white/40">
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

      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative p-8 sm:p-12 md:p-16 rounded-3xl overflow-hidden"
            style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${ACCENT} 0%, transparent 50%)`
            }} />
            
            <div className="relative z-10 text-center">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs backdrop-blur-sm mb-6"
                style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, color: ACCENT }}
              >
                <FiCamera style={{ color: ACCENT }} />
                Let's Create Together
              </div>
              
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Ready to Bring Your Ideas to Life?
              </h2>
              
              <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's collaborate to create something extraordinary that captures your vision and resonates with your audience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all group"
                  style={{ background: ACCENT, color: 'white' }}
                >
                  <span>Start Creating</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all text-white backdrop-blur-sm"
                  style={{ border: `1px solid ${ACCENT}30`, background: 'transparent' }}
                >
                  View Creative Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spinA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
      `}</style>
    </div>
  );
}

export default Creative;