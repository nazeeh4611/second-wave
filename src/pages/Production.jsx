import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiArrowRight, FiCamera, FiFilm, FiMusic, FiEdit, FiZap, 
  FiTarget, FiVideo, FiHeadphones, FiAperture 
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

function Production() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.production-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.production-hero-subtitle',
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

      gsap.fromTo('.production-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.cards-section',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.capability-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
          scrollTrigger: {
            trigger: '.capabilities-section',
            start: 'top 75%',
          },
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <FiCamera />,
      title: 'Video Production',
      description: 'Commercials, brand films, corporate content',
      features: ['Commercials', 'Brand Films', 'Corporate Videos', 'Music Videos', 'Documentaries', 'Event Coverage']
    },
    {
      icon: <FiFilm />,
      title: 'Post-Production',
      description: 'Editing, color grading, VFX, motion graphics',
      features: ['Editing', 'Color Grading', 'VFX', 'Motion Graphics', 'Sound Mixing', 'Title Design']
    },
    {
      icon: <FiMusic />,
      title: 'Sound Design',
      description: 'Audio production, mixing, mastering, foley',
      features: ['Sound Mixing', 'Foley Artistry', 'Voice Over', 'Audio Mastering', 'Sound Effects', 'Podcast Production']
    },
    {
      icon: <FiEdit />,
      title: 'Photography',
      description: 'Product, lifestyle, corporate, event',
      features: ['Product Photography', 'Lifestyle Shoots', 'Corporate Portraits', 'Event Coverage', 'Behind the Scenes', 'Campaign Shoots']
    }
  ];

  const capabilities = [
    { value: '4K/8K', label: 'Cinematic Quality', icon: <FiVideo /> },
    { value: 'Dolby Atmos', label: 'Immersive Audio', icon: <FiHeadphones /> },
    { value: 'VFX/Animation', label: 'Visual Effects', icon: <FiAperture /> }
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
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=90"
            alt="Production Hero"
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
            Production
            <FiZap style={{ color: ACCENT }} className="text-xs sm:text-sm" />
          </div>
          <h1 className="production-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Sound,</span>{' '}
            <span className="inline-block">Camera,</span>{' '}
            <span className="inline-block" style={{ color: ACCENT }}>Action</span>
          </h1>
          <p className="production-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Professional video and audio production services that bring your vision to life with cinematic quality and creative excellence.
          </p>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">SCROLL</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      <section className="cards-section py-20 sm:py-24 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              Our Services
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Production <span style={{ color: ACCENT }}>Capabilities</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              End-to-end production services from concept to final delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="production-card group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div 
                  className="relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-500"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div 
                    className="text-4xl mb-4 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: `${ACCENT}15`, color: ACCENT }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{service.description}</p>
                  
                  <div className="space-y-1.5">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
                        {feature}
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

      <section className="capabilities-section py-20 sm:py-24 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              Technical Excellence
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              Production <span style={{ color: ACCENT }}>Specs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => (
              <div key={index} className="capability-item group">
                <div 
                  className="relative p-8 rounded-2xl text-center transition-all duration-500"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="text-4xl mb-4 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                    {cap.icon}
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">
                    {cap.value}
                  </div>
                  
                  <p className="text-white/40 text-sm tracking-wide">
                    {cap.label}
                  </p>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-px transition-all duration-300" style={{ background: ACCENT }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: `${ACCENT}99` }}>
                Our Process
              </span>
              <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-6">
                From Concept to <span style={{ color: ACCENT }}>Final Cut</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
                We handle every aspect of production with meticulous attention to detail, ensuring your vision is realized exactly as imagined. From pre-production planning to final delivery, our team of experts brings decades of combined experience to every project.
              </p>
              
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Pre-Production', desc: 'Planning, scripting, storyboarding, casting' },
                  { step: '02', title: 'Production', desc: 'Filming, directing, sound recording, lighting' },
                  { step: '03', title: 'Post-Production', desc: 'Editing, color grading, VFX, sound design' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="text-2xl font-black transition-colors" style={{ color: `${ACCENT}20` }}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=90"
                  alt="Production Process"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2 rounded-xl p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  { value: '10+', label: 'Years Exp' },
                  { value: '500+', label: 'Projects' },
                  { value: '24/7', label: 'Support' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-black text-white">{stat.value}</div>
                    <div className="text-[8px] uppercase tracking-wider" style={{ color: `${ACCENT}99` }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative p-8 sm:p-12 md:p-16 rounded-3xl overflow-hidden"
            style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=2000&q=90"
                alt="CTA"
                className="w-full h-full object-cover opacity-20"
                style={{ objectPosition: '50% 50%' }}
              />
            </div>
            
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="relative z-10 text-center">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs backdrop-blur-sm mb-6"
                style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, color: ACCENT }}
              >
                <FiTarget style={{ color: ACCENT }} />
                <span>Ready to Create?</span>
              </div>
              
              <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
                Lights, Camera,{' '}
                <span style={{ color: ACCENT }}>Action!</span>
              </h2>
              
              <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                Let's bring your vision to life with our professional production services. From concept to final cut, we're here to make it happen.
              </p>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all group"
                style={{ background: ACCENT, color: 'white' }}
              >
                <span>Start Your Project</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
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

export default Production;