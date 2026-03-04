import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiEye,
  FiHeart,
  FiStar,
  FiTarget,
  FiZap,
  FiPenTool,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiGlobe,
  FiDroplet,
  FiLayout,
  FiBookOpen,
  FiCommand
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Branding() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo('.brand-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.brand-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      // Hero image parallax
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

      // Feature cards animations
      gsap.fromTo('.feature-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
          },
        }
      );

      // Process steps animations
      gsap.fromTo('.process-step',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
          },
        }
      );

      // Stats animation
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

      // Floating animation for icons
      gsap.utils.toArray('.feature-icon').forEach((icon, i) => {
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
    { 
      icon: <FiEye />, 
      title: 'Visual Identity', 
      desc: 'Distinctive logos, color palettes, and typography that make your brand instantly recognizable',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Visual Systems']
    },
    { 
      icon: <FiHeart />, 
      title: 'Brand Strategy', 
      desc: 'Strategic positioning and messaging framework that connects with your target audience',
      features: ['Market Research', 'Positioning', 'Messaging', 'Brand Architecture']
    },
    { 
      icon: <FiStar />, 
      title: 'Brand Guidelines', 
      desc: 'Comprehensive rules for consistent branding across all touchpoints and platforms',
      features: ['Usage Rules', 'Brand Voice', 'Visual Standards', 'Templates']
    },
    { 
      icon: <FiTarget />, 
      title: 'Brand Voice', 
      desc: 'Unique personality and communication style that resonates with your customers',
      features: ['Tone of Voice', 'Copywriting', 'Storytelling', 'Content Strategy']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      desc: 'Deeply explore your brand core, market positioning, and target audience to identify unique value propositions',
      icon: <FiUsers />
    },
    {
      step: '02',
      title: 'Strategy',
      desc: 'Develop comprehensive brand strategy including positioning, messaging, and visual direction to ensure market differentiation',
      icon: <FiTrendingUp />
    },
    {
      step: '03',
      title: 'Design',
      desc: 'Transform strategy into compelling visual identity systems, creating cohesive brand experiences',
      icon: <FiLayout />
    },
    {
      step: '04',
      title: 'Implement',
      desc: 'Execute brand strategy across all touchpoints, ensuring consistency and continuous optimization',
      icon: <FiGlobe />
    }
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-black pt-16 sm:pt-20">
      {/* Hero Section */}
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
            src="/serbran.webp"
            alt="Branding Hero"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="brand-hero-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs text-white/70 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            Brand Identity
            <FiZap className="text-white/70 text-xs sm:text-sm" />
          </div>
          
          <h1 className="brand-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Brand</span>{' '}
            <span className="inline-block text-white/70">Identity</span>
          </h1>
          
          <p className="brand-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Create unforgettable brand experiences that resonate with your audience and stand out in the digital landscape through strategic design and compelling storytelling.
          </p>
          
          <p className="text-white/40 text-xs sm:text-sm mt-4 font-medium tracking-wide">
            Eye catchy · Memorable · Distinctive
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">DISCOVER</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 sm:py-24 md:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3 sm:mb-4">
              What We Deliver
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Comprehensive <span className="text-white/40">Branding</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              We build brands that leave lasting impressions and create emotional connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-500">
                  <div className="feature-icon text-3xl sm:text-4xl mb-4 w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm mb-4 leading-relaxed">{feature.desc}</p>
                  
                  {/* Features list */}
                  <div className="space-y-1.5">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiArrowRight className="text-white/40 text-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { count: 300, suffix: '+', label: 'Brands Created', icon: <FiPenTool /> },
              { count: 95, suffix: '%', label: 'Client Satisfaction', icon: <FiHeart /> },
              { count: 50, suffix: '+', label: 'Awards Won', icon: <FiAward /> },
              { count: 12, suffix: 'x', label: 'Avg Brand Lift', icon: <FiTrendingUp /> }
            ].map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="text-2xl sm:text-3xl text-white/20 mb-2 group-hover:text-white/30 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
                  <span data-count={stat.count}>{stat.count}</span>{stat.suffix}
                </div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-20 sm:py-24 md:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3 sm:mb-4">
              Our Process
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              How We Build <span className="text-white/40">Brands</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              A systematic approach to creating powerful brand identities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {process.map((item, index) => (
              <div key={index} className="process-step group">
                <div className="relative p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500">
                  {/* Step number */}
                  <div className="text-5xl sm:text-6xl font-black text-white/10 mb-4 group-hover:text-white/20 transition-colors">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-2xl sm:text-3xl text-white/40 mb-4 group-hover:text-white/60 transition-colors">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  
                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-px bg-white/30 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=90"
                alt="CTA"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 50%' }}
              />
              <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
            </div>
            
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs text-white/70 backdrop-blur-sm border border-white/10 mb-6">
                <FiAward className="text-white/70" />
                <span>Let's Build Your Brand</span>
              </div>
              
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Ready to Create a Brand That Stands Out?
              </h2>
              
              <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's craft a brand identity that captures your essence and connects with your audience on a deeper level.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-sm sm:text-base hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Start Your Brand Journey</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-white/30 rounded-full font-bold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all text-white backdrop-blur-sm"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Branding;