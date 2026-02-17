import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiFilter, FiX, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

function Works() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    gsap.fromTo('.work-grid-item',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.works-grid',
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      }
    );
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
      image: 'https://picsum.photos/800/1000?random=1',
      description: 'Complete brand overhaul including visual identity, brand guidelines, and marketing materials for a luxury fashion brand.',
      results: ['300% increase in brand awareness', '50% boost in social engagement', 'Featured in Vogue']
    },
    {
      id: 2,
      title: 'Tech Giant SEO Campaign',
      category: 'seo',
      client: 'InnovateTech',
      year: '2024',
      image: 'https://picsum.photos/800/1000?random=2',
      description: 'Comprehensive SEO strategy that took a major tech company to #1 rankings for key industry terms.',
      results: ['Ranked #1 for 50+ keywords', '200% increase in organic traffic', '5x ROI']
    },
    {
      id: 3,
      title: 'E-commerce Platform Development',
      category: 'web',
      client: 'ShopGlobal',
      year: '2023',
      image: 'https://picsum.photos/800/1000?random=3',
      description: 'Custom e-commerce platform with advanced features and seamless user experience.',
      results: ['150% increase in sales', '40% faster load times', 'Mobile conversion up 80%']
    },
    {
      id: 4,
      title: 'Viral Social Campaign',
      category: 'social',
      client: 'Beverage Brand',
      year: '2024',
      image: 'https://picsum.photos/800/1000?random=4',
      description: 'Innovative social media campaign that generated millions of views and engagement.',
      results: ['10M+ views', '500K+ engagements', 'Trending on TikTok']
    },
    {
      id: 5,
      title: 'Corporate Video Production',
      category: 'production',
      client: 'Global Corp',
      year: '2023',
      image: 'https://picsum.photos/800/1000?random=5',
      description: 'High-end corporate video production including brand film and commercial spots.',
      results: ['5M+ YouTube views', 'Featured in industry awards', '25% increase in brand recall']
    },
    {
      id: 6,
      title: 'Influencer PR Campaign',
      category: 'pr',
      client: 'Beauty Brand',
      year: '2024',
      image: 'https://picsum.photos/800/1000?random=6',
      description: 'Strategic influencer partnerships and media relations campaign.',
      results: ['100+ influencer partnerships', 'Featured in 20+ publications', '300% ROI']
    }
  ];

  const filteredWorks = selectedCategory === 'all' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Our <span className="gradient-text">Work</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tap to visit and explore our latest projects and success stories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'gradient-bg text-white'
                  : 'glass-morphism text-gray-400 hover:text-white'
              }`}
            >
              {category.name}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full gradient-bg -z-10"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="works-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="work-grid-item group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[#14F195] text-sm mb-2">{work.client}</p>
                    <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{work.description}</p>
                    <div className="flex items-center text-white gap-2 group-hover:gap-4 transition-all">
                      <span className="text-sm font-medium">View Case Study</span>
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                    {work.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Work Modal */}
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedWork(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl glass-morphism p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-4 right-4 text-2xl text-white/50 hover:text-white transition-colors"
                >
                  <FiX />
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedWork.image}
                      alt={selectedWork.title}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <p className="text-[#14F195] text-sm mb-2">{selectedWork.client}</p>
                    <h2 className="text-3xl font-bold mb-4">{selectedWork.title}</h2>
                    <p className="text-gray-300 mb-6">{selectedWork.description}</p>
                    
                    <h3 className="text-xl font-bold mb-3">Key Results</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedWork.results.map((result, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                          {result}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="flex-1 text-center px-6 py-3 gradient-bg rounded-full font-medium hover-glow"
                      >
                        View Live Project
                      </a>
                      <a
                        href="#"
                        className="px-6 py-3 border border-white/20 rounded-full font-medium hover:border-[#9945FF] transition-colors"
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
    </div>
  );
}

export default Works;