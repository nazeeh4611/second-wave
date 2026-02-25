import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiUsers,
  FiGlobe,
  FiAward,
  FiMessageSquare,
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function DigitalPR() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.pr-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.pr-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      // Feature cards animations
      gsap.fromTo('.pr-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.pr-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Media badges animation
      gsap.fromTo('.media-badge',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.media-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation
      gsap.utils.toArray('.pr-icon').forEach((icon, i) => {
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
    { icon: <FiUsers />, title: 'Influencer Relations', desc: 'Connect with key voices and thought leaders who can amplify your message' },
    { icon: <FiGlobe />, title: 'Media Outreach', desc: 'Get featured in top publications through strategic relationship building' },
    { icon: <FiAward />, title: 'Brand Reputation', desc: 'Build and protect your brand image through proactive communication' },
    { icon: <FiMessageSquare />, title: 'Crisis Management', desc: 'Navigate challenges with strategic communication and reputation management' }
  ];

  const mediaOutlets = ['Forbes', 'TechCrunch', 'Vogue', 'WSJ', 'CNN', 'BBC', 'NYT', 'Bloomberg', 'Reuters', 'AP', 'BuzzFeed', 'Mashable'];

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Digital PR
            <FiZap className="text-gray-800" />
          </div>
          
          <h1 className="pr-hero-title font-black text-gray-900 mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span className="inline-block">Digital</span>{' '}
            <span className="inline-block text-gray-800">PR</span>
          </h1>
          
          <p className="pr-hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Strategic PR campaigns that build relationships with media, influencers, and your target audience. Get featured in top publications worldwide.
          </p>
          
          <p className="text-sm text-gray-500 mt-4 font-medium">We can get anyone · Media relations · Brand reputation</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">CONNECT</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              What We Offer
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              PR <span className="text-gray-800">Services</span>
            </h2>
          </div>

          <div className="pr-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="pr-card group relative p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-100 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="pr-icon text-3xl mb-4 w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                  
                  <div className="mt-4 w-8 h-0.5 bg-gray-300 group-hover:w-12 group-hover:bg-gray-800 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Features */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Media Coverage
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              Featured in Top <span className="text-gray-800">Publications</span>
            </h2>
          </div>

          <div className="media-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {mediaOutlets.map((media, index) => (
              <div
                key={index}
                className="media-badge text-center p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-800 transition-all duration-300"
              >
                <span className="font-medium text-gray-800">{media}</span>
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
                <FiTrendingUp />
                Ready to Make Headlines?
              </div>
              
              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Get Your Brand in the Spotlight
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's build relationships with media and influencers to share your story with the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Get Featured</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all text-white"
                >
                  View Success Stories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DigitalPR;