import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiClock, FiTag, FiLayers, FiInstagram, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import baseurl from '../services/base';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';
const API_URL = baseurl;

const categories = [
  { id: 'all', name: 'All Work' }, { id: 'branding', name: 'Branding' }, { id: 'seo', name: 'SEO' },
  { id: 'web', name: 'Web Development' }, { id: 'performance', name: 'Performance Marketing' },
  { id: 'social', name: 'Social Media' }, { id: 'creative', name: 'Creative' },
  { id: 'production', name: 'Production' }, { id: 'pr', name: 'Digital PR' },
];

function getCategoryName(id) { return categories.find(c => c.id === id)?.name || id; }

function InstagramEmbed({ instagramReel }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!instagramReel?.url) return;
    if (window.instgrm) { window.instgrm.Embeds.process(); return; }
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => { if (window.instgrm) window.instgrm.Embeds.process(); };
    document.body.appendChild(script);
  }, [instagramReel?.url]);

  if (!instagramReel?.url) return null;
  const postUrl = instagramReel.url.endsWith('/') ? instagramReel.url : `${instagramReel.url}/`;
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <FiInstagram size={14} style={{ color: ACCENT }} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">{instagramReel.type === 'reel' ? 'Instagram Reel' : 'Instagram Post'}</h3>
      </div>
      <div ref={containerRef}>
        <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink={postUrl} data-instgrm-version="14"
          style={{ background: '#fff', border: 0, borderRadius: 12, boxShadow: '0 0 1px rgba(0,0,0,0.5)', margin: '0 auto', maxWidth: 540, minWidth: 280, padding: 0, width: '100%' }}>
          <div style={{ padding: 16 }}>
            <a href={postUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              {instagramReel.thumbnail?.url
                ? <img src={instagramReel.thumbnail.url} alt="Instagram preview" className="w-full rounded-lg" />
                : <div className="w-full h-40 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}15` }}><FiInstagram size={36} style={{ color: ACCENT, opacity: 0.5 }} /></div>
              }
            </a>
          </div>
        </blockquote>
      </div>
      <a href={postUrl} target="_blank" rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
        style={{ background: ACCENT }}>
        <FiInstagram size={14} /> View on Instagram <FiExternalLink size={12} />
      </a>
    </div>
  );
}

