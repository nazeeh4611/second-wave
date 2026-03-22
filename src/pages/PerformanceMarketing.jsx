import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiTarget,
  FiTrendingUp,
  FiBarChart2,
  FiDollarSign,
  FiZap,
  FiAward,
  FiFacebook,
} from 'react-icons/fi';
import { SiGoogle } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

function PerformanceMarketing() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.performance-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.performance-hero-subtitle',
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

      gsap.fromTo('.performance-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
          },
        }
      );

      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 2.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          },
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { 
      icon: <FiFacebook />, 
      title: 'Meta Ads', 
      desc: 'Facebook & Instagram advertising with precise targeting',
      features: ['Facebook Ads', 'Instagram Ads', 'Retargeting', 'Lookalike Audiences']
    },
    { 
      icon: <SiGoogle />, 
      title: 'Google Ads', 
      desc: 'Search & Display advertising that captures intent',
      features: ['Search Ads', 'Display Network', 'YouTube Ads', 'Shopping Ads']
    },
    { 
      icon: <FiBarChart2 />, 
      title: 'Analytics', 
      desc: 'Data-driven optimization for maximum efficiency',
      features: ['Conversion Tracking', 'Attribution', 'A/B Testing', 'ROI Analysis']
    },
    { 
      icon: <FiDollarSign />, 
      title: 'ROI Focused', 
      desc: 'Strategic budget allocation for maximum return',
      features: ['Budget Optimization', 'Bid Strategies', 'ROAS Tracking', 'Scaling']
    }
  ];

  const platforms = ['Meta', 'Google', 'TikTok', 'LinkedIn', 'Pinterest', 'Snapchat', 'Twitter', 'Amazon'];

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
            src="/serper.webp"
            alt="Performance Marketing Hero"
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
            Performance Marketing
            <FiZap style={{ color: ACCENT }} className="text-xs sm:text-sm" />
          </div>
          
          <h1 className="performance-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Performance</span>{' '}
            <span className="inline-block" style={{ color: ACCENT }}>Marketing</span>
          </h1>
          
          <p className="performance-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Data-driven advertising campaigns across Meta and Google. Advanced targeting with creative excellence to maximize ROI and drive qualified traffic that converts.
          </p>
          
          <p className="text-white/40 text-xs sm:text-sm mt-4 font-medium tracking-wide">
            Meta · Google · ROI Focused
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">OPTIMIZE</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { count: 380, suffix: '%', label: 'Avg ROI', icon: <FiTrendingUp /> },
              { count: 200, suffix: '+', label: 'Campaigns Run', icon: <FiTarget /> },
              { count: 50, suffix: 'M', label: 'Ad Spend Managed', icon: <FiDollarSign /> },
              { count: 12, suffix: 'x', label: 'ROAS Average', icon: <FiAward /> }
            ].map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="text-2xl sm:text-3xl mb-2 transition-colors" style={{ color: `${ACCENT}55` }}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
                  <span data-count={stat.count}>{stat.count}</span>{stat.suffix}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: `${ACCENT}99` }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section py-20 sm:py-24 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              What We Do
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Marketing <span style={{ color: ACCENT }}>Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="performance-card group relative overflow-hidden"
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

      <section className="py-20 sm:py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: `${ACCENT}99` }}>
              Platforms
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              We Master Every <span style={{ color: ACCENT }}>Channel</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="font-medium text-white/70">{platform}</span>
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
                <FiAward style={{ color: ACCENT }} />
                Ready to Scale?
              </div>
              
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Boost Your Advertising ROI
              </h2>
              
              <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's create data-driven campaigns that deliver measurable results and maximize your return on ad spend.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all group"
                  style={{ background: ACCENT, color: 'white' }}
                >
                  <span>Boost Your ROI</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all text-white backdrop-blur-sm"
                  style={{ border: `1px solid ${ACCENT}30`, background: 'transparent' }}
                >
                  View Case Studies
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

export default PerformanceMarketing;