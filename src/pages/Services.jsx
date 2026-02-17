import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiCamera, FiTrendingUp, FiCode, FiHeart, FiStar, FiUsers,
  FiArrowRight, FiMonitor, FiSearch, FiGlobe, FiShare2, FiFilm
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-detail-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
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

  const services = [
    {
      icon: <FiCamera />,
      title: 'Branding',
      tagline: 'Eye catchy',
      description: 'Create a memorable brand identity that stands out in the digital landscape. From logo design to brand guidelines, we craft cohesive brand experiences.',
      features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Logo Design'],
      path: '/branding',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FiTrendingUp />,
      title: 'SEO',
      tagline: 'On top',
      description: 'Dominate search engine rankings with our data-driven SEO strategies. We help you reach the top and stay there.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
      path: '/seo',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FiCode />,
      title: 'Website Development',
      tagline: 'Dynamic, User Friendly',
      description: 'Build powerful, responsive websites that convert visitors into customers. Modern tech stack for optimal performance.',
      features: ['Custom Development', 'E-commerce', 'CMS Integration', 'Responsive Design'],
      path: '/web-development',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FiMonitor />,
      title: 'Performance Marketing',
      tagline: 'Meta, Google',
      description: 'Data-driven advertising campaigns that deliver measurable results across Meta and Google platforms.',
      features: ['Paid Search', 'Social Ads', 'Display Advertising', 'Retargeting'],
      path: '/performance-marketing',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FiHeart />,
      title: 'Social Media Marketing',
      tagline: 'Fun, Engagement, Awareness',
      description: 'Build thriving communities and drive engagement through strategic social media marketing.',
      features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Analytics'],
      path: '/social-media-marketing',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <FiStar />,
      title: 'Creative',
      tagline: 'Strategy, growth',
      description: 'Innovative creative solutions that drive brand growth and capture audience attention.',
      features: ['Creative Direction', 'Content Creation', 'Campaign Strategy', 'Brand Storytelling'],
      path: '/creative',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <FiFilm />,
      title: 'Production',
      tagline: 'Sound, Camera, Action',
      description: 'Professional video and audio production services that bring your vision to life.',
      features: ['Video Production', 'Sound Design', 'Photography', 'Post-Production'],
      path: '/production',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <FiUsers />,
      title: 'Digital PR',
      tagline: 'We can get anyone',
      description: 'Strategic PR campaigns that build relationships with media, influencers, and your target audience.',
      features: ['Media Relations', 'Influencer Outreach', 'Crisis Management', 'Brand Reputation'],
      path: '/digital-pr',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div ref={pageRef} className="pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to elevate your brand and drive growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.path}
              className="service-detail-card group relative p-8 glass-morphism rounded-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`text-5xl bg-gradient-to-r ${service.color} w-20 h-20 rounded-2xl flex items-center justify-center`}>
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">Service 0{index + 1}</span>
                    <p className="text-[#14F195] text-lg font-medium">{service.tagline}</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-[#9945FF] group-hover:gap-4 transition-all">
                  <span className="font-medium">Learn More</span>
                  <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our <span className="gradient-text">Process</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: '深入了解您的品牌和目标' },
              { step: '02', title: 'Strategy', desc: '制定数据驱动的策略' },
              { step: '03', title: 'Execution', desc: '创意执行与优化' },
              { step: '04', title: 'Growth', desc: '持续增长与迭代' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Brand?
          </h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 gradient-bg rounded-full font-semibold hover-glow group"
          >
            <span>Start Your Journey</span>
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;