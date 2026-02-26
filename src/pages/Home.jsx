import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import {
  FiArrowRight, FiCamera, FiTrendingUp, FiCode, FiMonitor,
  FiHeart, FiStar, FiFilm, FiUsers, FiTarget, FiAward, FiZap, FiGlobe
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

function Home() {
  const heroRef = useRef(null);
  const waveRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const textRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeRef2 = useRef(null);
  const clientsMarqueeRef = useRef(null);
  const splineRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const onSplineLoad = useCallback((spline) => {
    splineRef.current = spline;
  }, []);

  useEffect(() => {
    if (!waveRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(waveRef.current, {
        xPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: waveRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    const ctx = gsap.context(() => {
      gsap.set('.hero-char', { y: 120, opacity: 0, rotationX: -90 });
      gsap.to('.hero-char', {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: { amount: 0.75 },
        delay: 0.2,
      });

      gsap.fromTo(
        '.hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta-btn',
        { y: 30, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 1.35, ease: 'back.out(1.7)', stagger: 0.12 }
      );

      gsap.fromTo(
        '.hero-badge',
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.5, ease: 'back.out(1.6)' }
      );

      gsap.fromTo(
        '.hero-stat',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, delay: 1.6, stagger: 0.09, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.scroll-line',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1, delay: 2, ease: 'power2.out' }
      );

      if (!isMobile) {
        gsap.fromTo(
          '.reveal-text .text-block',
          { y: '110%', opacity: 0, skewY: 5 },
          {
            y: '0%',
            opacity: 1,
            skewY: 0,
            duration: 1.15,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.counter-box',
          { scale: 0.8, opacity: 0, y: 26 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 74%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.stat-item',
          { y: 60, opacity: 0, scale: 0.85, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.cta-content',
          { y: 50, opacity: 0, scale: 0.94, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        document.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.getAttribute('data-count') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
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
                  el.textContent = Math.round(obj.val).toString() + suffix;
                },
              });
            },
          });
        });
      }

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, { x: '-50%', duration: 22, repeat: -1, ease: 'none' });
      }
      if (marqueeRef2.current) {
        gsap.to(marqueeRef2.current, {
          x: '0%',
          duration: 18,
          repeat: -1,
          ease: 'none',
          startAt: { x: '-50%' },
        });
      }

      if (clientsMarqueeRef.current) {
        gsap.to(clientsMarqueeRef.current, {
          x: '-50%',
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }

      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
          yPercent: -14,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('section') || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

      gsap.utils.toArray('.floating-badge').forEach((badge, i) => {
        gsap.to(badge, {
          y: -10,
          rotation: i % 2 === 0 ? 4 : -4,
          duration: 2.4 + i * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.35,
        });
      });

      if (heroRef.current && !isMobile) {
        gsap.to(heroRef.current, {
          yPercent: -4,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, isMobile]);

  const handleScroll = useCallback(() => {
    if (mobileSliderRef.current) {
      const scrollLeft = mobileSliderRef.current.scrollLeft;
      const width = mobileSliderRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      if (index !== activeSection) {
        setActiveSection(index);
        setCurrentSlide(index);
      }
    }
  }, [activeSection]);

  const scrollToSlide = useCallback((index) => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.scrollTo({
        left: index * mobileSliderRef.current.offsetWidth,
        behavior: 'smooth'
      });
      setActiveSection(index);
      setCurrentSlide(index);
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!mobileSliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - mobileSliderRef.current.offsetLeft;
    scrollLeft.current = mobileSliderRef.current.scrollLeft;
    mobileSliderRef.current.style.cursor = 'grabbing';
    mobileSliderRef.current.style.scrollSnapType = 'none';
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current || !mobileSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - mobileSliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    mobileSliderRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!mobileSliderRef.current) return;
    isDragging.current = false;
    mobileSliderRef.current.style.cursor = 'grab';
    mobileSliderRef.current.style.scrollSnapType = 'x mandatory';
    
    const index = Math.round(mobileSliderRef.current.scrollLeft / mobileSliderRef.current.offsetWidth);
    scrollToSlide(index);
  }, [scrollToSlide]);

  const handleTouchStart = useCallback((e) => {
    if (!mobileSliderRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - mobileSliderRef.current.offsetLeft;
    scrollLeft.current = mobileSliderRef.current.scrollLeft;
    mobileSliderRef.current.style.scrollSnapType = 'none';
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current || !mobileSliderRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - mobileSliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    mobileSliderRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!mobileSliderRef.current) return;
    isDragging.current = false;
    mobileSliderRef.current.style.scrollSnapType = 'x mandatory';
    
    const index = Math.round(mobileSliderRef.current.scrollLeft / mobileSliderRef.current.offsetWidth);
    scrollToSlide(index);
  }, [scrollToSlide]);

  useEffect(() => {
    const slider = mobileSliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', handleScroll, { passive: true });
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mouseleave', handleMouseUp);
    slider.addEventListener('touchstart', handleTouchStart, { passive: false });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mouseleave', handleMouseUp);
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleScroll, handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const heroChars = useMemo(() => ['S', 'e', 'c', 'o', 'n', 'd', '\u00A0', 'W', 'a', 'v', 'e', '.'], []);

  const services = useMemo(() => [
    { icon: <FiCamera />, title: 'Branding', tagline: 'Eye catchy', description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'] },
    { icon: <FiTrendingUp />, title: 'SEO', tagline: 'On top', description: 'Dominate search engine rankings with our data-driven SEO strategies.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'] },
    { icon: <FiCode />, title: 'Website Dev', tagline: 'Dynamic, User Friendly', description: 'Build powerful, responsive websites that convert visitors into customers.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design'] },
    { icon: <FiMonitor />, title: 'Performance', tagline: 'Meta, Google', description: 'Data-driven advertising campaigns that deliver measurable results.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting'] },
    { icon: <FiHeart />, title: 'Social Media', tagline: 'Fun, Engagement', description: 'Build thriving communities and drive engagement through social media.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics'] },
    { icon: <FiStar />, title: 'Creative', tagline: 'Strategy, growth', description: 'Innovative creative solutions that drive brand growth and capture attention.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Storytelling'] },
    { icon: <FiFilm />, title: 'Production', tagline: 'Sound, Camera, Action', description: 'Professional video and audio production that brings your vision to life.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production'] },
    { icon: <FiUsers />, title: 'Digital PR', tagline: 'We can get anyone', description: 'Strategic PR campaigns that build relationships with media and influencers.', color: 'from-gray-800 to-black', bgColor: 'bg-gray-100', features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation'] },
  ], []);

  const sectionSlides = useMemo(() => [
    {
      id: 'production',
      title: 'VIDEO PRODUCTION',
      heading: 'Production Excellence',
      description: 'Professional video and audio production that brings your vision to life. Cinematic quality that captivates and communicates your message powerfully.',
      items: [
        { title: 'Video Production', desc: 'Commercials & brand films' },
        { title: 'Sound Design', desc: 'Audio & mixing' },
        { title: 'Post-Production', desc: 'Editing & VFX' },
        { title: 'Photography', desc: 'Product & lifestyle' },
      ],
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '4K', label: 'Ultra HD' },
      badge2: { value: 'Dolby', label: 'Audio' },
      link: '/production',
      linkText: 'See our production work'
    },
    {
      id: 'branding',
      title: 'BRAND IDENTITY',
      heading: 'Branding That Sticks',
      description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions. From logo design to comprehensive brand guidelines, we craft cohesive visual stories.',
      items: [
        { title: 'Brand Strategy', desc: 'Positioning & messaging' },
        { title: 'Visual Identity', desc: 'Logos & guidelines' },
        { title: 'Brand Voice', desc: 'Tone & personality' },
        { title: 'Brand Experience', desc: 'Touchpoints & journey' },
      ],
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '300+', label: 'Brands Created' },
      badge2: { value: '★★★★★', label: 'Rated' },
      link: '/branding',
      linkText: 'Discover our branding process'
    },
    {
      id: 'seo',
      title: 'SEARCH DOMINATION',
      heading: 'SEO Excellence',
      description: 'Dominate search engine rankings with our data-driven SEO strategies. Sustainable organic growth with higher conversions and maximum ROI.',
      stats: [
        { label: 'Organic Traffic Growth', pct: 94 },
        { label: 'Keyword Rankings', pct: 87 },
        { label: 'Conversion Rate Lift', pct: 76 },
      ],
      items: [
        ['#1', 'Rankings'],
        ['200%', 'Traffic'],
        ['5x', 'ROI'],
      ],
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '#1', label: 'Rankings' },
      link: '/seo',
      linkText: 'Explore SEO strategies'
    },
    {
      id: 'web',
      title: 'DEVELOPMENT',
      heading: 'Web Dev That Converts',
      description: 'Build powerful, responsive websites that turn visitors into customers. Lightning-fast performance, seamless UX, and scalable solutions.',
      tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Shopify', 'WordPress', 'Tailwind', 'MongoDB'],
      features: [
        'Custom Development with React/Node.js',
        'E-commerce Solutions on Shopify/Magento',
        'Responsive Mobile-First Design',
        'CMS Integration (WordPress, Sanity)',
      ],
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '99ms', label: 'Load Time' },
      link: '/web-development',
      linkText: 'View our development work'
    },
    {
      id: 'performance',
      title: 'PAID MEDIA',
      heading: 'Performance That Delivers',
      description: 'Data-driven campaigns across Meta and Google. Advanced targeting with creative excellence to maximize ROI and drive qualified traffic that converts.',
      tech: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Retargeting', 'Analytics', 'A/B Testing', 'Attribution'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '380%', label: 'Avg ROI' },
      link: '/performance-marketing',
      linkText: 'Boost your campaigns'
    },
    {
      id: 'social',
      title: 'COMMUNITY GROWTH',
      heading: 'Social Media Marketing',
      description: 'Build thriving communities and drive engagement. Content that sparks conversations, builds brand loyalty, and turns followers into advocates.',
      social: [
        ['📸', 'Insta'],
        ['🎵', 'TikTok'],
        ['👍', 'Facebook'],
        ['🐦', 'Twitter'],
        ['💼', 'LinkedIn'],
        ['▶️', 'YouTube'],
        ['📌', 'Pinterest'],
        ['👻', 'Snapchat'],
      ],
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '2M+', label: 'Followers' },
      link: '/social-media-marketing',
      linkText: 'Grow your community'
    },
    {
      id: 'creative',
      title: 'CREATIVE STUDIO',
      heading: 'Creative Excellence',
      description: 'Innovative creative solutions that drive brand growth. Design thinking meets marketing expertise to deliver work that truly resonates with your audience.',
      items: [
        { title: 'Creative Direction', desc: 'Vision & concepts' },
        { title: 'Content Creation', desc: 'Visual storytelling' },
        { title: 'Campaign Strategy', desc: 'Integrated planning' },
        { title: 'Brand Storytelling', desc: 'Narrative development' },
      ],
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '∞', label: 'Creativity' },
      link: '/creative',
      linkText: 'Explore creative work'
    },
    {
      id: 'pr',
      title: 'PUBLIC RELATIONS',
      heading: 'Digital PR',
      description: 'Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications worldwide.',
      tech: ['Forbes', 'TechCrunch', 'Vogue', 'WSJ', 'CNN', 'BBC', 'NYT', 'Bloomberg'],
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge1: { value: '50+', label: 'Publications' },
      link: '/digital-pr',
      linkText: 'Get featured'
    },
  ], []);

  const clients = useMemo(() => ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel', 'Tesla', 'SpaceX', 'Uber', 'Airbnb', 'Shopify', 'Slack'], []);

  const stats = useMemo(() => [
    { count: 500, suffix: '+', label: 'Projects Completed', icon: <FiAward /> },
    { count: 200, suffix: '+', label: 'Happy Clients', icon: <FiHeart /> },
    { count: 50, suffix: '+', label: 'Awards Won', icon: <FiStar /> },
    { count: 10, suffix: '+', label: 'Years Experience', icon: <FiTarget /> },
  ], []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative overflow-x-hidden bg-white pt-20">
      <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/EGGb-LCYchBVxVDG/scene.splinecode" 
            onLoad={onSplineLoad}
            className="w-full h-full pointer-events-auto"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 z-10 pointer-events-none" />
        <div className="relative z-30 text-center px-4 max-w-5xl md:max-w-6xl mx-auto w-full">
          <div className="hero-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-gray-100 border border-gray-200 rounded-full text-[10px] sm:text-xs md:text-sm text-gray-700 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Award-Winning Digital Agency
            <FiZap className="text-gray-800" />
          </div>

          <div className="mb-3 sm:mb-5" style={{ perspective: '1000px' }}>
            <h1 className="font-black leading-none tracking-tight text-gray-900" style={{ fontSize: 'clamp(2.6rem, 9vw, 5.5rem)' }}>
              {heroChars.map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block text-gray-900"
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <p className="hero-subtitle text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 py-2">
            Riding the digital wave to transform your brand into an unforgettable experience through innovation, creativity, and strategic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center mb-7 sm:mb-10 md:mb-12">
            <Link
              to="/services"
              className="hero-cta-btn group relative px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 bg-gray-900 text-white rounded-full text-xs sm:text-sm md:text-base font-bold overflow-hidden shadow-[0_0_26px_rgba(0,0,0,0.1)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
            </Link>
            <Link
              to="/works"
              className="hero-cta-btn group px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 border border-gray-300 rounded-full text-xs sm:text-sm md:text-base font-semibold text-gray-800 hover:border-gray-800 hover:bg-gray-50 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
            >
              View Portfolio <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="flex justify-center gap-6 sm:gap-10 md:gap-14">
            {[
              ['500+', 'Projects'],
              ['200+', 'Clients'],
              ['10+', 'Years'],
            ].map(([num, label], i) => (
              <div key={i} className="hero-stat text-center">
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900">{num}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 tracking-[0.3em] uppercase">SCROLL</span>
          <div className="scroll-line w-px h-10 sm:h-12 md:h-14 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      <div className="relative py-6 sm:py-10 overflow-hidden bg-white will-change-transform">
        <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div
            ref={waveRef}
            className="flex font-black tracking-tighter text-gray-100 uppercase"
            style={{ fontSize: 'clamp(2.8rem, 14vw, 10rem)', whiteSpace: 'nowrap' }}
          >
            <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE</span>
            <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE</span>
            <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE</span>
          </div>
        </div>
      </div>

      <section ref={textRef} className="py-12 sm:py-20 md:py-24 bg-white">
        <div className="container-custom">
          <div
            className="reveal-text font-black text-center max-w-4xl md:max-w-5xl mx-auto leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)' }}
          >
            {["We don't just market,", 'we create experiences', 'that inspire, engage,', 'and transform.'].map((line, i) => (
              <div key={i} className="overflow-hidden mb-1 sm:mb-1.5">
                <span className={`text-block inline-block ${i % 2 === 0 ? 'text-gray-800' : 'text-gray-900'}`}>{line}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-center mt-6 sm:mt-8 max-w-xl md:max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2 sm:px-4 leading-relaxed">
            Over a decade of turning bold ideas into unforgettable campaigns. Trusted by the world's most ambitious brands.
          </p>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-7 sm:mt-10 max-w-md sm:max-w-xl mx-auto px-2 sm:px-4">
            {[
              { label: 'Brand Growth', val: '94%' },
              { label: 'Client Retention', val: '97%' },
              { label: 'Avg ROI', val: '380%' },
            ].map((item, i) => (
              <div
                key={i}
                className="counter-box text-center p-2.5 sm:p-4 md:p-5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl hover:border-gray-300 transition-colors"
              >
                <div className="text-base sm:text-2xl md:text-3xl font-black text-gray-900">{item.val}</div>
                <div className="text-[9px] sm:text-xs md:text-sm text-gray-600 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-18 md:py-22 bg-white relative overflow-hidden">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              What We Do
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Our <span className="text-gray-800">Services</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Comprehensive digital solutions tailored to your brand's unique needs
            </p>
          </div>
          
          <div className="lg:hidden">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              <div className="flex overflow-x-auto gap-4 pb-6 -mx-4 px-4 scroll-smooth scrollbar-hide" 
                   style={{ WebkitOverflowScrolling: 'touch' }}>
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] sm:w-[320px]"
                  >
                    <div className="group relative p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-400 transition-all duration-300 h-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`} />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <div className={`text-3xl mb-4 w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-700 font-semibold mb-3">{service.tagline}</p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-800 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                          <span>Learn more</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-4">
                {services.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-4 bg-gray-800' : 'w-1.5 bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className={`text-3xl mb-4 w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-700 font-semibold mb-3">{service.tagline}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-800 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lg:hidden">
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {sectionSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'bg-gray-800 w-4' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div
          ref={mobileSliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            height: 'calc(100vh - 80px)',
            scrollBehavior: 'smooth',
          }}
        >
          {sectionSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-screen snap-start overflow-y-auto hide-scrollbar"
              style={{ 
                height: 'calc(100vh - 80px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="min-h-full bg-white py-6 px-4 flex flex-col">
                <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-gray-800 uppercase mb-2 flex-shrink-0">
                  {slide.title}
                </span>

                <h2 className="font-black mb-2 leading-tight text-gray-900 text-2xl flex-shrink-0">
                  <span className="text-gray-800">{slide.heading.split(' ')[0]}</span>{' '}
                  {slide.heading.split(' ').slice(1).join(' ')}
                </h2>

                <p className="text-gray-600 mb-3 leading-relaxed text-xs flex-shrink-0">
                  {slide.description}
                </p>

                <div className="flex-1 overflow-y-auto hide-scrollbar pr-1" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                  {slide.stats && (
                    <div className="space-y-3 mb-4">
                      {slide.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-700 font-medium">{stat.label}</span>
                            <span className="text-gray-900 font-black">{stat.pct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gray-800"
                              style={{ width: `${stat.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.features && (
                    <ul className="space-y-2 mb-4">
                      {slide.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <span className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.items && !Array.isArray(slide.items[0]) && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {slide.items.map((item, i) => (
                        <div key={i} className="p-2.5 bg-white border border-gray-200 rounded-lg">
                          <div className="w-1 h-1 rounded-full bg-gray-800 mb-1.5" />
                          <h4 className="font-bold text-xs text-gray-900 mb-0.5">{item.title}</h4>
                          <p className="text-[10px] text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.items && slide.items[0] && Array.isArray(slide.items[0]) && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {slide.items.map(([val, label], i) => (
                        <div key={i} className="text-center p-2 bg-white border border-gray-200 rounded-lg">
                          <div className="text-base font-black text-gray-900">{val}</div>
                          <p className="text-[9px] text-gray-600">{label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.tech && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {slide.tech.slice(0, 6).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 rounded-full text-[10px] border border-gray-200 text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {slide.social && (
                    <div className="grid grid-cols-4 gap-1.5 mb-4">
                      {slide.social.map(([emoji, name], i) => (
                        <div key={i} className="text-center p-1.5 bg-gray-100 rounded-lg border border-gray-200">
                          <div className="text-xl mb-0.5">{emoji}</div>
                          <span className="text-[8px] font-medium text-gray-700">{name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="relative mb-3">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden ring-1 ring-gray-200">
                      <img
                        src={slide.image}
                        alt={slide.heading}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                    </div>
                    
                    {slide.badge1 && (
                      <div className="absolute -bottom-2 -left-2 p-1.5 bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="text-xs font-black text-gray-900">{slide.badge1.value}</div>
                        <div className="text-[7px] text-gray-600">{slide.badge1.label}</div>
                      </div>
                    )}
                    
                    {slide.badge2 && (
                      <div className="absolute -top-1 -right-1 p-1.5 bg-white border border-gray-200 rounded-lg">
                        <div className="text-[10px] font-black text-gray-800">{slide.badge2.value}</div>
                        <div className="text-[6px] text-gray-600">{slide.badge2.label}</div>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 text-gray-800 hover:gap-4 transition-all font-semibold text-sm group mt-3 flex-shrink-0"
                >
                  <span>{slide.linkText}</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex justify-center gap-1.5 mt-3 flex-shrink-0">
                  {sectionSlides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === index ? 'w-4 bg-gray-800' : 'w-1 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        {sectionSlides.map((slide, index) => (
          <section
            key={slide.id}
            className={`py-14 sm:py-18 md:py-22 relative overflow-hidden bg-white ${
              index % 2 === 0 ? 'bg-gradient-to-br' : 'bg-gradient-to-bl'
            } from-gray-100 via-transparent to-gray-100`}
          >
            <div className="container-custom relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
                <div className={`relative order-2 lg:order-${index % 2 === 0 ? '2' : '1'}`}>
                  <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-gray-200">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="parallax-img w-full h-full object-cover scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                  </div>
                  
                  {slide.badge1 && (
                    <div className={`floating-badge absolute ${
                      index % 2 === 0 ? '-bottom-3 -left-3 sm:-bottom-5 sm:-left-5' : '-bottom-3 -right-2 sm:-bottom-5 sm:-right-5'
                    } p-2.5 sm:p-3.5 bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-lg`}>
                      <div className="text-sm sm:text-lg md:text-xl font-black text-gray-900">{slide.badge1.value}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">{slide.badge1.label}</div>
                    </div>
                  )}
                  
                  {slide.badge2 && (
                    <div className="floating-badge absolute -top-2 -right-2 sm:-top-3 sm:-right-3 p-2 sm:p-2.5 bg-white border border-gray-200 rounded-xl">
                      <div className="text-xs sm:text-sm md:text-base font-black text-gray-800">{slide.badge2.value}</div>
                      <div className="text-[8px] sm:text-[9px] text-gray-600">{slide.badge2.label}</div>
                    </div>
                  )}
                  
                  <div className={`absolute ${
                    index % 2 === 0 ? '-bottom-6 -left-6' : '-bottom-7 -right-7'
                  } w-28 sm:w-40 h-28 sm:h-40 bg-gray-200 rounded-full blur-3xl animate-pulse`} />
                  <div className={`absolute ${
                    index % 2 === 0 ? '-top-6 -right-6' : '-top-6 -left-6'
                  } w-32 sm:w-44 h-32 sm:h-44 bg-gray-200 rounded-full blur-3xl animate-pulse`} />
                </div>

                <div className={`order-1 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
                  <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-2 sm:mb-3">
                    {slide.title}
                  </span>
                  <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight text-gray-900" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                    <span className="text-gray-800">{slide.heading.split(' ')[0]}</span> {slide.heading.split(' ').slice(1).join(' ')}
                  </h2>
                  <p className="text-gray-600 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                    {slide.description}
                  </p>

                  {slide.stats && (
                    <div className="space-y-2.5 sm:space-y-3.5 md:space-y-4 mb-5 sm:mb-6 md:mb-7">
                      {slide.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[10px] sm:text-xs md:text-sm mb-1">
                            <span className="text-gray-700 font-medium">{stat.label}</span>
                            <span className="text-gray-900 font-black">{stat.pct}%</span>
                          </div>
                          <div className="h-1.5 sm:h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="seo-bar-fill h-full rounded-full bg-gray-800"
                              style={{ width: `${stat.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.features && (
                    <ul className="space-y-1.5 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-5 md:mb-6">
                      {slide.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
                          <span className="w-3.5 h-3.5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.items && !Array.isArray(slide.items[0]) && (
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-7">
                      {slide.items.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 md:p-4 bg-white border border-gray-200 rounded-lg md:rounded-xl"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-800 mb-2" />
                          <h4 className="font-bold text-xs md:text-sm text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.items && slide.items[0] && Array.isArray(slide.items[0]) && (
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-7">
                      {slide.items.map(([val, label], i) => (
                        <div key={i} className="text-center p-3 md:p-4 bg-white border border-gray-200 rounded-lg md:rounded-xl">
                          <div className="text-lg md:text-2xl font-black text-gray-900">{val}</div>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.tech && (
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                      {slide.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-xs md:text-sm border border-gray-200 text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {slide.social && (
                    <div className="grid grid-cols-4 gap-2 mb-4 md:mb-6">
                      {slide.social.map(([emoji, name], i) => (
                        <div
                          key={i}
                          className="text-center p-2 bg-gray-100 rounded-lg border border-gray-200"
                        >
                          <div className="text-2xl mb-1">{emoji}</div>
                          <span className="text-xs font-medium text-gray-700">{name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 text-gray-800 hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
                  >
                    <span>{slide.linkText}</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-9 sm:py-12 md:py-14 overflow-hidden bg-white">
        <div className="text-center mb-6 sm:mb-8 px-4">
          <h2 className="font-black text-gray-900" style={{ fontSize: 'clamp(1.4rem, 4.2vw, 2.4rem)' }}>
            Trusted by <span className="text-gray-800">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-2.5 text-[10px] sm:text-xs md:text-sm">
            Join hundreds of brands that have partnered with us
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div 
            ref={clientsMarqueeRef}
            className="flex whitespace-nowrap animate-marquee will-change-transform"
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="mx-4 sm:mx-6 text-xs sm:text-base md:text-xl font-black text-gray-200 hover:text-gray-400 transition-colors flex-shrink-0"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative overflow-hidden mt-4">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div 
            className="flex whitespace-nowrap animate-marquee-reverse will-change-transform"
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="mx-4 sm:mx-6 text-[10px] sm:text-xs md:text-sm font-bold text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-14 sm:py-18 md:py-22 bg-white">
        <div className="container-custom">
          <div className="text-center mb-7 sm:mb-10 md:mb-12">
            <h2 className="font-black text-gray-900" style={{ fontSize: 'clamp(1.5rem, 4.6vw, 2.7rem)' }}>
              Numbers That <span className="text-gray-800">Speak</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item text-center p-4 sm:p-6 md:p-8 bg-white border border-gray-200 rounded-xl sm:rounded-2xl md:rounded-3xl hover:border-gray-800 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/0 to-gray-100/0 group-hover:from-gray-100 group-hover:to-gray-100 transition-all duration-500" />
                <div className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-2 sm:mb-3 flex justify-center group-hover:scale-125 transition-transform duration-300 relative z-10">
                  {stat.icon}
                </div>
                <div
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-0.5 sm:mb-1.5 relative z-10"
                  data-count={stat.count}
                  data-suffix={stat.suffix}
                >
                  {stat.count}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 text-[9px] sm:text-xs md:text-sm relative z-10">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-14 sm:py-18 md:py-22 bg-white">
        <div className="container-custom px-3 sm:px-4 md:px-6">
          <div className="cta-content relative p-7 sm:p-12 md:p-16 lg:p-20 rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white/10 rounded-full text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6 md:mb-7 backdrop-blur-sm">
                <FiGlobe />
                Ready when you are
              </div>
              <h2
                className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight drop-shadow-lg text-white"
                style={{ fontSize: 'clamp(1.8rem, 5.4vw, 3rem)' }}
              >
                Ready to Ride the Wave?
              </h2>
              <p className="text-xs sm:text-sm md:text-lg mb-6 sm:mb-8 md:mb-9 max-w-xl md:max-w-2xl mx-auto opacity-90 leading-relaxed text-gray-300">
                Let's create something amazing together and take your brand to new heights. Our team is ready to transform your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 bg-white text-gray-900 rounded-full font-black hover:shadow-[0_0_42px_rgba(255,255,255,0.3)] transition-all group text-xs sm:text-sm md:text-base"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 border-2 border-white/60 rounded-full font-bold hover:bg-white/15 hover:border-white transition-all text-xs sm:text-sm md:text-base backdrop-blur-sm text-white"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee 18s linear infinite reverse;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cursor-grab {
          cursor: grab;
        }
        .cursor-grabbing {
          cursor: grabbing;
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

export default Home;