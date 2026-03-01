import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiCamera, FiTrendingUp, FiCode, FiHeart, FiStar, FiUsers,
  FiArrowRight, FiMonitor, FiFilm, FiZap, FiTarget
} from 'react-icons/fi';
import SilkWave from '../components/ParticlesWave';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.services-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.services-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      if (heroImgRef.current && heroSectionRef.current) {
        gsap.to(heroImgRef.current, {
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      const serviceItems = document.querySelectorAll('.service-scroll-item');
      serviceItems.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        const imgEl = item.querySelector('.service-scroll-img');
        const textEl = item.querySelector('.service-scroll-text');

        gsap.fromTo(imgEl,
          { x: isLeft ? -100 : 100, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(textEl,
          { x: isLeft ? 80 : -80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.fromTo('.process-step',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <FiCamera />,
      title: 'Branding',
      tagline: 'Eye catchy',
      description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions. From logo design to comprehensive brand guidelines that define who you are.',
      features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Logo Design'],
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=85',
      path: '/branding',
    },
    {
      icon: <FiTrendingUp />,
      title: 'SEO',
      tagline: 'On top',
      description: 'Dominate search engine rankings with our data-driven SEO strategies. Sustainable organic growth with higher conversions and maximum ROI across every search channel.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
      path: '/seo',
    },
    {
      icon: <FiCode />,
      title: 'Web Development',
      tagline: 'Dynamic, User Friendly',
      description: 'Build powerful, responsive websites that turn visitors into customers. Lightning-fast performance, seamless UX, and scalable solutions built for growth.',
      features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design'],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=85',
      path: '/web-development',
    },
    {
      icon: <FiMonitor />,
      title: 'Performance Marketing',
      tagline: 'Meta, Google',
      description: 'Data-driven advertising campaigns across Meta and Google. Advanced targeting with creative excellence to maximize ROI and deliver measurable results.',
      features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting'],
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=85',
      path: '/performance-marketing',
    },
    {
      icon: <FiHeart />,
      title: 'Social Media',
      tagline: 'Fun, Engagement',
      description: 'Build thriving communities and drive engagement through strategic social media marketing. Content that sparks conversations and turns followers into loyal customers.',
      features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics'],
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=85',
      path: '/social-media-marketing',
    },
    {
      icon: <FiStar />,
      title: 'Creative',
      tagline: 'Strategy, growth',
      description: 'Innovative creative solutions that drive brand growth and capture audience attention. Design thinking meets marketing expertise for campaigns that truly stand out.',
      features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Brand Storytelling'],
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85',
      path: '/creative',
    },
    {
      icon: <FiFilm />,
      title: 'Production',
      tagline: 'Sound, Camera, Action',
      description: 'Professional video and audio production that brings your vision to life. Cinematic quality that captivates audiences and communicates your message powerfully.',
      features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production'],
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85',
      path: '/production',
    },
    {
      icon: <FiUsers />,
      title: 'Digital PR',
      tagline: 'We can get anyone',
      description: 'Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications and build brand authority.',
      features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85',
      path: '/digital-pr',
    },
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-black pt-20">

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
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=90"
            alt="Services Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/8 border border-white/12 rounded-full text-xs text-white/60 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            What We Do
            <FiZap className="text-white/60" />
          </div>

          <h1 className="services-hero-title font-black text-white mb-6 leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Our</span>{' '}
            <span className="inline-block text-white/60">Services</span>
          </h1>

          <p className="services-hero-subtitle text-white/50 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to elevate your brand through innovation, creativity, and strategic excellence.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      <section className="bg-black py-0">
        {services.map((service, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className="service-scroll-item relative overflow-hidden"
              style={{ minHeight: '90vh' }}
            >
              <div
                className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[90vh]`}
              >
                <div className="service-scroll-img relative w-full lg:w-1/2 overflow-hidden" style={{ minHeight: '50vh' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${isLeft ? 'bg-gradient-to-r from-transparent to-black/80' : 'bg-gradient-to-l from-transparent to-black/80'} lg:block hidden`} />
                  <div className="absolute inset-0 bg-black/20 lg:hidden" />
                </div>

                <div className="service-scroll-text relative w-full lg:w-1/2 flex items-center bg-black z-10">
                  <div className={`px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-0 max-w-xl ${isLeft ? 'lg:ml-0' : 'lg:mr-0'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center text-white/60 text-xl">
                        {service.icon}
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">{service.tagline}</span>
                    </div>

                    <div className="text-6xl sm:text-7xl font-black text-white/5 select-none leading-none mb-3" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                      {service.title}
                    </h2>

                    <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/50 hover:border-white/25 hover:text-white/70 transition-colors">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={service.path}
                      className="inline-flex items-center gap-3 border border-white/20 text-white font-semibold rounded-full px-7 py-3.5 text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 group backdrop-blur-sm"
                    >
                      <span>Learn More</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {index < services.length - 1 && (
                <div className="absolute bottom-0 left-8 right-8 h-px bg-white/5" />
              )}
            </div>
          );
        })}
      </section>

      <section className="process-section py-20 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-white/30 uppercase mb-4">
              Our Approach
            </span>
            <h2 className="font-black text-white text-3xl sm:text-4xl md:text-5xl">
              How We <span className="text-white/30">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery', desc: 'Deep dive into your brand, goals, and audience to find the best solutions' },
              { number: '02', title: 'Strategy', desc: 'Develop data-driven strategies ensuring every decision is backed by insights' },
              { number: '03', title: 'Execution', desc: 'Creative execution with continuous optimization for perfect project delivery' },
              { number: '04', title: 'Growth', desc: 'Continuous growth and iteration to help your brand achieve long-term success' },
            ].map((item, index) => (
              <div key={index} className="process-step text-center group">
                <div className="text-5xl font-black text-white/8 mb-4 group-hover:text-white/15 transition-colors">
                  {item.number}
                </div>
                <div className="w-12 h-px bg-white/15 mx-auto mb-5 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90"
                alt="CTA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 rounded-full text-sm mb-6 backdrop-blur-sm border border-white/10">
                <FiTarget className="text-white/60" />
                <span className="text-white/60">Let's Create Something Amazing</span>
              </div>

              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Ready to Transform Your Brand?
              </h2>

              <p className="text-white/45 mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Let's create something amazing together and take your brand to new heights. Our team is ready to transform your digital presence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all group"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/8 hover:border-white/35 transition-all text-white backdrop-blur-sm"
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

export default Services;