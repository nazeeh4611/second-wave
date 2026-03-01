import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiCamera, FiTrendingUp, FiCode, FiHeart, FiStar, FiUsers,
  FiArrowRight, FiMonitor, FiFilm, FiZap, FiTarget
} from 'react-icons/fi';

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

      const serviceItems = document.querySelectorAll('.service-scroll-item');
      serviceItems.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        const imgEl = item.querySelector('.service-scroll-img');
        const textEl = item.querySelector('.service-scroll-text');

        if (isLeft) {
          gsap.fromTo(imgEl,
            { x: '-120%', opacity: 0.3 },
            {
              x: '0%', opacity: 0.9, duration: 2, ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.8,
              },
            }
          );
        } else {
          gsap.fromTo(imgEl,
            { x: '120%', opacity: 0.3 },
            {
              x: '0%', opacity: 0.9, duration: 2, ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.8,
              },
            }
          );
        }

        gsap.fromTo(textEl,
          { x: isLeft ? '40%' : '-40%', opacity: 0.4 },
          {
            x: '0%', opacity: 1, duration: 2, ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
            },
          }
        );

        gsap.fromTo(item.querySelector('.service-content-bg'),
          { scale: 1.2, opacity: 0.4 },
          {
            scale: 1, opacity: 0.8, duration: 2,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
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
      description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions.',
      longDescription: 'From logo design to comprehensive brand guidelines that define who you are. We craft visual stories that resonate with your target audience and create emotional connections that last.',
      features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Logo Design', 'Brand Voice', 'Market Positioning'],
      image: '/serbran.webp',
      path: '/branding',
    },
    {
      icon: <FiTrendingUp />,
      title: 'SEO',
      tagline: 'On top',
      description: 'Dominate search engine rankings with our data-driven SEO strategies.',
      longDescription: 'Sustainable organic growth with higher conversions and maximum ROI across every search channel. We use advanced analytics and proven techniques to get you to the top.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building', 'Local SEO', 'Analytics'],
      image: '/serseo.webp',
      path: '/seo',
    },
    {
      icon: <FiCode />,
      title: 'Web Development',
      tagline: 'Dynamic, User Friendly',
      description: 'Build powerful, responsive websites that turn visitors into customers.',
      longDescription: 'Lightning-fast performance, seamless UX, and scalable solutions built for growth. We create digital experiences that not only look beautiful but also drive results.',
      features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design', 'Web Apps', 'Maintenance'],
      image: '/serweb.webp',
      path: '/web-development',
    },
    {
      icon: <FiMonitor />,
      title: 'Performance Marketing',
      tagline: 'Meta, Google',
      description: 'Data-driven advertising campaigns across Meta and Google.',
      longDescription: 'Advanced targeting with creative excellence to maximize ROI and deliver measurable results. We optimize every campaign to ensure you get the best possible return.',
      features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting', 'Analytics', 'Conversion Optimization'],
      image: '/serper.webp',
      path: '/performance-marketing',
    },
    {
      icon: <FiHeart />,
      title: 'Social Media',
      tagline: 'Fun, Engagement',
      description: 'Build thriving communities and drive engagement through strategic social media.',
      longDescription: 'Content that sparks conversations and turns followers into loyal customers. We create authentic connections between your brand and your audience.',
      features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics', 'Paid Social', 'Creative'],
      image: '/sersoc.webp',
      path: '/social-media-marketing',
    },
    {
      icon: <FiStar />,
      title: 'Creative',
      tagline: 'Strategy, growth',
      description: 'Innovative creative solutions that drive brand growth and capture attention.',
      longDescription: 'Design thinking meets marketing expertise for campaigns that truly stand out. We push creative boundaries to make your brand unforgettable.',
      features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Brand Storytelling', 'Art Direction', 'Copywriting'],
      image: '/sercre.webp',
      path: '/creative',
    },
    {
      icon: <FiFilm />,
      title: 'Production',
      tagline: 'Sound, Camera, Action',
      description: 'Professional video and audio production that brings your vision to life.',
      longDescription: 'Cinematic quality that captivates audiences and communicates your message powerfully. From concept to final cut, we handle it all.',
      features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production', 'Animation', 'Scriptwriting'],
      image: '/servid.webp',
      path: '/production',
    },
    {
      icon: <FiUsers />,
      title: 'Digital PR',
      tagline: 'We can get anyone',
      description: 'Strategic PR campaigns that build relationships with media and influencers.',
      longDescription: 'Get featured in top publications and build brand authority. We connect you with the right people to amplify your message.',
      features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation', 'Press Releases', 'Events'],
      image: '/serdig.webp',
      path: '/digital-pr',
    },
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-black pt-16 sm:pt-20">
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
            className="w-full h-full object-cover md:object-center object-[70%]"
            style={{ objectPosition: '50% 50%' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs text-white/70 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            What We Do
            <FiZap className="text-white/70 text-xs sm:text-sm" />
          </div>
          <h1 className="services-hero-title font-black text-white mb-4 sm:mb-6 leading-none px-2" style={{ fontSize: 'clamp(2rem, 12vw, 6rem)', perspective: '1000px' }}>
            <span className="inline-block">Our</span>{' '}
            <span className="inline-block text-white/70">Services</span>
          </h1>
          <p className="services-hero-subtitle text-white/60 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Comprehensive digital solutions tailored to elevate your brand through innovation, creativity, and strategic excellence.
          </p>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-[8px] sm:text-[10px] text-white/40 tracking-[0.3em] uppercase">SCROLL</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      <section className="bg-black py-0">
        {services.map((service, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className="service-scroll-item relative overflow-hidden"
            >
              <div className="relative min-h-[90vh] sm:min-h-[100vh] flex items-center">
                {/* Responsive image container */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="relative w-full h-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-scroll-img w-full h-full object-cover"
                      style={{
                        objectPosition: isLeft ? '70% center' : '30% center',
                      }}
                      loading="lazy"
                    />
                    
                    {/* Enhanced gradient overlays for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                    <div className={`absolute inset-0 ${
                      isLeft 
                        ? 'bg-gradient-to-r from-black/90 via-black/40 to-transparent' 
                        : 'bg-gradient-to-l from-black/90 via-black/40 to-transparent'
                    }`} />
                    
                    {/* Additional overlay for mobile */}
                    <div className="absolute inset-0 bg-black/30 md:hidden" />
                  </div>
                </div>

                {/* Background scale effect */}
                <div className="service-content-bg absolute inset-0 bg-black/20" />

                {/* Content overlay - responsive positioning */}
                <div className="service-scroll-text relative z-10 w-full px-4 sm:px-8 lg:px-16 xl:px-20 py-12 sm:py-16">
                  <div className={`max-w-2xl ${
                    isLeft 
                      ? 'sm:ml-0 sm:mr-auto' 
                      : 'sm:ml-auto sm:mr-0'
                    } text-center sm:text-${isLeft ? 'left' : 'right'}`}
                  >
                    <div className={`flex items-center gap-3 mb-4 sm:mb-6 ${
                      isLeft 
                        ? 'justify-center sm:justify-start' 
                        : 'justify-center sm:justify-end'
                    }`}>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white/80 text-base sm:text-xl backdrop-blur-sm">
                        {service.icon}
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] text-white/50 uppercase">{service.tagline}</span>
                    </div>

                    <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-white/10 select-none leading-none mb-2 sm:mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <h2 className="font-black text-white mb-3 sm:mb-5 leading-tight drop-shadow-lg" style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)' }}>
                      {service.title}
                    </h2>

                    {/* Responsive description - shows short on mobile, long on desktop */}
                    <p className="text-white/90 text-sm sm:hidden mb-4 max-w-md mx-auto drop-shadow-lg leading-relaxed">
                      {service.description}
                    </p>
                    <p className="hidden sm:block text-white/80 text-sm lg:text-base leading-relaxed mb-6 max-w-md drop-shadow-lg">
                      {service.longDescription}
                    </p>

                    {/* Features - scrollable on mobile */}
                    <div className={`flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-10 ${
                      isLeft 
                        ? 'justify-center sm:justify-start' 
                        : 'justify-center sm:justify-end'
                    } max-w-full overflow-x-auto pb-2 sm:pb-0`}>
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <span key={idx} className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 border border-white/20 rounded-full text-white/90 whitespace-nowrap backdrop-blur-sm">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={service.path}
                      className={`inline-flex items-center gap-2 sm:gap-3 border border-white/30 text-white font-semibold rounded-full px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 group backdrop-blur-md bg-black/30 ${
                        isLeft ? '' : 'sm:ml-auto'
                      }`}
                    >
                      <span>Learn More</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform text-sm sm:text-base" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {index < services.length - 1 && (
                <div className="absolute bottom-0 left-4 sm:left-8 right-4 sm:right-8 h-px bg-white/20" />
              )}
            </div>
          );
        })}
      </section>

      <section className="process-section py-16 sm:py-20 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-3 sm:mb-4">
              Our Approach
            </span>
            <h2 className="font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              How We <span className="text-white/40">Work</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '01', title: 'Discovery', desc: 'Deep dive into your brand, goals, and audience to find the best solutions' },
              { number: '02', title: 'Strategy', desc: 'Develop data-driven strategies ensuring every decision is backed by insights' },
              { number: '03', title: 'Execution', desc: 'Creative execution with continuous optimization for perfect project delivery' },
              { number: '04', title: 'Growth', desc: 'Continuous growth and iteration to help your brand achieve long-term success' },
            ].map((item, index) => (
              <div key={index} className="process-step text-center group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white/10 mb-3 sm:mb-4 group-hover:text-white/20 transition-colors">
                  {item.number}
                </div>
                <div className="w-10 sm:w-12 h-px bg-white/20 mx-auto mb-4 sm:mb-5 group-hover:w-12 sm:group-hover:w-16 transition-all duration-300" />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-white/45 text-xs sm:text-sm leading-relaxed px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90"
                alt="CTA"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 30%' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 rounded-full text-[10px] sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm border border-white/15">
                <FiTarget className="text-white/70 text-xs sm:text-sm" />
                <span className="text-white/70">Let's Create Something Amazing</span>
              </div>
              <h2 className="font-black mb-3 sm:mb-4 text-white drop-shadow-lg" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.8rem)' }}>
                Ready to Transform Your Brand?
              </h2>
              <p className="text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                Let's create something amazing together and take your brand to new heights. Our team is ready to transform your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-bold text-sm sm:text-base hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform text-sm sm:text-base" />
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

export default Services;