import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight, FiArrowUpRight, FiTrendingUp, FiCode, FiMonitor,
  FiHeart, FiStar, FiFilm, FiUsers, FiTarget, FiAward, FiZap, FiGlobe
} from 'react-icons/fi';
import SilkWave from '../components/ParticlesWave';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

const STICKY_SLIDES = [
  {
    id: 's1', label: 'BRANDING', number: '01',
    title: 'Crafting Brands\nThat Last', sub: 'Identity · Strategy · Voice',
    image: '/branding.jpg',
    link: '/branding',
  },
  {
    id: 's2', label: 'PRODUCTION', number: '02',
    title: 'Cinematic Stories\nBrought to Life', sub: 'Video · Photography · Sound',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=90',
    link: '/production',
  },
  {
    id: 's3', label: 'PERFORMANCE', number: '03',
    title: 'Campaigns That\nConvert', sub: 'Meta · Google · TikTok',
    image: '/perfo.jpg',
    link: '/performance-marketing',
  },
  {
    id: 's4', label: 'WEB DEV', number: '04',
    title: 'Experiences That\nInspire', sub: 'React · Next.js · Shopify',
    image: '/web.png',
    link: '/web-development',
  },
  {
    id: 's5', label: 'SOCIAL MEDIA', number: '05',
    title: 'Communities That\nEngage', sub: 'Content · Growth · Loyalty',
    image: '/sm.jpg',
    link: '/social-media-marketing',
  },
];