export default function WorkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [relatedWorks, setRelatedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgOrientation, setImgOrientation] = useState('landscape');
  const pageRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); fetchWork(); }, [slug]);

  useEffect(() => {
    if (!work?.featuredImage?.url) return;
    const img = new Image();
    img.onload = () => setImgOrientation(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape');
    img.src = work.featuredImage.url;
  }, [work?.featuredImage?.url]);

  useEffect(() => {
    if (!work) return;
    ScrollTrigger.getAll().forEach(t => t.kill());
    const ctx = gsap.context(() => {
      gsap.fromTo('.detail-label', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.detail-title', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.detail-meta', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, delay: 0.4, ease: 'power3.out' });
      gsap.fromTo('.detail-hero-img', { scale: 1.04, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.detail-body', { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.detail-body', start: 'top 86%' } });
      gsap.fromTo('.detail-sidebar', { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.detail-sidebar', start: 'top 86%' } });
      gsap.fromTo('.gallery-item', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.detail-gallery', start: 'top 86%' } });
      gsap.fromTo('.result-item', { x: -25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.detail-results', start: 'top 86%' } });
      gsap.fromTo('.casestudy-block', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.detail-casestudy', start: 'top 86%' } });
    }, pageRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [work]);

  const fetchWork = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/works/slug/${slug}`);
      setWork(res.data);
      if (res.data.category) fetchRelated(res.data.category, res.data._id);
    } catch { toast.error('Failed to load work'); navigate('/works'); }
    finally { setLoading(false); }
  };

  const fetchRelated = async (category, currentId) => {
    try {
      const res = await axios.get(`${API_URL}/works`, { params: { category } });
      setRelatedWorks((res.data.works || []).filter(w => w._id !== currentId).slice(0, 2));
    } catch {}
  };

  if (loading) return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: `${ACCENT}30`, borderTopColor: ACCENT }} />
    </div>
  );
  if (!work) return null;

  const isPortrait = imgOrientation === 'portrait';
  const hasCaseStudy = work?.caseStudy && (work.caseStudy.overview || work.caseStudy.challenge || work.caseStudy.solution || work.caseStudy.results);
  const hasTestimonial = work?.caseStudy?.testimonial?.quote;
  const hasGallery = work?.gallery?.length > 0;
  const hasInstagram = work?.instagramReel?.url;
  const hasLiveLink = work?.liveUrl;

  return (
    <div ref={pageRef} className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">

      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {work.featuredImage?.url && (
          <>
            <img src={work.featuredImage.url} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, #0a0a0a 100%)' }} />
          </>
        )}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-12">
          <button onClick={() => navigate('/works')} className="inline-flex items-center gap-2 text-white/35 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors group mb-10">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} /> Back to Works
          </button>

          <p className="detail-label text-[10px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: ACCENT }}>Case Study</p>
          <h1 className="detail-title font-black text-white leading-tight mb-8" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)' }}>{work.title}</h1>

          <div className="flex flex-wrap gap-8 sm:gap-12">
            {work.year && (
              <div className="detail-meta">
                <div className="flex items-center gap-1.5 text-white/25 text-[9px] font-bold uppercase tracking-widest mb-1.5"><FiClock size={10} /> Year</div>
                <p className="text-white font-black text-sm">{work.year}</p>
              </div>
            )}
            {work.client && (
              <div className="detail-meta">
                <div className="flex items-center gap-1.5 text-white/25 text-[9px] font-bold uppercase tracking-widest mb-1.5"><FiTag size={10} /> Client</div>
                <p className="text-white font-black text-sm">{work.client}</p>
              </div>
            )}
            {work.category && (
              <div className="detail-meta">
                <div className="flex items-center gap-1.5 text-white/25 text-[9px] font-bold uppercase tracking-widest mb-1.5"><FiLayers size={10} /> Service</div>
                <p className="text-white font-black text-sm">{getCategoryName(work.category)}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-10">
        <div className="detail-hero-img overflow-hidden rounded-2xl border border-white/8">
          {isPortrait ? (
            <img src={work.featuredImage?.url} alt={work.title} className="mx-auto block" style={{ maxHeight: '75vh', width: 'auto', maxWidth: '100%' }} />
          ) : (
            <img src={work.featuredImage?.url || 'https://via.placeholder.com/1200x675'} alt={work.title} className="w-full block" style={{ maxHeight: '65vh', objectFit: 'cover' }} />
          )}
        </div>
        {hasLiveLink && (
          <div className="mt-5">
            <a href={work.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-black rounded-full px-6 py-3 text-xs tracking-widest uppercase transition-all hover:opacity-90" style={{ background: ACCENT }}>
              <FiGlobe size={14} /> Visit Live Website <FiExternalLink size={12} />
            </a>
          </div>
        )}
      </section>

      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">

          <div className="detail-body space-y-10">
            <div>
              <div className="w-10 h-0.5 mb-5" style={{ background: ACCENT }} />
              <p className="text-black/65 text-base sm:text-lg leading-relaxed">{work.description}</p>
            </div>

            {work.results?.length > 0 && (
              <div className="detail-results">
                <h2 className="font-black text-black text-xl mb-5">Key Results</h2>
                <ul className="space-y-3">
                  {work.results.map((result, i) => (
                    <li key={i} className="result-item flex items-start gap-3 text-black/55 text-sm leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasCaseStudy && (
              <div className="detail-casestudy space-y-6">
                <div className="w-10 h-px bg-black/10" />
                <h2 className="font-black text-black text-xl">Case Study</h2>
                {['overview', 'challenge', 'solution', 'results'].map(key => work.caseStudy[key] && (
                  <div key={key} className="casestudy-block">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: ACCENT }}>{key}</h3>
                    <p className="text-black/55 text-sm leading-relaxed">{work.caseStudy[key]}</p>
                  </div>
                ))}
              </div>
            )}

            {hasTestimonial && (
              <div className="rounded-2xl p-7 border-l-4" style={{ borderColor: ACCENT, background: `${ACCENT}08` }}>
                <p className="text-black/70 text-base italic leading-relaxed mb-4">"{work.caseStudy.testimonial.quote}"</p>
                <p className="font-black text-black text-sm">{work.caseStudy.testimonial.author}</p>
                {work.caseStudy.testimonial.position && <p className="text-black/40 text-xs mt-0.5">{work.caseStudy.testimonial.position}</p>}
              </div>
            )}

            {work.tags?.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-black/35 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full text-sm font-medium text-black/55 border border-black/10">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="detail-sidebar space-y-5">
            <div className="rounded-2xl border border-black/8 p-6 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-black/30">Project Info</h3>
              <div className="space-y-4">
                {[['Client', work.client], ['Year', work.year], ['Service', work.category && getCategoryName(work.category)]].map(([label, val]) => val && (
                  <div key={label}>
                    <p className="text-[9px] text-black/30 uppercase tracking-wider mb-0.5 font-bold">{label}</p>
                    <p className="text-black font-black text-sm">{val}</p>
                  </div>
                ))}
              </div>
              {hasLiveLink && (
                <a href={work.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}>
                  <FiGlobe size={14} /> Live Website <FiExternalLink size={12} />
                </a>
              )}
            </div>

            {hasInstagram && (
              <div className="rounded-2xl border border-black/8 p-6">
                <InstagramEmbed instagramReel={work.instagramReel} />
              </div>
            )}

            {work.tags?.length > 0 && (
              <div className="rounded-2xl border border-black/8 p-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-black/30 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 border border-black/8 text-black/50 rounded-lg font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {hasGallery && (
        <section className="bg-[#0a0a0a] py-14 px-4 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="w-8 h-0.5 mb-6" style={{ background: ACCENT }} />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 mb-8">Gallery</h2>
            <div className="detail-gallery columns-1 sm:columns-2 gap-4 space-y-4">
              {work.gallery.map((img, i) => (
                <div key={i} className="gallery-item break-inside-avoid overflow-hidden rounded-xl border border-white/8">
                  <img src={img.url} alt={img.caption || `${work.title} ${i + 1}`} className="w-full h-auto block" />
                  {img.caption && <p className="text-white/30 text-xs px-4 py-3">{img.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedWorks.length > 0 && (
        <section className="bg-[#0f0f0f] py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/22 mb-1 block">More Work</span>
                <h2 className="font-black text-white text-2xl">Related Projects</h2>
              </div>
              <Link to="/works" className="inline-flex items-center gap-2 text-white/35 text-xs font-black tracking-widest uppercase hover:text-white transition-colors group">
                All Works <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedWorks.map(rw => (
                <motion.div key={rw._id} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/8 hover:border-white/20 transition-all"
                  style={{ aspectRatio: '4/3' }}
                  onClick={() => navigate(`/works/${rw.slug}`)}>
                  <img src={rw.featuredImage?.url || 'https://via.placeholder.com/800x600'} alt={rw.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/35 text-xs mb-1">{rw.client}</p>
                    <h3 className="text-white font-black text-base">{rw.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT }}>
                      View Case Study <FiArrowRight size={11} />
                    </div>
                  </div>
                  {rw.year && <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold text-white/60 border border-white/15" style={{ background: 'rgba(0,0,0,0.5)' }}>{rw.year}</span>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0a0a0a] py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border border-white/8 p-10 sm:p-14 text-center" style={{ background: '#0f0f0f' }}>
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block" style={{ color: ACCENT }}>Let's Collaborate</span>
            <h2 className="font-black text-white uppercase leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Ready to Build<br />Something Like This?
            </h2>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mx-auto mb-8">
              Let's create your next success story together.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center gap-2.5 text-white font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105 group" style={{ background: ACCENT }}>
              Start Your Project <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}