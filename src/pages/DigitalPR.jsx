import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiUsers,
  FiGlobe,
  FiAward,
  FiMessageSquare,
  FiZap,
  FiTrendingUp,
  FiTarget,
  FiStar
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

function DigitalPR() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pr-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.pr-hero-subtitle',
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

      gsap.fromTo('.pr-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.media-badge',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.media-section',
            start: 'top 75%',
          },
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { 
      icon: <FiUsers />, 
      title: 'Influencer Relations', 
      desc: 'Connect with key voices and thought leaders',
      features: ['Influencer Outreach', 'Partnerships', 'Brand Ambassadors', 'Campaign Management']
    },
    { 
      icon: <FiGlobe />, 
      title: 'Media Outreach', 
      desc: 'Get featured in top publications worldwide',
      features: ['Media Relations', 'Press Releases', 'Story Pitching', 'Interview Placement']
    },
    { 
      icon: <FiAward />, 
      title: 'Brand Reputation', 
      desc: 'Build and protect your brand image',
      features: ['Reputation Management', 'Crisis Communication', 'Brand Monitoring', 'Online Presence']
    },
    { 
      icon: <FiMessageSquare />, 
      title: 'Crisis Management', 
      desc: 'Navigate challenges with strategic communication',
      features: ['Crisis Planning', 'Response Strategy', 'Media Training', 'Damage Control']
    }
  ];

  const mediaOutlets = ['Forbes', 'TechCrunch', 'Vogue', 'WSJ', 'CNN', 'BBC', 'NYT', 'Bloomberg', 'Reuters', 'AP', 'BuzzFeed', 'Mashable'];

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
            src="/serdig.webp"
            alt="Digital PR Hero"
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
            Digital PR
            <FiZap style={{ color: ACCENT }} className="text-xs sm:text-sm" />
          </div>
          
          <h1 className="pr-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Digital</span>{' '}
            <span className="inline-block" style={{ color: ACCENT }}>PR</span>
          </h1>
          
          <p className="pr-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications worldwide.
          </p>
          
          <p className="text-white/40 text-xs sm:text-sm mt-4 font-medium tracking-wide">
            We can get anyone · Media relations · Brand reputation
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">CONNECT</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      <section className="features-section py-20 sm:py-24 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              What We Offer
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              PR <span style={{ color: ACCENT }}>Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="pr-card group relative overflow-hidden"
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

      <section className="media-section py-20 sm:py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              Media Coverage
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              Featured in Top <span style={{ color: ACCENT }}>Publications</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mediaOutlets.map((media, index) => (
              <div
                key={index}
                className="media-badge text-center p-4 rounded-xl transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="font-medium text-white/70">{media}</span>
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
                <FiTrendingUp style={{ color: ACCENT }} />
                Ready to Make Headlines?
              </div>
              
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Get Your Brand in the Spotlight
              </h2>
              
              <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's build relationships with media and influencers to share your story with the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all group"
                  style={{ background: ACCENT, color: 'white' }}
                >
                  <span>Get Featured</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all text-white backdrop-blur-sm"
                  style={{ border: `1px solid ${ACCENT}30`, background: 'transparent' }}
                >
                  View Success Stories
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

export default DigitalPR;