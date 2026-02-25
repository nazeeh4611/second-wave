import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiHeart, FiUsers, FiMessageCircle, FiShare2, FiZap } from 'react-icons/fi';

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
    <div ref={pageRef} className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Social Media
            <FiZap className="text-gray-800" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">Social Media Marketing</h1>
          <p className="text-2xl text-gray-700 mb-4 font-medium">Fun, Engagement, Awareness</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            <div key={index} className="social-section p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-800 transition-all text-center group">
              <div className="text-4xl text-gray-800 mb-4 w-16 h-16 mx-auto bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="social-section p-12 bg-gray-50 border border-gray-200 rounded-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">Platforms We Excel At</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Instagram', 'TikTok', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'Pinterest', 'Snapchat'].map((platform, index) => (
              <div key={index} className="text-center p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-800 transition-all">
                <span className="font-medium text-gray-800">{platform}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="social-section text-center">
          <h3 className="text-3xl font-black text-gray-900 mb-6">Ready to Grow Your Community?</h3>
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all group">
            <span>Start Engaging</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SocialMediaMarketing;