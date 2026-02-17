import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Hero3D from '../components/Hero3D';
import { 
  FiArrowRight, FiCamera, FiTrendingUp, FiCode, FiMonitor, 
  FiHeart, FiStar, FiFilm, FiUsers, FiPlay, FiEye, FiTarget,
  FiBarChart2, FiSmartphone, FiMessageCircle, FiAward
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
  const horizontalTextRef = useRef(null);

  useEffect(() => {
    if (!waveRef.current) return;
  
    gsap.to(waveRef.current, {
      xPercent: -60,
      ease: "none",
      scrollTrigger: {
        trigger: waveRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true, // ← this links movement to scroll speed
      },
    });
  }, []);
  
  
  useEffect(() => {
    // Make sure ScrollTrigger refreshes after everything is loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.fromTo('.hero-title',
        { y: 100, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 2, 
          ease: 'power4.out',
          stagger: 0.2
        }
      );

      gsap.fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          delay: 0.8,
          ease: 'power3.out'
        }
      );

      gsap.fromTo('.hero-cta',
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          delay: 1.2,
          ease: 'back.out(1.7)',
          stagger: 0.2
        }
      );

      // Text reveal animation with ScrollTrigger
      gsap.fromTo('.reveal-text .text-block',
        { 
          y: '100%', 
          opacity: 0 
        },
        {
          y: '0%',
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            markers: false
          }
        }
      );

      // Color change on scroll
      gsap.to('body', {
        backgroundColor: '#0f0f1a',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });

      // Branding section animations
      gsap.fromTo('.branding-content',
        { x: -200, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: brandingRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.branding-image',
        { scale: 0.5, opacity: 0, rotate: 45 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: brandingRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // SEO section animations
      gsap.fromTo('.seo-content',
        { x: 200, opacity: 0, rotate: 10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: seoRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.seo-stats div',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: seoRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Web section animations
      gsap.fromTo('.web-content',
        { y: 100, opacity: 0, rotateX: 90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: webRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.web-features li',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: webRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Performance marketing animations
      gsap.fromTo('.performance-content',
        { scale: 0.8, opacity: 0, rotate: -5 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: performanceRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.platform-tag',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: performanceRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Social media animations
      gsap.fromTo('.social-content',
        { x: -100, opacity: 0, skewX: 10 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo('.social-platforms div',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Creative section animations
      gsap.fromTo('.creative-content',
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: creativeRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Production section animations
      gsap.fromTo('.production-content',
        { x: 100, opacity: 0, skewX: -10 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: productionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // PR section animations
      gsap.fromTo('.pr-content',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: prRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stats animation with counter
      gsap.fromTo('.stat-number',
        { innerText: 0 },
        {
          innerText: 500,
          duration: 2,
          ease: 'power1.in',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Clients marquee animation using GSAP
      gsap.to(marqueeRef.current, {
        x: '-50%',
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Timeline for service cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.service-card',
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' }
      );

      // CTA Section Animation
      gsap.fromTo('.cta-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: <FiCamera className="text-3xl" />,
      title: 'Branding',
      tagline: 'Eye catchy',
      description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions. From logo design to comprehensive brand guidelines, we craft cohesive visual stories that resonate.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines']
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: 'SEO',
      tagline: 'On top',
      description: 'Dominate search engine rankings with our data-driven SEO strategies. We help you reach the top and stay there with cutting-edge optimization techniques and continuous monitoring.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building']
    },
    {
      icon: <FiCode className="text-3xl" />,
      title: 'Website Development',
      tagline: 'Dynamic, User Friendly',
      description: 'Build powerful, responsive websites that convert visitors into customers. Our modern tech stack ensures optimal performance, seamless user experience, and scalable solutions.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design']
    },
    {
      icon: <FiMonitor className="text-3xl" />,
      title: 'Performance Marketing',
      tagline: 'Meta, Google',
      description: 'Data-driven advertising campaigns that deliver measurable results across Meta and Google platforms. Maximize ROI with targeted strategies and real-time optimization.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting']
    },
    {
      icon: <FiHeart className="text-3xl" />,
      title: 'Social Media Marketing',
      tagline: 'Fun, Engagement, Awareness',
      description: 'Build thriving communities and drive engagement through strategic social media marketing. Create content that sparks conversations and builds brand loyalty.',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics']
    },
    {
      icon: <FiStar className="text-3xl" />,
      title: 'Creative',
      tagline: 'Strategy, growth',
      description: 'Innovative creative solutions that drive brand growth and capture audience attention. From concept to execution, we bring ideas to life with artistic excellence.',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-500/10',
      features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Storytelling']
    },
    {
      icon: <FiFilm className="text-3xl" />,
      title: 'Production',
      tagline: 'Sound, Camera, Action',
      description: 'Professional video and audio production services that bring your vision to life. From concept to final cut, we deliver cinematic quality that captivates audiences.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
      features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production']
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: 'Digital PR',
      tagline: 'We can get anyone',
      description: 'Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications and amplify your brand message.',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-500/10',
      features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation']
    }
  ];

  const clients = [
    'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix',
    'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel',
    'Tesla', 'SpaceX', 'Uber', 'Airbnb', 'Shopify', 'Slack'
  ];

  const stats = [
    { number: 500, label: 'Projects Completed', suffix: '+' },
    { number: 200, label: 'Happy Clients', suffix: '+' },
    { number: 50, label: 'Awards Won', suffix: '+' },
    { number: 10, label: 'Years Experience', suffix: '+' }
  ];

  const horizontalTextItems = [
    'Digital Innovation', 'Creative Excellence', 'Strategic Growth',
    'Brand Transformation', 'Performance Marketing', 'Web Development',
    'SEO Optimization', 'Social Media', 'Content Creation', 'Digital PR'
  ];

  return (
    <div className="relative">
      {/* Hero Section with 3D */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A] pointer-events-none z-10" />
        
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <h1 className="hero-title text-7xl md:text-9xl font-bold mb-6">
            <span className="gradient-text inline-block">Second</span>
            <span className="text-white inline-block">Wave.</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Riding the digital wave to transform your brand into an unforgettable experience through innovation, creativity, and strategic excellence.
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/services"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-lg font-semibold overflow-hidden hover:shadow-[0_0_30px_rgba(153,69,255,0.5)] transition-shadow"
            >
              <span className="relative z-10">Explore Our Services</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-20" />
            </Link>
            
            <Link
              to="/works"
              className="group px-8 py-4 border border-white/20 rounded-full text-lg font-semibold hover:border-[#9945FF] transition-all flex items-center justify-center gap-2"
            >
              View Our Portfolio
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-[#9945FF] to-[#14F195] rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </section>

      {/* Horizontal Text Marquee - Using CSS Animation */}
{/* Horizontal Text — Scroll Driven */}
<div className="relative py-12 overflow-hidden ">

  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

  <div className="whitespace-nowrap">
    <div
      ref={waveRef}
      className="flex font-extrabold tracking-widest text-white/10 text-[18vw]"
    >
      <span className="mr-24">SECONDWAVE</span>
      <span className="mr-24">SECONDWAVE</span>
      <span className="mr-24">SECONDWAVE</span>
    </div>
  </div>

</div>



      {/* Text Reveal Section */}
      <section ref={textRef} className="section-padding">
        <div className="container-custom">
          <div className="reveal-text text-4xl md:text-6xl font-bold text-center max-w-4xl mx-auto">
            <div className="overflow-hidden mb-2">
              <span className="text-block inline-block gradient-text">We don't just market,</span>
            </div>
            <div className="overflow-hidden mb-2">
              <span className="text-block inline-block text-white">we create experiences that</span>
            </div>
            <div className="overflow-hidden mb-2">
              <span className="text-block inline-block gradient-text">inspire, engage,</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-block inline-block text-white">and transform.</span>
            </div>
          </div>
          <p className="text-xl text-gray-400 text-center mt-12 max-w-3xl mx-auto">
            With over a decade of experience in digital marketing, we've helped hundreds of brands 
            achieve extraordinary results through innovative strategies and creative excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="section-padding">
        <div className="container-custom">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your brand's unique needs, delivered with precision and creativity
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group relative p-6 glass-morphism rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-500 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`text-4xl mb-4 w-16 h-16 rounded-xl ${service.bgColor} flex items-center justify-center`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <p className={`text-sm mb-3 bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-medium`}>
                    {service.tagline}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                        {feature}
                      </span>
                    ))}
                    <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                      +{service.features.length - 2} more
                    </span>
                  </div>
                  
                  <div className="flex items-center text-[#9945FF] text-sm group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section ref={brandingRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="branding-content">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Branding</span> That Sticks
              </h2>
              <p className="text-xl text-gray-300 mb-4">Eye catchy</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Create unforgettable brand identities that captivate your audience and leave lasting impressions. 
                From logo design to comprehensive brand guidelines, we craft cohesive visual stories that resonate 
                deeply with your target market. Our branding process combines strategic thinking with creative 
                excellence to build brands that stand out in today's crowded digital landscape.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Brand Strategy</h4>
                  <p className="text-sm text-gray-400">Positioning & messaging</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Visual Identity</h4>
                  <p className="text-sm text-gray-400">Logos & guidelines</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Brand Voice</h4>
                  <p className="text-sm text-gray-400">Tone & personality</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Brand Experience</h4>
                  <p className="text-sm text-gray-400">Touchpoints & journey</p>
                </div>
              </div>
              <Link to="/branding" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>Discover our branding process</span>
                <FiArrowRight />
              </Link>
            </div>
            
            <div className="branding-image relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Branding"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section ref={seoRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/5 to-cyan-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="seo-image relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="SEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            
            <div className="seo-content order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">SEO</span> Excellence
              </h2>
              <p className="text-xl text-gray-300 mb-4">On top</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Dominate search engine rankings with our data-driven SEO strategies. We combine technical expertise 
                with creative content to help you reach the top and stay there. Our holistic approach ensures sustainable 
                growth in organic traffic, higher conversion rates, and maximum ROI from your digital presence.
              </p>
              
              <div className="seo-stats grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">#1</div>
                  <p className="text-sm text-gray-400">Rankings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">200%</div>
                  <p className="text-sm text-gray-400">Traffic Growth</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">5x</div>
                  <p className="text-sm text-gray-400">ROI</p>
                </div>
              </div>
              
              <Link to="/seo" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>Explore SEO strategies</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Web Development Section */}
      <section ref={webRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="web-content">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Web Development</span> That Converts
              </h2>
              <p className="text-xl text-gray-300 mb-4">Dynamic, User Friendly</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Build powerful, responsive websites that turn visitors into customers. Our modern tech stack ensures 
                lightning-fast performance, seamless user experience, and scalable solutions that grow with your business. 
                From custom web applications to e-commerce platforms, we create digital experiences that drive results.
              </p>
              
              <ul className="web-features space-y-3 mb-8">
                {['Custom Development with React/Node.js', 'E-commerce Solutions on Shopify/Magento', 'Responsive Mobile-First Design', 'CMS Integration (WordPress, Sanity)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/web-development" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>View our development work</span>
                <FiArrowRight />
              </Link>
            </div>
            
            <div className="web-image relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Web Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Marketing Section */}
      <section ref={performanceRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-orange-500/5 to-red-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="performance-image relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Performance Marketing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            
            <div className="performance-content order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Performance Marketing</span> That Delivers
              </h2>
              <p className="text-xl text-gray-300 mb-4">Meta, Google</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Data-driven advertising campaigns that deliver measurable results across Meta and Google platforms. 
                We combine advanced targeting with creative excellence to maximize your ROI and drive qualified traffic 
                that converts into loyal customers.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Retargeting', 'Analytics'].map((platform, i) => (
                  <span key={i} className="platform-tag px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
                    {platform}
                  </span>
                ))}
              </div>
              
              <Link to="/performance-marketing" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>Boost your campaigns</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Marketing Section */}
      <section ref={socialRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="social-content">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Social Media</span> Marketing
              </h2>
              <p className="text-xl text-gray-300 mb-4">Fun, Engagement, Awareness</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Build thriving communities and drive engagement through strategic social media marketing. We create 
                content that sparks conversations, builds brand loyalty, and turns followers into advocates. From 
                organic growth to paid campaigns, we help you dominate the social landscape.
              </p>
              
              <div className="social-platforms grid grid-cols-4 gap-4 mb-8">
                {['Instagram', 'TikTok', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'Pinterest', 'Snapchat'].map((platform, i) => (
                  <div key={i} className="text-center p-3 bg-white/5 rounded-xl">
                    <span className="text-sm font-medium">{platform}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/social-media-marketing" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>Grow your community</span>
                <FiArrowRight />
              </Link>
            </div>
            
            <div className="social-image relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Social Media"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Creative Section */}
      <section ref={creativeRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-yellow-500/5 to-amber-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="creative-image relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Creative"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            
            <div className="creative-content order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Creative</span> Excellence
              </h2>
              <p className="text-xl text-gray-300 mb-4">Strategy, growth</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Innovative creative solutions that drive brand growth and capture audience attention. From concept 
                development to final execution, we bring ideas to life with artistic excellence and strategic insight. 
                Our creative team combines design thinking with marketing expertise to deliver work that resonates.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Creative Direction</h4>
                  <p className="text-sm text-gray-400">Vision & concepts</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Content Creation</h4>
                  <p className="text-sm text-gray-400">Visual storytelling</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Campaign Strategy</h4>
                  <p className="text-sm text-gray-400">Integrated planning</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Brand Storytelling</h4>
                  <p className="text-sm text-gray-400">Narrative development</p>
                </div>
              </div>
              
              <Link to="/creative" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>Explore creative work</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Production Section */}
      <section ref={productionRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="production-content">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Production</span> Excellence
              </h2>
              <p className="text-xl text-gray-300 mb-4">Sound, Camera, Action</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Professional video and audio production services that bring your vision to life. From concept to 
                final cut, we deliver cinematic quality that captivates audiences and communicates your message 
                effectively. Our state-of-the-art equipment and experienced crew ensure exceptional results.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Video Production</h4>
                  <p className="text-sm text-gray-400">Commercials & brand films</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Sound Design</h4>
                  <p className="text-sm text-gray-400">Audio production & mixing</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Post-Production</h4>
                  <p className="text-sm text-gray-400">Editing & VFX</p>
                </div>
                <div className="p-4 glass-morphism rounded-xl">
                  <h4 className="font-bold mb-1">Photography</h4>
                  <p className="text-sm text-gray-400">Product & lifestyle</p>
                </div>
              </div>
              
              <Link to="/production" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>See our production work</span>
                <FiArrowRight />
              </Link>
            </div>
            
            <div className="production-image relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Production"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Digital PR Section */}
      <section ref={prRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-violet-500/5 to-purple-500/5" />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="pr-image relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Digital PR"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            
            <div className="pr-content order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Digital PR</span>
              </h2>
              <p className="text-xl text-gray-300 mb-4">We can get anyone</p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Strategic PR campaigns that build relationships with media, influencers, and your target audience. 
                We help you get featured in top publications, connect with key voices in your industry, and build 
                a reputation that sets you apart from competitors.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Forbes', 'TechCrunch', 'Vogue', 'WSJ', 'CNN', 'BBC', 'NYT', 'Bloomberg'].map((media, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
                    {media}
                  </span>
                ))}
              </div>
              
              <Link to="/digital-pr" className="inline-flex items-center gap-2 text-[#14F195] hover:gap-4 transition-all">
                <span>Get featured</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <section className="py-20 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-gray-400 mt-4">Join hundreds of brands that have partnered with us</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
          
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="mx-8 text-2xl font-bold text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="stat-number text-5xl md:text-6xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="section-padding">
        <div className="container-custom">
          <div className="cta-content relative p-12 md:p-20 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] opacity-90" />
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
                  backgroundRepeat: 'repeat'
                }}
              />
            </div>
            
            <div className="relative z-10 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Ride the Wave?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Let's create something amazing together and take your brand to new heights. 
                Our team of experts is ready to help you achieve your digital marketing goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0A0A0A] rounded-full font-semibold hover:gap-6 transition-all group"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  View Our Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;