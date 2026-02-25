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
  FiCamera,
  FiMessageSquare
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function BrandSolutions() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.solutions-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.solutions-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      gsap.fromTo('.solutions-hero-badge',
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.5, ease: 'back.out(1.6)' }
      );

      // Service cards animations
      gsap.fromTo('.solution-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.solutions-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Process steps animations
      gsap.fromTo('.solution-process',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation for icons
      gsap.utils.toArray('.solution-icon').forEach((icon, i) => {
        gsap.to(icon, {
          y: -5,
          duration: 2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Counter animation
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

  const services = [
    {
      icon: <FiTarget />,
      title: 'Brand Strategy',
      description: 'Develop a clear roadmap for your brand with positioning, messaging, and market differentiation that resonates with your target audience.',
      features: ['Market Research', 'Competitive Analysis', 'Brand Positioning', 'Messaging Framework']
    },
    {
      icon: <FiEye />,
      title: 'Visual Identity',
      description: 'Create a distinctive visual language including logos, color palettes, and typography that makes your brand instantly recognizable.',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Visual Systems']
    },
    {
      icon: <FiPenTool />,
      title: 'Brand Guidelines',
      description: 'Comprehensive guidelines to ensure consistent brand representation across all touchpoints and platforms.',
      features: ['Brand Rules', 'Usage Guidelines', 'Asset Library', 'Brand Standards']
    },
    {
      icon: <FiMessageSquare />,
      title: 'Brand Voice',
      description: 'Define your brand personality and communication style to connect authentically with your audience.',
      features: ['Tone of Voice', 'Messaging Architecture', 'Brand Story', 'Communication Style']
    }
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="solutions-hero-badge inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Brand Solutions
            <FiZap className="text-gray-800" />
          </div>
          
          <h1 className="solutions-hero-title font-black text-gray-900 mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span className="inline-block">Brand</span>{' '}
            <span className="inline-block text-gray-800">Solutions</span>
          </h1>
          
          <p className="solutions-hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive branding strategies that define your identity, tell your story, and create lasting connections with your audience through strategic design and compelling storytelling.
          </p>
          
          <p className="text-sm text-gray-500 mt-4 font-medium">Strategy · Identity · Guidelines · Voice</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">DISCOVER</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { count: 300, suffix: '+', label: 'Brands Transformed' },
              { count: 98, suffix: '%', label: 'Client Satisfaction' },
              { count: 45, suffix: '+', label: 'Design Awards' },
              { count: 15, suffix: 'x', label: 'Brand Recognition' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
                  <span data-count={stat.count}>{stat.count}</span>{stat.suffix}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              What We Offer
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              Comprehensive <span className="text-gray-800">Brand Solutions</span>
            </h2>
          </div>

          <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="solution-card group relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-100 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="solution-icon text-4xl mb-5 w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-800 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <span>Learn more</span>
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Our Approach
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              How We Build <span className="text-gray-800">Brands</span>
            </h2>
          </div>

          <div className="process-steps grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: '01',
                title: 'Discovery',
                desc: 'Research, analysis, and deep understanding of your market, audience, and competition to identify opportunities and differentiation.',
                points: ['Market Research', 'Audience Analysis', 'Competitor Review', 'Opportunity Mapping']
              },
              {
                phase: '02',
                title: 'Strategy',
                desc: 'Develop positioning, messaging, and visual direction aligned with your goals and designed to resonate with your target audience.',
                points: ['Brand Positioning', 'Messaging Strategy', 'Visual Direction', 'Brand Architecture']
              },
              {
                phase: '03',
                title: 'Execution',
                desc: 'Bring your brand to life through design, content, and consistent implementation across all touchpoints and platforms.',
                points: ['Identity Design', 'Content Creation', 'Guideline Development', 'Brand Launch']
              }
            ].map((item, index) => (
              <div key={index} className="solution-process group">
                <div className="text-6xl font-black text-gray-200 mb-4 group-hover:text-gray-300 transition-colors">
                  {item.phase}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 w-12 h-0.5 bg-gray-300 group-hover:w-16 group-hover:bg-gray-800 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Featured Work
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              Brands We've <span className="text-gray-800">Transformed</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white font-bold text-xl mb-1">Brand Name</h4>
                  <p className="text-gray-300 text-sm">Brand Strategy & Identity</p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FiArrowRight className="text-white" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-gray-800 hover:border-gray-800 hover:bg-gray-50 transition-all font-medium group"
            >
              <span>View All Case Studies</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
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
                <FiAward />
                Let's Build Your Brand
              </div>
              
              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Ready to Transform Your Brand?
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's create a brand that stands out, connects with your audience, and drives lasting success for your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all text-white"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrandSolutions;