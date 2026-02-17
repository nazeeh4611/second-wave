import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiHeart, FiUsers, FiMessageCircle, FiShare2 } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function SocialMediaMarketing() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.social-section',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top center+=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Social Media Marketing</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Fun, Engagement, Awareness</p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Build thriving communities and drive engagement through strategic social media
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FiHeart />, title: 'Content Strategy', desc: 'Engaging content that resonates' },
            { icon: <FiUsers />, title: 'Community Management', desc: 'Build and nurture communities' },
            { icon: <FiMessageCircle />, title: 'Influencer Marketing', desc: 'Partner with key voices' },
            { icon: <FiShare2 />, title: 'Viral Campaigns', desc: 'Create shareable moments' }
          ].map((item, index) => (
            <div key={index} className="social-section glass-morphism p-6 rounded-2xl text-center">
              <div className="text-4xl text-[#9945FF] mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="social-section glass-morphism p-12 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Platforms We Excel At</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Instagram', 'TikTok', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'Pinterest', 'Snapchat'].map((platform, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-xl">
                <span className="font-semibold">{platform}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="social-section text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Grow Your Community?</h3>
          <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 gradient-bg rounded-full font-semibold hover-glow group">
            <span>Start Engaging</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaMarketing;