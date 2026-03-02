import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiFilter, FiX, FiArrowRight, FiTarget, FiEye } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import baseurl from '../services/base';

gsap.registerPlugin(ScrollTrigger);

const API_URL = baseurl;

function Works() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const pageRef = useRef(null);
  const heroRef = useRef(null);

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

  useEffect(() => {
    fetchWorks();
  }, [selectedCategory]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      gsap.fromTo('.works-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.works-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      if (works.length > 0) {
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
    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [works]);

  const fetchWorks = async () => {
    setLoading(true);
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await axios.get(`${API_URL}/works`, { params });
      setWorks(response.data.works || []);
    } catch (error) {
      toast.error('Failed to fetch works');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardInteraction = (workId) => {
    setActiveCard(prev => prev === workId ? null : workId);
  };

  const openWorkDetail = async (work) => {
    try {
      const response = await axios.get(`${API_URL}/works/${work.slug}`);
      setSelectedWork(response.data);
    } catch (error) {
      toast.error('Failed to load work details');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading works...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative overflow-x-hidden bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent z-1" />
        
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
            Explore our latest projects and success stories that have helped brands achieve remarkable growth.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="works-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {works.map((work) => {
                const isActive = activeCard === work._id;

                return (
                  <motion.div
                    key={work._id}
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
                          openWorkDetail(work);
                        } else {
                          handleCardInteraction(work._id);
                        }
                      } else {
                        openWorkDetail(work);
                      }
                    }}
                  >
                    <img
                      src={work.featuredImage?.url || 'https://via.placeholder.com/800x1000'}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                          {work.tags?.map((tag, idx) => (
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

                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                        {work.year}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                        {categories.find(c => c.id === work.category)?.name || work.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {works.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No works found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            
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
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>Start Your Project</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all text-white"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Detail Modal */}
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
                    src={selectedWork.featuredImage?.url}
                    alt={selectedWork.title}
                    className="w-full h-auto rounded-xl"
                  />
                  
                  {selectedWork.instagramReel && (
                    <div className="mt-4">
                      <a
                        href={selectedWork.instagramReel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                      >
                        View on Instagram
                        <FiArrowRight />
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-gray-500 text-sm mb-2">{selectedWork.client}</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{selectedWork.title}</h2>
                  <p className="text-gray-600 mb-6">{selectedWork.description}</p>

                  {selectedWork.results && selectedWork.results.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Key Results</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedWork.results.map((result, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedWork.tags?.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
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