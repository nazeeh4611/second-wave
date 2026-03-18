import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import baseurl from '../services/base';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';
const API_URL = baseurl;

const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'branding', name: 'Branding' },
  { id: 'seo', name: 'SEO' },
  { id: 'web', name: 'Web Dev' },
  { id: 'performance', name: 'Performance' },
  { id: 'social', name: 'Social Media' },
  { id: 'creative', name: 'Creative' },
  { id: 'production', name: 'Production' },
  { id: 'pr', name: 'Digital PR' },
];

export default function Works() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCard, setActiveCard] = useState(null);
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { fetchWorks(); }, [selectedCategory]);

  useEffect(() => {
    if (loading) return;
    ScrollTrigger.getAll().forEach(t => t.kill());
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-word', { y: '108%' }, { y: '0%', duration: 1.1, stagger: 0.08, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.hero-sub', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: 'power3.out' });
      gsap.fromTo('.work-card', { scale: 0.93, opacity: 0, y: 35 }, { scale: 1, opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.works-grid', start: 'top 85%' } });
    }, pageRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [works, loading]);

  const fetchWorks = async () => {
    setLoading(true);
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const res = await axios.get(`${API_URL}/works`, { params });
      setWorks(res.data.works || []);
    } catch { toast.error('Failed to fetch works'); }
    finally { setLoading(false); }
  };

  const goToWork = (slug) => navigate(`/works/${slug}`);

  if (loading) return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: `${ACCENT}30`, borderTopColor: ACCENT }} />
    </div>
  );

  return (
    <div ref={pageRef} className="bg-[#0a0a0a] overflow-x-hidden">

      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0a0a0a]" />
        <div className="relative z-10 text-center px-4 pt-24">
          <span className="inline-block text-[10px] tracking-[0.45em] uppercase font-bold mb-5 px-4 py-1.5 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30` }}>Our Portfolio</span>
          <div className="overflow-hidden mb-5">
            <h1 className="font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
              {'Our Work'.split(' ').map((w, i) => (
                <span key={i} className="hero-word inline-block mr-[0.18em] last:mr-0">{w}</span>
              ))}
            </h1>
          </div>
          <p className="hero-sub text-white/40 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Explore our latest projects and success stories that have helped brands achieve remarkable growth.
          </p>
        </div>
      </section>

      <section className="bg-white py-8 px-4 sm:px-6 md:px-8 sticky top-[56px] z-40 border-b border-black/8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className="px-4 sm:px-5 py-2 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-200"
                style={{
                  background: selectedCategory === cat.id ? ACCENT : 'transparent',
                  color: selectedCategory === cat.id ? 'white' : 'rgba(0,0,0,0.4)',
                  border: selectedCategory === cat.id ? 'none' : '1px solid rgba(0,0,0,0.12)',
                }}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-12 sm:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="works-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {works.map((work) => {
                const isActive = activeCard === work._id;
                const catName = categories.find(c => c.id === work.category)?.name || work.category;
                return (
                  <motion.div key={work._id} layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ duration: 0.45 }}
                    className="work-card group relative rounded-2xl overflow-hidden cursor-pointer border border-white/8 hover:border-white/20 transition-all duration-300"
                    style={{ aspectRatio: '4/5', background: '#111' }}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        isActive ? goToWork(work.slug) : setActiveCard(work._id);
                      } else {
                        goToWork(work.slug);
                      }
                    }}
                  >
                    <img src={work.featuredImage?.url || 'https://via.placeholder.com/800x1000'} alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />

                    <div className={`absolute inset-0 transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)' }}>
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <p className="text-white/45 text-xs mb-1">{work.client}</p>
                        <h3 className="text-white font-black text-base sm:text-lg mb-3 leading-tight">{work.title}</h3>
                        <p className="text-white/40 text-xs mb-4 line-clamp-2 leading-relaxed">{work.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {work.tags?.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[9px] px-2.5 py-1 rounded-full border border-white/15 text-white/50">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-white text-xs font-black tracking-widest uppercase" style={{ color: ACCENT }}>
                          <span>{isActive ? 'Tap again to view' : 'View Case Study'}</span>
                          <FiArrowRight className={isActive ? 'translate-x-1' : 'group-hover:translate-x-1 transition-transform'} size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 flex gap-2">
                      {work.year && <span className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white/70 border border-white/15 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>{work.year}</span>}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-black text-white tracking-widest uppercase" style={{ background: ACCENT }}>{catName}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {works.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/25 text-sm tracking-widest uppercase">No works found in this category</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.4em] text-black/30 uppercase font-bold mb-2 block">Our Impact</span>
            <h2 className="font-black text-black uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>Results That Speak</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: '720+', label: 'Projects Completed' },
              { num: '98%', label: 'Client Satisfaction' },
              { num: '500M+', label: 'Impressions Generated' },
              { num: '9+', label: 'Years Experience' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6 sm:p-8 border border-black/8 text-center group hover:border-black/20 transition-all">
                <div className="font-black text-black leading-none mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>{item.num}</div>
                <div className="w-6 h-0.5 mx-auto mb-3 transition-all duration-300 group-hover:w-10" style={{ background: ACCENT }} />
                <p className="text-black/40 text-[10px] sm:text-xs tracking-widest uppercase font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border border-white/8 p-10 sm:p-14 text-center" style={{ background: '#0f0f0f' }}>
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block" style={{ color: ACCENT }}>Let's Collaborate</span>
            <h2 className="font-black text-white uppercase leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
              Ready to Build<br />Your Success Story?
            </h2>
            <p className="text-white/30 text-sm sm:text-base leading-relaxed max-w-sm mx-auto mb-8">
              Let's create something amazing together and take your brand to new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-2.5 text-white font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105 group" style={{ background: ACCENT }}>
                Start Your Project <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/services" className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/55 font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase hover:border-white/30 hover:text-white transition-all">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}