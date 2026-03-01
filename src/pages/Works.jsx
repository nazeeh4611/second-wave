import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiFilter, FiX, FiArrowRight, FiTarget, FiEye } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import SilkWave from '../components/ParticlesWave';

gsap.registerPlugin(ScrollTrigger);

function Works() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      const heroTitle = document.querySelector('.works-hero-title span');
      const heroSubtitle = document.querySelector('.works-hero-subtitle');
      const gridItems = document.querySelectorAll('.work-grid-item');

      if (heroTitle) {
        gsap.fromTo('.works-hero-title span',
          { y: 120, opacity: 0, rotationX: -90 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
        );
      }

      if (heroSubtitle) {
        gsap.fromTo('.works-hero-subtitle',
          { y: 40, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
        );
      }

      if (gridItems.length > 0) {
        gsap.fromTo('.work-grid-item',
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.works-grid',
              start: 'top center+=100',
              end: 'bottom center',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      gsap.utils.toArray('.floating-element').forEach((el, i) => {
        gsap.to(el, {
          y: -10,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'branding', name: 'Branding' },
    { id: 'seo', name: 'SEO' },
    { id: 'web', name: 'Web Development' },
    { id: 'performance', name: 'Performance Marketing' },
    { id: 'social', name: 'Social Media' },
    { id: 'creative', name: 'Creative' },
    { id: 'production', name: 'Production' },
    { id: 'pr', name: 'Digital PR' }
  ];

  const works = [
    {
      id: 1,
      title: 'Luxury Brand Rebranding',
      category: 'branding',
      client: 'Elite Fashion House',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop',
      description: 'Complete brand overhaul including visual identity, brand guidelines, and marketing materials for a luxury fashion brand.',
      results: ['300% increase in brand awareness', '50% boost in social engagement', 'Featured in Vogue'],
      tags: ['Brand Strategy', 'Visual Identity', 'Luxury']
    },
    {
      id: 2,
      title: 'Tech Giant SEO Campaign',
      category: 'seo',
      client: 'InnovateTech',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1571658735999-04cc7d616a48?w=800&h=1000&fit=crop',
      description: 'Comprehensive SEO strategy that took a major tech company to #1 rankings for key industry terms.',
      results: ['Ranked #1 for 50+ keywords', '200% increase in organic traffic', '5x ROI'],
      tags: ['SEO', 'Organic Growth', 'Tech']
    },
    {
      id: 3,
      title: 'E-commerce Platform Development',
      category: 'web',
      client: 'ShopGlobal',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=1000&fit=crop',
      description: 'Custom e-commerce platform with advanced features and seamless user experience.',
      results: ['150% increase in sales', '40% faster load times', 'Mobile conversion up 80%'],
      tags: ['Web Dev', 'E-commerce', 'UX Design']
    },
    {
      id: 4,
      title: 'Viral Social Campaign',
      category: 'social',
      client: 'Beverage Brand',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=1000&fit=crop',
      description: 'Innovative social media campaign that generated millions of views and engagement.',
      results: ['10M+ views', '500K+ engagements', 'Trending on TikTok'],
      tags: ['Social Media', 'Viral', 'Content']
    },
    {
      id: 5,
      title: 'Corporate Video Production',
      category: 'production',
      client: 'Global Corp',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=1000&fit=crop',
      description: 'High-end corporate video production including brand film and commercial spots.',
      results: ['5M+ YouTube views', 'Featured in industry awards', '25% increase in brand recall'],
      tags: ['Video', 'Production', 'Corporate']
    },
    {
      id: 6,
      title: 'Influencer PR Campaign',
      category: 'pr',
      client: 'Beauty Brand',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop',
      description: 'Strategic influencer partnerships and media relations campaign.',
      results: ['100+ influencer partnerships', 'Featured in 20+ publications', '300% ROI'],
      tags: ['PR', 'Influencer', 'Media']
    }
  ];

  const filteredWorks = selectedCategory === 'all'
    ? works
    : works.filter(work => work.category === selectedCategory);

  const handleCardInteraction = (workId) => {
    setActiveCard(prev => prev === workId ? null : workId);
  };

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-white pt-20">
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SilkWave speed={0.0006} waveCount={6} opacity={0.75} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent z-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200 rounded-full blur-3xl opacity-20 z-1" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Our Portfolio
            <FiEye className="text-gray-800" />
          </div>

          <h1 className="works-hero-title font-black text-gray-900 mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span className="inline-block">Featured</span>{' '}
            <span className="inline-block text-gray-800">Work</span>
          </h1>

          <p className="works-hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed bg-white/30 backdrop-blur-sm p-4 rounded-2xl">
            Tap to explore our latest projects and success stories that have helped brands achieve remarkable growth.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">DISCOVER</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-xl mb-6"
          >
            <span className="font-medium text-gray-900">Filter by Category</span>
            <FiFilter className={`text-gray-600 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsFilterOpen(false);
                  }}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-full bg-gray-900 -z-10"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={gridRef} className="works-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => {
                const isActive = activeCard === work.id;

                return (
                  <motion.div
                    key={work.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="work-grid-item group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-white border border-gray-200 hover:border-gray-800 transition-all duration-300 hover:shadow-lg"
                    onClick={() => {
                      const isMobile = window.innerWidth < 1024;
                      if (isMobile) {
                        if (isActive) {
                          setSelectedWork(work);
                        } else {
                          handleCardInteraction(work.id);
                        }
                      } else {
                        setSelectedWork(work);
                      }
                    }}
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ transform: isActive ? 'scale(1.1)' : undefined }}
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <p className="text-gray-300 text-sm mb-2">{work.client}</p>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{work.title}</h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{work.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {work.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-white gap-2">
                          <span className="text-sm font-medium">
                            {isActive ? 'Tap again to view' : 'View Case Study'}
                          </span>
                          <FiArrowRight className={`transition-transform ${isActive ? 'translate-x-1' : 'group-hover:translate-x-2'}`} />
                        </div>
                      </div>
                    </div>

                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center lg:hidden">
                        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                          <FiEye className="text-gray-800 text-lg" />
                        </div>
                      </div>
                    )}

                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                        {work.year}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                        {categories.find(c => c.id === work.category)?.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Our Impact
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              Results That <span className="text-gray-800">Speak</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '150+', title: 'Projects Completed', desc: 'Successful campaigns delivered' },
              { number: '98%', title: 'Client Satisfaction', desc: 'Happy clients worldwide' },
              { number: '500M+', title: 'Impressions', desc: 'Generated for our clients' },
              { number: '50+', title: 'Awards Won', desc: 'Industry recognition' }
            ].map((item, index) => (
              <div key={index} className="process-step text-center group">
                <div className="text-5xl font-black text-gray-300 mb-4 group-hover:text-gray-400 transition-colors">
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
                Ready to Start Your Project?
              </div>

              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Let's Create Your Success Story
              </h2>

              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Ready to achieve remarkable results for your brand? Let's work together to create something amazing.
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
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all text-white"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-white/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-4xl w-full my-8 rounded-2xl bg-white border border-gray-200 shadow-xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
              >
                <FiX />
              </button>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-auto rounded-xl"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-gray-500 text-sm mb-2">{selectedWork.client}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{selectedWork.title}</h2>
                  <p className="text-gray-600 mb-6">{selectedWork.description}</p>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Key Results</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedWork.results.map((result, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                        {result}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <a
                      href="#"
                      className="flex-1 text-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all"
                    >
                      View Live Project
                    </a>
                    <a
                      href="#"
                      className="flex-1 text-center px-6 py-3 border border-gray-200 rounded-full font-medium hover:border-gray-900 transition-colors text-gray-900"
                    >
                      Case Study
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Works;