import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiCode,
  FiSmartphone,
  FiShoppingCart,
  FiZap,
  FiAward,
  FiTarget,
  FiLayout,
  FiDatabase
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function WebDevelopment() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo('.web-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.web-hero-subtitle',
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
      gsap.fromTo('.web-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
          },
        }
      );

      // Tech stack animations
      gsap.fromTo('.tech-item',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.tech-section',
            start: 'top 75%',
          },
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FiCode />,
      title: 'Custom Development',
      desc: 'Tailored solutions built with modern technologies for your specific needs',
      features: ['React/Next.js', 'Node.js', 'Python/Django', 'PHP/Laravel']
    },
    {
      icon: <FiShoppingCart />,
      title: 'E-commerce',
      desc: 'Powerful online stores that drive sales and provide seamless shopping experiences',
      features: ['Shopify Plus', 'WooCommerce', 'Magento', 'Custom Carts']
    },
    {
      icon: <FiSmartphone />,
      title: 'Responsive Design',
      desc: 'Perfect on all devices - from mobile to desktop, ensuring consistent experience',
      features: ['Mobile First', 'Cross-browser', 'Touch Optimized', 'Progressive Web']
    },
    {
      icon: <FiZap />,
      title: 'Performance',
      desc: 'Lightning fast load times and optimal Core Web Vitals for better UX and SEO',
      features: ['Code Splitting', 'Image Optimization', 'Caching', 'CDN Integration']
    }
  ];

  const techStack = ['React', 'Next.js', 'Node.js', 'MongoDB', 'Vue.js', 'Laravel', 'WordPress', 'Shopify', 'TypeScript', 'GraphQL', 'Tailwind', 'AWS'];

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
            src="/serweb.webp"
            alt="Web Development Hero"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs text-white/70 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            Web Development
            <FiZap className="text-white/70 text-xs sm:text-sm" />
          </div>
          
          <h1 className="web-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Website</span>{' '}
            <span className="inline-block text-white/70">Development</span>
          </h1>
          
          <p className="web-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Build powerful, responsive websites that convert visitors into customers with lightning-fast performance and seamless user experiences.
          </p>
          
          <p className="text-white/40 text-xs sm:text-sm mt-4 font-medium tracking-wide">
            Dynamic · User Friendly · Scalable
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">BUILD</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 sm:py-24 md:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3 sm:mb-4">
              What We Build
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
              Development <span className="text-white/40">Services</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              Custom web solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="web-card group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-500">
                  <div className="text-3xl sm:text-4xl mb-4 w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
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

      {/* Tech Stack Section */}
      <section className="tech-section py-20 sm:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3 sm:mb-4">
              Technology Stack
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              Modern <span className="text-white/40">Tech</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="tech-item px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-full text-sm sm:text-base text-white/70 hover:bg-white/10 hover:border-white/30 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/serweb.webp"
                alt="CTA"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 50%' }}
              />
              <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
            </div>
            
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs text-white/70 backdrop-blur-sm border border-white/10 mb-6">
                <FiTarget className="text-white/70" />
                <span>Ready to Build Something Amazing?</span>
              </div>
              
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Start Your Project Today
              </h2>
              
              <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
                Let's turn your ideas into a powerful web presence that drives results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-sm sm:text-base hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-white/30 rounded-full font-bold text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all text-white backdrop-blur-sm"
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

export default WebDevelopment;