function Home() {
  const heroRef = useRef(null);
  const waveRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const textRef = useRef(null);
  const clientsMarqueeRef = useRef(null);
  const servicesSliderRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const stickyWrapRef = useRef(null);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);

  const services = useMemo(() => [
    {
      title: "Marketing & Advertising",
      description: "Grow your brand with data-driven marketing strategies and powerful advertising campaigns that attract, engage, and convert your ideal audience.",
      image: "/mark.png",
      link: "/production"
    },
    {
      title: "Branding",
      description: "We craft powerful brand identities that connect emotionally with your audience and position your business for long-term success.",
      image: "/bran.png",
      link: "/branding"
    },
    {
      title: "Web Development",
      description: "We design and develop high-performance, scalable websites tailored to your business goals and user experience.",
      image: "/webd.png",
      link: "/web-development"
    },
    {
      title: "Social Media Marketing",
      description: "Build strong online communities and grow your brand presence with strategic content and engagement campaigns.",
      image: "/social.png",
      link: "/social-media-marketing"
    },
    {
      title: "All Services",
      description: ".",
      image: "/all.png",
      link: "/services"
    },
  ], []);

  const clients = useMemo(() => ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel', 'Tesla', 'SpaceX', 'Uber', 'Airbnb', 'Shopify', 'Slack'], []);

  const stats = useMemo(() => [
    { count: 710, suffix: '', label: 'Satisfied Customers', icon: <FiAward /> },
    { count: 125, suffix: '+', label: 'Successful Partnerships', icon: <FiHeart /> },
    { count: 9, suffix: '+', label: 'Years Experience', icon: <FiStar /> },
    { count: 720, suffix: '', label: 'Completed Projects', icon: <FiTarget /> },
  ], []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  useEffect(() => {
    if (!waveRef.current || !sectionRef.current) return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.to(waveRef.current, {
          x: () => -(waveRef.current.scrollWidth / 4),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', end: 'bottom top',
            scrub: 1.5, invalidateOnRefresh: true,
          },
        });
      });
      return () => ctx.revert();
    }, 200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || isMobile || !stickyWrapRef.current) return;
    const timer = setTimeout(() => {
      const wrap = stickyWrapRef.current;
      const slides = Array.from(wrap.querySelectorAll('.sticky-slide'));
      const totalSlides = slides.length;
      const scrollDistance = (totalSlides - 1) * window.innerHeight;

      const ctx = gsap.context(() => {
        slides.forEach((slide, i) => {
          if (i === 0) return;
          gsap.set(slide, { yPercent: 100 });
          const img = slide.querySelector('.sticky-img img');
          if (img) gsap.set(img, { scale: 1.15 });
        });

        const tl = gsap.timeline({ paused: true });

        slides.forEach((slide, i) => {
          if (i === 0) return;
          const img = slide.querySelector('.sticky-img img');
          tl.to(slide, { yPercent: 0, ease: 'none', duration: 1 }, i - 1);
          if (img) tl.to(img, { scale: 1, ease: 'none', duration: 1 }, i - 1);
        });

        ScrollTrigger.create({
          trigger: wrap,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          animation: tl,
          onUpdate: (self) => {
            const rawIdx = self.progress * (totalSlides - 1);
            setActiveSection(Math.min(Math.round(rawIdx), totalSlides - 1));
          },
        });
      }, wrap);

      return () => ctx.revert();
    }, 400);

    return () => clearTimeout(timer);
  }, [isLoading, isMobile]);

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.set('.hero-char', { y: 120, opacity: 0, rotationX: -90 });
      gsap.to('.hero-char', {
        y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out',
        stagger: { amount: 0.75 }, delay: 0.2,
      });
      gsap.fromTo('.hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-cta-btn',
        { y: 30, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 1.35, ease: 'back.out(1.7)', stagger: 0.12 }
      );
      gsap.fromTo('.hero-badge',
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.5, ease: 'back.out(1.6)' }
      );
      gsap.fromTo('.hero-stat',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 1.6, stagger: 0.09, ease: 'power2.out' }
      );
      gsap.fromTo('.scroll-line',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1, delay: 2, ease: 'power2.out' }
      );

      if (!isMobile) {
        gsap.fromTo('.reveal-text .text-block',
          { y: '110%', opacity: 0, skewY: 5 },
          {
            y: '0%', opacity: 1, skewY: 0, duration: 1.15, stagger: 0.15, ease: 'power4.out',
            scrollTrigger: { trigger: textRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
          }
        );
        gsap.fromTo('.counter-box',
          { scale: 0.8, opacity: 0, y: 26 },
          {
            scale: 1, opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: textRef.current, start: 'top 74%', toggleActions: 'play none none reverse' },
          }
        );
        gsap.fromTo('.stat-item',
          { y: 60, opacity: 0, scale: 0.85, rotateX: 8 },
          {
            y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.9, stagger: 0.12, ease: 'back.out(1.6)',
            scrollTrigger: { trigger: statsRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
          }
        );
        gsap.fromTo('.cta-content',
          { y: 50, opacity: 0, scale: 0.94, filter: 'blur(10px)' },
          {
            y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.05, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
          }
        );
        gsap.fromTo('.video-section-content',
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: videoSectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          }
        );

        document.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.getAttribute('data-count') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: el, start: 'top 88%', once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target, duration: 2.4, ease: 'power2.out',
                onUpdate: () => { el.textContent = Math.round(obj.val).toString() + suffix; },
              });
            },
          });
        });
      }

      if (clientsMarqueeRef.current) {
        gsap.to(clientsMarqueeRef.current, { x: '-33.333%', duration: 20, repeat: -1, ease: 'none' });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, isMobile]);

  const handleServiceScroll = useCallback(() => {
    const container = servicesSliderRef.current;
    if (!container) return;
  
    const children = Array.from(container.children);
  
    let closestIndex = 0;
    let closestDistance = Infinity;
  
    children.forEach((child, index) => {
      const distance = Math.abs(
        child.offsetLeft - container.scrollLeft
      );
  
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
  
    if (closestIndex !== activeServiceSlide) {
      setActiveServiceSlide(closestIndex);
    }
  }, [activeServiceSlide]);

  useEffect(() => {
    const slider = servicesSliderRef.current;
    if (!slider) return;
  
    slider.addEventListener('scroll', handleServiceScroll, { passive: true });
  
    return () => {
      slider.removeEventListener('scroll', handleServiceScroll);
    };
  }, [handleServiceScroll]);

  const scrollToServiceSlide = useCallback((index) => {
    if (servicesSliderRef.current) {
      const cardWidth = servicesSliderRef.current.offsetWidth * (window.innerWidth < 640 ? 0.85 : window.innerWidth < 1024 ? 0.7 : 0.6);
      servicesSliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  }, []);

  const heroChars = useMemo(() => ['S', 'e', 'c', 'o', 'n', 'd', '\u00A0', 'W', 'a', 'v', 'e', '.'], []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative overflow-x-hidden bg-black pt-20">
      <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-white">
          <SilkWave speed={0.0006} waveCount={6} opacity={0.75} />
        </div>
        <div className="absolute inset-0 bg-black/40 lg:bg-black/20 z-10 pointer-events-none" />
        <div className="relative z-30 text-center px-4 max-w-5xl md:max-w-6xl mx-auto w-full">
          <div className="hero-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs md:text-sm text-gray-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Award-Winning Digital Agency
            <FiZap className="text-white" />
          </div>
          <div className="mb-3 sm:mb-5" style={{ perspective: '1000px' }}>
            <h1 className="font-black leading-none tracking-tight text-white" style={{ fontSize: 'clamp(2.6rem, 9vw, 5.5rem)' }}>
              {heroChars.map((char, i) => (
                <span key={i} className="hero-char inline-block text-white" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </h1>
          </div>
          <p className="hero-subtitle text-xs sm:text-sm md:text-lg lg:text-xl text-gray-500 mb-6 sm:mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 py-2">
            Riding the digital wave to transform your brand into an unforgettable experience through innovation, creativity, and strategic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center mb-7 sm:mb-10 md:mb-12">
            <Link to="/services" className="hero-cta-btn group relative px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 bg-white text-black rounded-full text-xs sm:text-sm md:text-base font-bold overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/works" className="hero-cta-btn group px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 border border-white/15 rounded-full text-xs sm:text-sm md:text-base font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              View Portfolio <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="flex justify-center gap-6 sm:gap-10 md:gap-14">
            {[['500+', 'Projects'], ['200+', 'Clients'], ['10+', 'Years']].map(([num, label], i) => (
              <div key={i} className="hero-stat text-center">
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-white">{num}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-700 tracking-[0.3em] uppercase">SCROLL</span>
          <div className="scroll-line w-px h-10 sm:h-12 md:h-14 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      <div ref={sectionRef} className="relative py-6 sm:py-10 bg-black will-change-transform" style={{ overflow: 'hidden' }}>
        <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-black to-transparent z-10" />
        <div ref={waveRef} className="flex font-black tracking-tighter uppercase" style={{ fontSize: 'clamp(2.8rem, 14vw, 10rem)', whiteSpace: 'nowrap', display: 'flex', color: 'rgba(255,255,255,0.03)' }}>
          <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE&nbsp;&nbsp;</span>
          <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE&nbsp;&nbsp;</span>
          <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE&nbsp;&nbsp;</span>
          <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE&nbsp;&nbsp;</span>
        </div>
      </div>

      <section ref={textRef} className="py-12 sm:py-20 md:py-24 bg-black">
        <div className="container-custom">
          <div className="reveal-text font-black text-center max-w-4xl md:max-w-5xl mx-auto leading-tight" style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)' }}>
            {["We don't just market,", 'we create experiences', 'that inspire, engage,', 'and transform.'].map((line, i) => (
              <div key={i} className="overflow-hidden mb-1 sm:mb-1.5">
                <span className={`text-block inline-block ${i % 2 === 0 ? 'text-gray-400' : 'text-white'}`}>{line}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-center mt-6 sm:mt-8 max-w-xl md:max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2 sm:px-4 leading-relaxed">
            Over a decade of turning bold ideas into unforgettable campaigns. Trusted by the world's most ambitious brands.
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-7 sm:mt-10 max-w-md sm:max-w-xl mx-auto px-2 sm:px-4">
            {[{ label: 'Brand Growth', val: '94%' }, { label: 'Client Retention', val: '97%' }, { label: 'Avg ROI', val: '380%' }].map((item, i) => (
              <div key={i} className="counter-box text-center p-2.5 sm:p-4 md:p-5 bg-white/3 border border-white/8 rounded-lg sm:rounded-xl hover:border-white/15 transition-colors">
                <div className="text-base sm:text-2xl md:text-3xl font-black text-white">{item.val}</div>
                <div className="text-[9px] sm:text-xs md:text-sm text-gray-600 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} className="py-16 sm:py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14">
            <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.3em] text-gray-400 uppercase mb-3">WHAT WE DO</span>
            <h2 className="font-black text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gray-900">Our</span>{' '}
              <span className="text-gray-500">Services</span>
            </h2>
            <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
              Comprehensive digital solutions tailored to your brand's unique needs
            </p>
          </div>

          {!isMobile ? (
            <div className="hidden lg:block">
              <div className="flex flex-col items-center gap-6">
                <div className="flex justify-center gap-6">
                  {services.slice(0, 3).map((service, index) => (
                    <Link
                      to={service.link}
                      key={index}
                      className="group relative block w-[379px] h-[466px] rounded-[30px] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <div
                        className="absolute top-4 left-4 right-4 flex items-center justify-between px-6 py-4 rounded-[24px]"
                        style={{
                          background: "rgba(255,255,255,0.25)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)"
                        }}
                      >
                        <span className="text-white text-2xl tracking-wide font-light">
                          {service.title}
                        </span>
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.25)"
                          }}
                        >
                          <FiArrowUpRight className="text-white text-xl" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center gap-6">
                  {services.slice(3, 5).map((service, index) => (
                    <Link
                      to={service.link}
                      key={index}
                      className="group relative block w-[379px] h-[466px] rounded-[30px] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <div
                        className="absolute top-4 left-4 right-4 flex items-center justify-between px-6 py-4 rounded-[24px]"
                        style={{
                          background: "rgba(255,255,255,0.25)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)"
                        }}
                      >
                        <span className="text-white text-2xl tracking-wide font-light">
                          {service.title}
                        </span>
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.25)"
                          }}
                        >
                          <FiArrowUpRight className="text-white text-xl" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:hidden">
              <div className="relative">
                <div
                  ref={servicesSliderRef}
                  className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 px-4 scrollbar-hide"
                  style={{
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.link}
                      className="flex-shrink-0 w-[85vw] sm:w-[70vw] snap-start"
                    >
                      <div
                        className="group relative w-full h-[400px] sm:h-[440px] rounded-[24px] sm:rounded-[30px] overflow-hidden cursor-pointer"
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <div
                          className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-[20px] sm:rounded-[24px]"
                          style={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)"
                          }}
                        >
                          <span className="text-white text-lg sm:text-xl md:text-2xl tracking-wide font-light line-clamp-1 pr-2">
                            {service.title}
                          </span>
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: "rgba(255,255,255,0.25)"
                            }}
                          >
                            <FiArrowUpRight className="text-white text-base sm:text-lg md:text-xl" />
                          </div>
                        </div>
                        {index === services.length - 1 && (
                          <div className="absolute bottom-4 left-4 right-4 text-center">
                            <span className="text-white/80 text-xs sm:text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              View all services →
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4">
                  {/* {services.map((_, i) => (
                    // <button
                    //   key={i}
                    //   onClick={() => scrollToServiceSlide(i)}
                    //   className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    //     i === activeServiceSlide
                    //       ? 'w-6 sm:w-8 bg-black'
                    //       : 'w-1.5 sm:w-2 bg-gray-300'
                    //   }`}
                    //   aria-label={`Go to slide ${i + 1}`}
                    // />
                  ))} */}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div
        ref={stickyWrapRef}
        className="hidden lg:block relative overflow-hidden"
        style={{ height: '100vh' }}
      >
        {STICKY_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="sticky-slide absolute inset-0 w-full h-full overflow-hidden"
            style={{ zIndex: index + 1 }}
          >
            <div className="sticky-img absolute inset-0" style={{ transformOrigin: 'center center' }}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-end z-10 pb-20 px-16">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-5">
                  <span className="text-white/15 font-black select-none" style={{ fontSize: 'clamp(4rem, 9vw, 7rem)', lineHeight: 1 }}>{slide.number}</span>
                  <div className="w-px h-14 bg-white/15" />
                  <span className="text-[11px] font-bold tracking-[0.45em] text-white/45 uppercase">{slide.label}</span>
                </div>
                <h2
                  className="font-black text-white mb-3 leading-tight whitespace-pre-line"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
                >
                  {slide.title}
                </h2>
                <p className="text-white/45 text-base mb-8">{slide.sub}</p>
                <Link to={slide.link} className="inline-flex items-center gap-3 border border-white/25 text-white font-semibold rounded-full px-7 py-3 text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 group backdrop-blur-sm">
                  <span>Discover More</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="absolute top-10 right-16 z-10 flex flex-col items-end gap-3">
              <div className="flex gap-2 items-center">
                {STICKY_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className="h-px rounded-full bg-white transition-all duration-500"
                    style={{ width: i === activeSection ? '40px' : '12px', opacity: i === activeSection ? 1 : 0.2 }}
                  />
                ))}
              </div>
              <span className="text-white/25 text-xs tracking-widest">{activeSection + 1} / {STICKY_SLIDES.length}</span>
            </div>
          </div>
        ))}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5">
          {STICKY_SLIDES.map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-white transition-all duration-500"
              style={{ height: i === activeSection ? '32px' : '6px', opacity: i === activeSection ? 1 : 0.15 }}
            />
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <div
          ref={servicesSliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', height: 'calc(100vh - 80px)' }}
        >
          {STICKY_SLIDES.map((slide, index) => (
            <div key={slide.id} className="flex-shrink-0 w-screen snap-start relative overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
              <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12">
                <span className="text-[10px] font-bold tracking-[0.35em] text-white/40 uppercase mb-3">{slide.label}</span>
                <h2 className="font-black text-white text-2xl leading-tight whitespace-pre-line mb-2">{slide.title}</h2>
                <p className="text-white/40 text-xs mb-5">{slide.sub}</p>
                <Link to={slide.link} className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold rounded-full px-5 py-2.5 text-xs self-start hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                  <span>Discover More</span><FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="absolute top-6 right-6 text-white/10 font-black select-none" style={{ fontSize: '4.5rem', lineHeight: 1 }}>{slide.number}</div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                {STICKY_SLIDES.map((_, i) => (
                  <div key={i} className={`h-px rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/25'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section ref={videoSectionRef} className="relative bg-black" style={{ minHeight: '100vh' }}>
        <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80"
          >
            <source src="https://pub-6070c66a49144147b12828af75c69a0c.r2.dev/100882-video-2160%20(1)%20(1)%20(1)%20(1)%20(1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center z-10 px-8 sm:px-16">
            <div className="video-section-content max-w-3xl">
              <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.4em] text-white/35 uppercase mb-4 border border-white/8 px-3 py-1 rounded-full backdrop-blur-sm">
                ABOUT US
              </span>
              <h2 className="font-black text-white mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
                We Make the{' '}
                <span style={{ color: '#6eb8ff' }}>Difference</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Over a decade of transforming brands across the UAE and beyond. We blend creativity with data to deliver campaigns that don't just look good — they perform.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[['UAE Based', '🇦🇪'], ['Global Reach', '🌍'], ['Award Winning', '🏆']].map(([label, emoji]) => (
                  <div key={label} className="flex items-center gap-2 text-white/60 text-sm font-medium bg-white/5 border border-white/8 rounded-full px-4 py-2 backdrop-blur-sm">
                    <span>{emoji}</span><span>{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-3 bg-white text-black font-bold rounded-full px-7 py-3.5 text-sm hover:bg-gray-100 transition-all group">
                <span>Our Story</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-10 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="font-black text-white mb-2 leading-none"
                    style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
                    data-count={stat.count}
                    data-suffix={stat.suffix}
                  >
                    {stat.count}{stat.suffix}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm font-medium tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-9 sm:py-12 md:py-14 overflow-hidden bg-black">
        <div className="text-center mb-6 sm:mb-8 px-4">
          <h2 className="font-black text-white" style={{ fontSize: 'clamp(1.4rem, 4.2vw, 2.4rem)' }}>
            Trusted by <span className="text-gray-500">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-2.5 text-[10px] sm:text-xs md:text-sm">Join hundreds of brands that have partnered with us</p>
        </div>
        <div className="relative overflow-hidden mb-4">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-black to-transparent z-10" />
          <div ref={clientsMarqueeRef} className="flex whitespace-nowrap will-change-transform">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div key={index} className="mx-4 sm:mx-6 text-xs sm:text-base md:text-xl font-black text-white/10 hover:text-white/25 transition-colors flex-shrink-0 cursor-default">{client}</div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex whitespace-nowrap animate-marquee-reverse will-change-transform">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div key={index} className="mx-4 sm:mx-6 text-[10px] sm:text-xs md:text-sm font-bold text-white/5 hover:text-white/15 transition-colors flex-shrink-0 cursor-default">{client}</div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-14 sm:py-18 md:py-22 bg-black">
        <div className="container-custom">
          <div className="text-center mb-7 sm:mb-10 md:mb-12">
            <h2 className="font-black text-white" style={{ fontSize: 'clamp(1.5rem, 4.6vw, 2.7rem)' }}>
              Numbers That <span className="text-gray-500">Speak</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center p-4 sm:p-6 md:p-8 bg-white/2 border border-white/6 rounded-xl sm:rounded-2xl md:rounded-3xl hover:border-white/15 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />
                <div className="text-lg sm:text-xl md:text-2xl text-white/30 mb-2 sm:mb-3 flex justify-center group-hover:scale-125 transition-transform duration-300 relative z-10">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-0.5 sm:mb-1.5 relative z-10" data-count={stat.count} data-suffix={stat.suffix}>
                  {stat.count}{stat.suffix}
                </div>
                <div className="text-gray-600 text-[9px] sm:text-xs md:text-sm relative z-10">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-14 sm:py-18 md:py-22 bg-black">
        <div className="container-custom px-3 sm:px-4 md:px-6">
          <div className="cta-content relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1800&q=90"
                alt="CTA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/72" />
              <div className="absolute inset-0 backdrop-blur-[1px]" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />
            <div className="relative z-10 text-center text-white p-7 sm:p-12 md:p-16 lg:p-20">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white/8 rounded-full text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6 md:mb-7 backdrop-blur-sm border border-white/8">
                <FiGlobe className="text-white/60" />
                <span className="text-white/60">Ready when you are</span>
              </div>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight text-white" style={{ fontSize: 'clamp(1.8rem, 5.4vw, 3rem)' }}>
                Ready to Ride the Wave?
              </h2>
              <p className="text-xs sm:text-sm md:text-lg mb-6 sm:mb-8 md:mb-9 max-w-xl md:max-w-2xl mx-auto text-white/50 leading-relaxed">
                Let's create something amazing together and take your brand to new heights. Our team is ready to transform your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 bg-white text-black rounded-full font-black hover:shadow-[0_0_42px_rgba(255,255,255,0.15)] transition-all group text-xs sm:text-sm md:text-base">
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/works" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 border border-white/20 rounded-full font-bold hover:bg-white/8 hover:border-white/35 transition-all text-xs sm:text-sm md:text-base backdrop-blur-sm text-white">
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-grid-dark {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 12px;
        }
        .services-grid-dark .service-card-new:nth-child(1) {
          min-height: 380px;
        }
        .services-grid-dark .service-card-new:nth-child(2) {
          min-height: 380px;
        }
        .services-grid-dark .service-card-new:nth-child(3) {
          min-height: 380px;
        }
        .services-grid-dark .service-card-new:nth-child(4) {
          grid-column: span 1;
          min-height: 300px;
        }
        .services-grid-dark .service-card-new:nth-child(5) {
          grid-column: span 1;
          min-height: 300px;
        }
        @media (min-width: 1024px) {
          .services-grid-dark {
            gap: 16px;
          }
          .services-grid-dark .service-card-new:nth-child(1),
          .services-grid-dark .service-card-new:nth-child(2),
          .services-grid-dark .service-card-new:nth-child(3) {
            min-height: 420px;
          }
          .services-grid-dark .service-card-new:nth-child(4),
          .services-grid-dark .service-card-new:nth-child(5) {
            min-height: 340px;
          }
        }
        @keyframes marqueeRev {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-reverse {
          animation: marqueeRev 18s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .will-change-transform { will-change: transform; }
      `}</style>
    </div>
  );
}

export default Home;