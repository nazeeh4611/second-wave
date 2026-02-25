import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiCamera, FiTrendingUp, FiCode, FiHeart, FiStar, FiUsers,
  FiArrowRight, FiMonitor, FiFilm, FiZap, FiTarget
} from 'react-icons/fi';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const splineRef = useRef(null);

  const onSplineLoad = (spline) => {
    splineRef.current = spline;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.services-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.services-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      // Service cards animations
      gsap.fromTo('.service-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Process steps animations
      gsap.fromTo('.process-step',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation for icons
      gsap.utils.toArray('.service-icon').forEach((icon, i) => {
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

  const services = [
    {
      icon: <FiCamera />,
      title: 'Branding',
      tagline: 'Eye catchy',
      description: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions. From logo design to comprehensive brand guidelines.',
      features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Logo Design'],
      path: '/branding'
    },
    {
      icon: <FiTrendingUp />,
      title: 'SEO',
      tagline: 'On top',
      description: 'Dominate search engine rankings with our data-driven SEO strategies. Sustainable organic growth with higher conversions and maximum ROI.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
      path: '/seo'
    },
    {
      icon: <FiCode />,
      title: 'Web Dev',
      tagline: 'Dynamic, User Friendly',
      description: 'Build powerful, responsive websites that turn visitors into customers. Lightning-fast performance, seamless UX, and scalable solutions.',
      features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design'],
      path: '/web-development'
    },
    {
      icon: <FiMonitor />,
      title: 'Performance',
      tagline: 'Meta, Google',
      description: 'Data-driven advertising campaigns across Meta and Google. Advanced targeting with creative excellence to maximize ROI.',
      features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting'],
      path: '/performance-marketing'
    },
    {
      icon: <FiHeart />,
      title: 'Social Media',
      tagline: 'Fun, Engagement',
      description: 'Build thriving communities and drive engagement through strategic social media marketing. Content that sparks conversations.',
      features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics'],
      path: '/social-media-marketing'
    },
    {
      icon: <FiStar />,
      title: 'Creative',
      tagline: 'Strategy, growth',
      description: 'Innovative creative solutions that drive brand growth and capture audience attention. Design thinking meets marketing expertise.',
      features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Brand Storytelling'],
      path: '/creative'
    },
    {
      icon: <FiFilm />,
      title: 'Production',
      tagline: 'Sound, Camera, Action',
      description: 'Professional video and audio production that brings your vision to life. Cinematic quality that captivates and communicates powerfully.',
      features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production'],
      path: '/production'
    },
    {
      icon: <FiUsers />,
      title: 'Digital PR',
      tagline: 'We can get anyone',
      description: 'Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications.',
      features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation'],
      path: '/digital-pr'
    }
  ];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
  <Spline
        scene="https://prod.spline.design/EGGb-LCYchBVxVDG/scene.splinecode" 
        onLoad={onSplineLoad}
    className="w-full h-full pointer-events-auto"
  />
</div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            What We Do
            <FiZap className="text-gray-800" />
          </div>
          
          <h1 className="services-hero-title font-black text-gray-900 mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span className="inline-block">Our</span>{' '}
            <span className="inline-block text-gray-800">Services</span>
          </h1>
          
          <p className="services-hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to elevate your brand through innovation, creativity, and strategic excellence.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">EXPLORE</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="service-card group relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-100 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="service-icon text-3xl mb-4 w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-700 font-semibold mb-3">{service.tagline}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                        {feature}
                      </span>
                    ))}
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                      +{service.features.length - 2}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-800 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <span>Learn more</span>
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Process Section */}
      <section className="process-section py-20 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Our Approach
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              How We <span className="text-gray-800">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery', desc: '深入了解您的品牌、目标和受众，找出最佳解决方案' },
              { number: '02', title: 'Strategy', desc: '制定数据驱动的策略，确保每个决策都有依据' },
              { number: '03', title: 'Execution', desc: '创意执行与持续优化，确保项目完美落地' },
              { number: '04', title: 'Growth', desc: '持续增长与迭代，帮助品牌实现长期成功' }
            ].map((item, index) => (
              <div key={index} className="process-step text-center group">
                <div className="text-5xl font-black text-gray-200 mb-4 group-hover:text-gray-300 transition-colors">
                  {item.number}
                </div>
                <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
                <FiTarget />
                Let's Create Something Amazing
              </div>
              
              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Ready to Transform Your Brand?
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's create something amazing together and take your brand to new heights. Our team is ready to transform your digital presence.
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

export default Services;