import React, { useEffect, useRef } from 'react';
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
  const brandingRef = useRef(null);
  const seoRef = useRef(null);
  const webRef = useRef(null);
  const performanceRef = useRef(null);
  const socialRef = useRef(null);
  const creativeRef = useRef(null);
  const productionRef = useRef(null);
  const prRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const textRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeRef2 = useRef(null);
  // Removed cursorRef and cursorDotRef
  const splineRef = useRef(null);

  const onSplineLoad = (spline) => {
    splineRef.current = spline;
  };

  useEffect(() => {
    if (!waveRef.current) return;
    gsap.to(waveRef.current, {
      xPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: waveRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  // Removed cursor useEffect entirely

  useEffect(() => {
    setTimeout(() => ScrollTrigger.refresh(), 600);

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

      if (heroRef.current) {
        const heroSpot = document.querySelector('.hero-spot');
        if (heroSpot) {
          gsap.fromTo(
            heroSpot,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1.1, duration: 1.4, ease: 'power3.out', delay: 0.6 }
          );
          gsap.to(heroSpot, {
            scale: 1.25,
            opacity: 0.4,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }

      gsap.fromTo(
        '.scroll-line',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1, delay: 2, ease: 'power2.out' }
      );

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

      gsap.to('body', {
        backgroundColor: '#020208',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
      servicesTl
        .fromTo(
          '.services-heading',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
        )
        .fromTo(
          '.service-card',
          { y: 80, opacity: 0, scale: 0.86, rotationY: 10, xPercent: -6 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            xPercent: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'back.out(1.25)',
          },
          '-=0.4'
        );

      const addTilt = () => {
        document.querySelectorAll('.service-card').forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
            gsap.to(card, {
              rotationX: y,
              rotationY: x,
              duration: 0.35,
              ease: 'power1.out',
              transformPerspective: 900,
              overwrite: 'auto',
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.55,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        });
      };
      addTilt();

      const sectionDefs = [
        { ref: brandingRef, content: '.branding-content', img: '.branding-image', dir: -1 },
        { ref: seoRef, content: '.seo-content', img: '.seo-image', dir: 1 },
        { ref: webRef, content: '.web-content', img: '.web-image', dir: -1 },
        { ref: performanceRef, content: '.performance-content', img: '.performance-image', dir: 1 },
        { ref: socialRef, content: '.social-content', img: '.social-image', dir: -1 },
        { ref: creativeRef, content: '.creative-content', img: '.creative-image', dir: 1 },
        { ref: productionRef, content: '.production-content', img: '.production-image', dir: -1 },
        { ref: prRef, content: '.pr-content', img: '.pr-image', dir: 1 },
      ];

      sectionDefs.forEach(({ ref, content, img, dir }) => {
        if (!ref.current) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });
        tl.fromTo(
          content,
          { x: dir * 80, opacity: 0, filter: 'blur(10px)', scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
          }
        )
          .fromTo(
            img,
            { x: dir * -60, opacity: 0, scale: 0.86, y: 30 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .fromTo(
            ref.current.querySelectorAll('.anim-card'),
            { y: 28, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: 'power2.out',
            },
            '-=0.6'
          );
      });

      gsap.fromTo(
        '.seo-bar-fill',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: seoRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.platform-tag',
        { scale: 0, opacity: 0, rotation: -18 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: performanceRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.plat-item',
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.media-badge',
        { scale: 0, opacity: 0, y: 12 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: prRef.current,
            start: 'top 70%',
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

      gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
          yPercent: -14,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('section') || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
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

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: -4,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const heroChars = ['S', 'e', 'c', 'o', 'n', 'd', '\u00A0', 'W', 'a', 'v', 'e', '.'];

  const services = [
    { icon: <FiCamera />, title: 'Branding', tagline: 'Eye catchy', description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions.', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10', features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'] },
    { icon: <FiTrendingUp />, title: 'SEO', tagline: 'On top', description: 'Dominate search engine rankings with our data-driven SEO strategies.', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10', features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'] },
    { icon: <FiCode />, title: 'Website Dev', tagline: 'Dynamic, User Friendly', description: 'Build powerful, responsive websites that convert visitors into customers.', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10', features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design'] },
    { icon: <FiMonitor />, title: 'Performance', tagline: 'Meta, Google', description: 'Data-driven advertising campaigns that deliver measurable results.', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/10', features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting'] },
    { icon: <FiHeart />, title: 'Social Media', tagline: 'Fun, Engagement', description: 'Build thriving communities and drive engagement through social media.', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-500/10', features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics'] },
    { icon: <FiStar />, title: 'Creative', tagline: 'Strategy, growth', description: 'Innovative creative solutions that drive brand growth and capture attention.', color: 'from-yellow-500 to-amber-500', bgColor: 'bg-yellow-500/10', features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Storytelling'] },
    { icon: <FiFilm />, title: 'Production', tagline: 'Sound, Camera, Action', description: 'Professional video and audio production that brings your vision to life.', color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-500/10', features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production'] },
    { icon: <FiUsers />, title: 'Digital PR', tagline: 'We can get anyone', description: 'Strategic PR campaigns that build relationships with media and influencers.', color: 'from-violet-500 to-purple-500', bgColor: 'bg-violet-500/10', features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation'] },
  ];

  const clients = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel', 'Tesla', 'SpaceX', 'Uber', 'Airbnb', 'Shopify', 'Slack'];

  const stats = [
    { count: 500, suffix: '+', label: 'Projects Completed', icon: <FiAward /> },
    { count: 200, suffix: '+', label: 'Happy Clients', icon: <FiHeart /> },
    { count: 50, suffix: '+', label: 'Awards Won', icon: <FiStar /> },
    { count: 10, suffix: '+', label: 'Years Experience', icon: <FiTarget /> },
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Removed cursor and cursorDot divs */}

      <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#020208]">
        <div className="absolute inset-0 z-0">
          <Spline
        scene="https://prod.spline.design/JYTycjS8XA5lO3kB/scene.splinecode" 
        onLoad={onSplineLoad}
            className="w-full h-full"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020208] z-10 pointer-events-none" />
        
        <div className="hero-spot absolute -bottom-10 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(153,69,255,0.3),transparent)] opacity-40 blur-3xl pointer-events-none z-20" />

        <div className="relative z-30 text-center px-4 max-w-5xl md:max-w-6xl mx-auto w-full">
          <div className="hero-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-white/5 border border-[#9945FF]/40 rounded-full text-[10px] sm:text-xs md:text-sm text-gray-300 backdrop-blur-md cursor-hover">
            <span className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
            Award-Winning Digital Agency
            <FiZap className="text-[#14F195]" />
          </div>

          <div className="mb-3 sm:mb-5" style={{ perspective: '1000px' }}>
            <h1 className="font-black leading-none tracking-tight" style={{ fontSize: 'clamp(2.6rem, 9vw, 5.5rem)' }}>
              {heroChars.map((char, i) => (
                <span
                  key={i}
                  className={`hero-char inline-block ${i < 6 ? 'text-white' : 'text-white'}`}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <p className="hero-subtitle text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 py-2">
            Riding the digital wave to transform your brand into an unforgettable experience through innovation, creativity, and strategic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center mb-7 sm:mb-10 md:mb-12">
            <Link
              to="/services"
              className="hero-cta-btn group relative px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-xs sm:text-sm md:text-base font-bold overflow-hidden shadow-[0_0_26px_rgba(153,69,255,0.5)] hover:shadow-[0_0_50px_rgba(153,69,255,0.8)] transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
            </Link>
            <Link
              to="/works"
              className="hero-cta-btn group px-5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 md:py-4 border border-white/20 rounded-full text-xs sm:text-sm md:text-base font-semibold hover:border-[#9945FF] hover:bg-white/5 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
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
              <div key={i} className="hero-stat text-center cursor-hover">
                <div className="text-lg sm:text-2xl md:text-3xl font-black gradient-text">{num}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 tracking-[0.3em] uppercase">SCROLL</span>
          <div className="scroll-line w-px h-10 sm:h-12 md:h-14 bg-gradient-to-b from-[#9945FF] to-transparent" />
        </div>
      </section>

      <div className="relative py-6 sm:py-10 overflow-hidden bg-[#020208]">
        <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#020208] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#020208] to-transparent z-10" />
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div
            ref={waveRef}
            className="flex font-black tracking-tighter text-white/[0.06] uppercase"
            style={{ fontSize: 'clamp(2.8rem, 14vw, 10rem)', whiteSpace: 'nowrap' }}
          >
            <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE</span>
            <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE</span>
            <span className="mr-10 sm:mr-16 flex-shrink-0">SECONDWAVE</span>
          </div>
        </div>
      </div>

      <section ref={textRef} className="py-12 sm:py-20 md:py-24 bg-[#020208]">
        <div className="container-custom">
          <div
            className="reveal-text font-black text-center max-w-4xl md:max-w-5xl mx-auto leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)' }}
          >
            {["We don't just market,", 'we create experiences', 'that inspire, engage,', 'and transform.'].map((line, i) => (
              <div key={i} className="overflow-hidden mb-1 sm:mb-1.5">
                <span className={`text-block inline-block ${i % 2 === 0 ? 'gradient-text' : 'text-white'}`}>{line}</span>
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
                className="counter-box text-center p-2.5 sm:p-4 md:p-5 glass-morphism rounded-lg sm:rounded-xl border border-white/5 hover:border-[#9945FF]/40 transition-colors cursor-default"
              >
                <div className="text-base sm:text-2xl md:text-3xl font-black gradient-text">{item.val}</div>
                <div className="text-[9px] sm:text-xs md:text-sm text-gray-500 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="py-12 sm:py-18 md:py-22 bg-[#020208]">
        <div className="container-custom">
          <div className="services-heading text-center mb-7 sm:mb-10 md:mb-14">
            <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#14F195] uppercase mb-2 sm:mb-3">
              What We Do
            </span>
            <h2 className="font-black" style={{ fontSize: 'clamp(1.7rem, 5.4vw, 3rem)' }}>
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-500 mt-2.5 sm:mt-3.5 max-w-xl mx-auto text-[11px] sm:text-sm md:text-base px-4">
              Comprehensive digital solutions tailored to your brand's unique needs
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group relative p-2.5 sm:p-4 md:p-5 glass-morphism rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div
                    className={`text-lg sm:text-2xl md:text-3xl mb-1.5 sm:mb-2.5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl ${service.bgColor} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-[10px] sm:text-sm md:text-base font-bold mb-0.5">{service.title}</h3>
                  <p className={`text-[9px] sm:text-xs md:text-sm mb-1.5 sm:mb-2.5 bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-semibold`}>
                    {service.tagline}
                  </p>
                  <p className="text-gray-500 text-[9px] sm:text-xs md:text-sm mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                    {service.description}
                  </p>
                  <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
                    {service.features.slice(0, 2).map((f, i) => (
                      <span key={i} className="text-[10px] sm:text-xs px-2 py-0.5 bg-white/5 rounded-full text-gray-400">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[#9945FF] text-[10px] sm:text-xs md:text-sm font-medium">
                    <span>Learn more</span>
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={brandingRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10" />
        <div className="absolute top-1/2 left-0 w-40 h-40 sm:w-56 sm:h-56 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="branding-content">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#9945FF] uppercase mb-2 sm:mb-3">
                Brand Identity
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Branding</span> That Sticks
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Create unforgettable brand identities that captivate your audience and leave lasting impressions. From logo design to comprehensive brand guidelines, we craft cohesive visual stories.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-7">
                {[
                  { title: 'Brand Strategy', desc: 'Positioning & messaging' },
                  { title: 'Visual Identity', desc: 'Logos & guidelines' },
                  { title: 'Brand Voice', desc: 'Tone & personality' },
                  { title: 'Brand Experience', desc: 'Touchpoints & journey' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="anim-card p-2.5 sm:p-3.5 md:p-4 glass-morphism rounded-lg sm:rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-1.5 group-hover:scale-150 transition-transform" />
                    <h4 className="font-bold text-[10px] sm:text-xs md:text-sm mb-0.5">{item.title}</h4>
                    <p className="text-[9px] sm:text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/branding"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>Discover our branding process</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="branding-image relative">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Branding"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 p-2.5 sm:p-3.5 glass-morphism rounded-xl sm:rounded-2xl border border-purple-500/30 shadow-[0_0_26px_rgba(153,69,255,0.2)]">
                <div className="text-sm sm:text-lg md:text-xl font-black gradient-text">300+</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Brands Created</div>
              </div>
              <div className="floating-badge absolute -top-2 -right-2 sm:-top-3 sm:-right-3 p-2 sm:p-2.5 glass-morphism rounded-xl border border-pink-500/30">
                <div className="text-xs sm:text-sm md:text-base font-black text-pink-400">★★★★★</div>
                <div className="text-[8px] sm:text-[9px] text-gray-400">Rated</div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-28 sm:w-40 h-28 sm:h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -top-6 -right-6 w-32 sm:w-44 h-32 sm:h-44 bg-pink-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={seoRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/10 via-transparent to-cyan-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="seo-image relative order-2 lg:order-1">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="SEO"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -bottom-3 -right-2 sm:-bottom-5 sm:-right-5 p-2.5 sm:p-3 glass-morphism rounded-xl sm:rounded-2xl border border-blue-500/30">
                <div className="text-sm sm:text-lg md:text-xl font-black text-blue-400">#1</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Rankings</div>
              </div>
              <div className="absolute -bottom-7 -right-7 w-32 sm:w-44 h-32 sm:h-44 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="seo-content order-1 lg:order-2">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#14F195] uppercase mb-2 sm:mb-3">
                Search Domination
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">SEO</span> Excellence
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Dominate search engine rankings with our data-driven SEO strategies. Sustainable organic growth with higher conversions and maximum ROI.
              </p>
              <div className="space-y-2.5 sm:space-y-3.5 md:space-y-4 mb-5 sm:mb-6 md:mb-7">
                {[
                  { label: 'Organic Traffic Growth', pct: 94 },
                  { label: 'Keyword Rankings', pct: 87 },
                  { label: 'Conversion Rate Lift', pct: 76 },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] sm:text-xs md:text-sm mb-1">
                      <span className="text-gray-300 font-medium">{bar.label}</span>
                      <span className="gradient-text font-black">{bar.pct}%</span>
                    </div>
                    <div className="h-1.5 sm:h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="seo-bar-fill h-full rounded-full"
                        style={{
                          width: `${bar.pct}%`,
                          background: 'linear-gradient(90deg,#9945FF,#14F195)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="seo-stats grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3 mb-5 sm:mb-6 md:mb-7">
                {[
                  ['#1', 'Rankings'],
                  ['200%', 'Traffic'],
                  ['5x', 'ROI'],
                ].map(([val, label], i) => (
                  <div key={i} className="anim-card text-center p-2 sm:p-3 md:p-4 glass-morphism rounded-lg sm:rounded-xl border border-white/5">
                    <div className="text-sm sm:text-lg md:text-2xl font-black gradient-text">{val}</div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/seo"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>Explore SEO strategies</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={webRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="web-content">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#14F195] uppercase mb-2 sm:mb-3">
                Development
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Web Dev</span> That Converts
              </h2>
              <p className="text-gray-400 mb-3.5 sm:mb-4.5 md:mb-5.5 leading-relaxed text-xs sm:text-sm md:text-base">
                Build powerful, responsive websites that turn visitors into customers. Lightning-fast performance, seamless UX, and scalable solutions.
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4.5 md:mb-5.5">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'Shopify', 'WordPress', 'Tailwind', 'MongoDB'].map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded-full text-[9px] sm:text-xs text-gray-300 hover:border-[#14F195]/50 hover:text-[#14F195] transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="web-features space-y-1.5 sm:space-y-2.5 md:space-y-3 mb-4 sm:mb-5 md:mb-6">
                {[
                  'Custom Development with React/Node.js',
                  'E-commerce Solutions on Shopify/Magento',
                  'Responsive Mobile-First Design',
                  'CMS Integration (WordPress, Sanity)',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#14F195]/20 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/web-development"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>View our development work</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="web-image relative">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Web Development"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2.5 sm:p-3 glass-morphism rounded-xl sm:rounded-2xl border border-green-500/30">
                <div className="text-sm sm:text-lg md:text-xl font-black text-green-400">99ms</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Load Time</div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 sm:w-44 h-32 sm:h-44 bg-green-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={performanceRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-900/10 via-transparent to-red-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="performance-image relative order-2 lg:order-1">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Performance Marketing"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 p-2.5 sm:p-3.5 glass-morphism rounded-xl sm:rounded-2xl border border-orange-500/30">
                <div className="text-sm sm:text-lg md:text-2xl font-black text-orange-400">380%</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Avg ROI</div>
              </div>
              <div className="absolute -bottom-7 -right-7 w-32 sm:w-44 h-32 sm:h-44 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="performance-content order-1 lg:order-2">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#9945FF] uppercase mb-2 sm:mb-3">
                Paid Media
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Performance</span> That Delivers
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Data-driven campaigns across Meta and Google. Advanced targeting with creative excellence to maximize ROI and drive qualified traffic that converts.
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mb-4 sm:mb-5 md:mb-6">
                {['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Retargeting', 'Analytics', 'A/B Testing', 'Attribution'].map(
                  (p, i) => (
                    <span
                      key={i}
                      className="platform-tag px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 bg-white/5 rounded-full text-[9px] sm:text-xs md:text-sm border border-white/10 hover:border-orange-500/40 transition-colors cursor-default font-medium"
                    >
                      {p}
                    </span>
                  )
                )}
              </div>
              <Link
                to="/performance-marketing"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>Boost your campaigns</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={socialRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-transparent to-rose-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="social-content">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#14F195] uppercase mb-2 sm:mb-3">
                Community Growth
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Social Media</span> Marketing
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Build thriving communities and drive engagement. Content that sparks conversations, builds brand loyalty, and turns followers into advocates.
              </p>
              <div className="social-platforms grid grid-cols-4 gap-1.5 sm:gap-2.5 mb-4 sm:mb-5 md:mb-6">
                {[
                  ['📸', 'Insta'],
                  ['🎵', 'TikTok'],
                  ['👍', 'Facebook'],
                  ['🐦', 'Twitter'],
                  ['💼', 'LinkedIn'],
                  ['▶️', 'YouTube'],
                  ['📌', 'Pinterest'],
                  ['👻', 'Snapchat'],
                ].map(([emoji, name], i) => (
                  <div
                    key={i}
                    className="plat-item text-center p-1.5 sm:p-2.5 bg-white/5 rounded-lg sm:rounded-xl border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all cursor-default group"
                  >
                    <div className="text-base sm:text-xl md:text-2xl mb-0.5 sm:mb-1 group-hover:scale-125 transition-transform">
                      {emoji}
                    </div>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-gray-400">{name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/social-media-marketing"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>Grow your community</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="social-image relative">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Social Media"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -top-2 -left-2 sm:-top-4 sm:-left-4 p-2.5 sm:p-3 glass-morphism rounded-xl sm:rounded-2xl border border-pink-500/30">
                <div className="text-sm sm:text-lg md:text-xl font-black text-pink-400">2M+</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Followers</div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 sm:w-44 h-32 sm:h-44 bg-pink-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={creativeRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-900/10 via-transparent to-amber-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="creative-image relative order-2 lg:order-1">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Creative"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -bottom-3 -right-2 sm:-bottom-5 sm:-right-5 p-2.5 sm:p-3 glass-morphism rounded-xl sm:rounded-2xl border border-yellow-500/30">
                <div className="text-sm sm:text-lg md:text-xl font-black text-yellow-400">∞</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Creativity</div>
              </div>
              <div className="absolute -bottom-7 -left-7 w-32 sm:w-44 h-32 sm:h-44 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="creative-content order-1 lg:order-2">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#9945FF] uppercase mb-2 sm:mb-3">
                Creative Studio
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Creative</span> Excellence
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Innovative creative solutions that drive brand growth. Design thinking meets marketing expertise to deliver work that truly resonates with your audience.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-7">
                {[
                  { title: 'Creative Direction', desc: 'Vision & concepts' },
                  { title: 'Content Creation', desc: 'Visual storytelling' },
                  { title: 'Campaign Strategy', desc: 'Integrated planning' },
                  { title: 'Brand Storytelling', desc: 'Narrative development' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="anim-card p-2.5 sm:p-3.5 md:p-4 glass-morphism rounded-lg sm:rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors group cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 mb-1.5 group-hover:scale-150 transition-transform" />
                    <h4 className="font-bold text-[10px] sm:text-xs md:text-sm mb-0.5">{item.title}</h4>
                    <p className="text-[9px] sm:text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/creative"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>Explore creative work</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={productionRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="production-content">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#14F195] uppercase mb-2 sm:mb-3">
                Film & Audio
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Production</span> Excellence
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Professional video and audio production that brings your vision to life. Cinematic quality that captivates and communicates your message powerfully.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-7">
                {[
                  { title: 'Video Production', desc: 'Commercials & brand films' },
                  { title: 'Sound Design', desc: 'Audio & mixing' },
                  { title: 'Post-Production', desc: 'Editing & VFX' },
                  { title: 'Photography', desc: 'Product & lifestyle' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="anim-card p-2.5 sm:p-3.5 md:p-4 glass-morphism rounded-lg sm:rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors group cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-1.5 group-hover:scale-150 transition-transform" />
                    <h4 className="font-bold text-[10px] sm:text-xs md:text-sm mb-0.5">{item.title}</h4>
                    <p className="text-[9px] sm:text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/production"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>See our production work</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="production-image relative">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Production"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2.5 sm:p-3 glass-morphism rounded-xl sm:rounded-2xl border border-indigo-500/30">
                <div className="text-sm sm:text-lg md:text-xl font-black text-indigo-400">4K</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Ultra HD</div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 sm:w-44 h-32 sm:h-44 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={prRef} className="py-14 sm:py-18 md:py-22 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-violet-900/10 via-transparent to-purple-900/10" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 md:gap-14 items-center">
            <div className="pr-image relative order-2 lg:order-1">
              <div className="aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Digital PR"
                  className="parallax-img w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="floating-badge absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 p-2.5 sm:p-3 glass-morphism rounded-xl sm:rounded-2xl border border-violet-500/30">
                <div className="text-sm sm:text-lg md:text-xl font-black text-violet-400">50+</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">Publications</div>
              </div>
              <div className="absolute -bottom-7 -left-7 w-32 sm:w-44 h-32 sm:h-44 bg-violet-500/15 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="pr-content order-1 lg:order-2">
              <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#9945FF] uppercase mb-2 sm:mb-3">
                Public Relations
              </span>
              <h2 className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)' }}>
                <span className="gradient-text">Digital PR</span>
              </h2>
              <p className="text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications worldwide.
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mb-5 sm:mb-6 md:mb-7">
                {['Forbes', 'TechCrunch', 'Vogue', 'WSJ', 'CNN', 'BBC', 'NYT', 'Bloomberg'].map((media, i) => (
                  <span
                    key={i}
                    className="media-badge px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 bg-white/5 rounded-full text-[9px] sm:text-xs md:text-sm border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-colors cursor-default font-medium"
                  >
                    {media}
                  </span>
                ))}
              </div>
              <Link
                to="/digital-pr"
                className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all font-semibold text-xs sm:text-sm md:text-base group"
              >
                <span>Get featured</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-9 sm:py-12 md:py-14 overflow-hidden bg-[#020208]">
        <div className="text-center mb-6 sm:mb-8 px-4">
          <h2 className="font-black" style={{ fontSize: 'clamp(1.4rem, 4.2vw, 2.4rem)' }}>
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-gray-500 mt-2 sm:mt-2.5 text-[10px] sm:text-xs md:text-sm">
            Join hundreds of brands that have partnered with us
          </p>
        </div>
        <div className="relative mb-2 sm:mb-3">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#020208] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#020208] to-transparent z-10" />
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="mx-4 sm:mx-6 text-xs sm:text-base md:text-xl font-black text-white/20 hover:text-white/60 transition-colors cursor-pointer flex-shrink-0"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#020208] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#020208] to-transparent z-10" />
          <div ref={marqueeRef2} className="flex whitespace-nowrap" style={{ transform: 'translateX(-50%)' }}>
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="mx-4 sm:mx-6 text-[10px] sm:text-xs md:text-sm font-bold text-white/10 hover:text-white/40 transition-colors cursor-pointer flex-shrink-0"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-14 sm:py-18 md:py-22 bg-[#020208]">
        <div className="container-custom">
          <div className="text-center mb-7 sm:mb-10 md:mb-12">
            <h2 className="font-black" style={{ fontSize: 'clamp(1.5rem, 4.6vw, 2.7rem)' }}>
              Numbers That <span className="gradient-text">Speak</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item text-center p-4 sm:p-6 md:p-8 glass-morphism rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/5 hover:border-[#9945FF]/30 transition-all group relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/0 to-[#14F195]/0 group-hover:from-[#9945FF]/6 group-hover:to-[#14F195]/6 transition-all duration-500" />
                <div className="text-lg sm:text-xl md:text-2xl text-[#9945FF] mb-2 sm:mb-3 flex justify-center group-hover:scale-125 transition-transform duration-300 relative z-10">
                  {stat.icon}
                </div>
                <div
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black gradient-text mb-0.5 sm:mb-1.5 relative z-10"
                  data-count={stat.count}
                  data-suffix={stat.suffix}
                >
                  {stat.count}
                  {stat.suffix}
                </div>
                <div className="text-gray-500 text-[9px] sm:text-xs md:text-sm relative z-10">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-14 sm:py-18 md:py-22 bg-[#020208]">
        <div className="container-custom px-3 sm:px-4 md:px-6">
          <div className="cta-content relative p-7 sm:p-12 md:p-16 lg:p-20 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] via-[#6633CC] to-[#14F195]" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white/20 rounded-full text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6 md:mb-7 backdrop-blur-sm">
                <FiGlobe />
                Ready when you are
              </div>
              <h2
                className="font-black mb-3 sm:mb-4 md:mb-5 leading-tight drop-shadow-lg"
                style={{ fontSize: 'clamp(1.8rem, 5.4vw, 3rem)' }}
              >
                Ready to Ride the Wave?
              </h2>
              <p className="text-xs sm:text-sm md:text-lg mb-6 sm:mb-8 md:mb-9 max-w-xl md:max-w-2xl mx-auto opacity-90 leading-relaxed">
                Let's create something amazing together and take your brand to new heights. Our team is ready to transform your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 bg-white text-[#0A0A0A] rounded-full font-black hover:shadow-[0_0_42px_rgba(255,255,255,0.5)] transition-all group text-xs sm:text-sm md:text-base"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 border-2 border-white/60 rounded-full font-bold hover:bg-white/15 hover:border-white transition-all text-xs sm:text-sm md:text-base backdrop-blur-sm"
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

export default Home;