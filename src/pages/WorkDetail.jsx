import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowLeft, FiArrowRight, FiExternalLink,
  FiClock, FiTag, FiLayers, FiInstagram, FiGlobe
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import baseurl from '../services/base';

gsap.registerPlugin(ScrollTrigger);

const API_URL = baseurl;

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

function getCategoryName(id) {
  return categories.find(c => c.id === id)?.name || id;
}

function SmartImage({ src, alt, className = '', style = {} }) {
  const [orientation, setOrientation] = useState('landscape');
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalHeight > img.naturalWidth) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };
    img.src = src;
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        objectFit: orientation === 'portrait' ? 'contain' : 'cover',
        backgroundColor: orientation === 'portrait' ? 'transparent' : undefined,
      }}
    />
  );
}

function InstagramEmbed({ instagramReel }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!instagramReel?.url) return;

    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    document.body.appendChild(script);
  }, [instagramReel?.url]);

  if (!instagramReel?.url) return null;

  const postUrl = instagramReel.url.endsWith('/') ? instagramReel.url : `${instagramReel.url}/`;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <FiInstagram size={16} className="text-gray-600" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          {instagramReel.type === 'reel' ? 'Instagram Reel' : 'Instagram Post'}
        </h3>
      </div>

      <div ref={containerRef} className="w-full">
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: '0',
            borderRadius: '12px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '0 auto',
            maxWidth: '540px',
            minWidth: '280px',
            padding: '0',
            width: '100%'
          }}
        >
          <div style={{ padding: '16px' }}>
            <a href={postUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              {instagramReel.thumbnail?.url ? (
                <img
                  src={instagramReel.thumbnail.url}
                  alt="Instagram preview"
                  className="w-full rounded-lg"
                  style={{ display: 'block' }}
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                  <FiInstagram size={36} className="text-pink-300" />
                </div>
              )}
            </a>
          </div>
        </blockquote>
      </div>

      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity group"
      >
        <FiInstagram size={15} />
        View on Instagram
        <FiExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
}

function WorkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [relatedWorks, setRelatedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgOrientation, setImgOrientation] = useState('landscape');
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWork();
  }, [slug]);

  useEffect(() => {
    if (!work?.featuredImage?.url) return;
    const img = new Image();
    img.onload = () => {
      setImgOrientation(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape');
    };
    img.src = work.featuredImage.url;
  }, [work?.featuredImage?.url]);

  useEffect(() => {
    if (!work) return;
    ScrollTrigger.getAll().forEach(t => t.kill());

    const ctx = gsap.context(() => {
      gsap.fromTo('.detail-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('.detail-title', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo('.detail-meta-item', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.45 });
      gsap.fromTo('.detail-hero-img', { scale: 1.04, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.detail-body', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.detail-body', start: 'top 85%' } });
      gsap.fromTo('.detail-sidebar', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: '.detail-sidebar', start: 'top 85%' } });
      gsap.fromTo('.detail-gallery-item', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.detail-gallery', start: 'top 85%' } });
      gsap.fromTo('.detail-result-item', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.detail-results', start: 'top 85%' } });
      gsap.fromTo('.detail-casestudy-block', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.detail-casestudy', start: 'top 85%' } });
    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [work]);

  const fetchWork = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/works/slug/${slug}`);
      setWork(response.data);
      if (response.data.category) fetchRelated(response.data.category, response.data._id);
    } catch (error) {
      toast.error('Failed to load work');
      navigate('/works');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (category, currentId) => {
    try {
      const response = await axios.get(`${API_URL}/works`, { params: { category } });
      const filtered = (response.data.works || []).filter(w => w._id !== currentId).slice(0, 2);
      setRelatedWorks(filtered);
    } catch {}
  };

  const hasInstagram = work?.instagramReel?.url;
  const hasCaseStudy = work?.caseStudy && (work.caseStudy.overview || work.caseStudy.challenge || work.caseStudy.solution || work.caseStudy.results);
  const hasTestimonial = work?.caseStudy?.testimonial?.quote;
  const hasGallery = work?.gallery && work.gallery.length > 0;
  const hasLiveLink = work?.liveUrl;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  if (!work) return null;

  const isPortrait = imgOrientation === 'portrait';

  return (
    <div ref={pageRef} className="bg-white min-h-screen pt-20">

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <button
          onClick={() => navigate('/works')}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Works
        </button>
      </div>

      <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
        <p className="detail-label text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">Case Study</p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <h1 className="detail-title font-black text-gray-900 leading-none" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}>
            {work.title}
          </h1>
          <div className="flex flex-wrap gap-6 lg:gap-10 flex-shrink-0">
            {work.year && (
              <div className="detail-meta-item">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium uppercase tracking-widest mb-1"><FiClock size={11} /> Year</div>
                <p className="text-gray-900 font-semibold text-sm">{work.year}</p>
              </div>
            )}
            {work.client && (
              <div className="detail-meta-item">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium uppercase tracking-widest mb-1"><FiTag size={11} /> Client</div>
                <p className="text-gray-900 font-semibold text-sm">{work.client}</p>
              </div>
            )}
            {work.category && (
              <div className="detail-meta-item">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium uppercase tracking-widest mb-1"><FiLayers size={11} /> Service</div>
                <p className="text-gray-900 font-semibold text-sm">{getCategoryName(work.category)}</p>
              </div>
            )}
          </div>
        </div>

        <div className="detail-hero-img flex justify-center overflow-hidden rounded-2xl">
          {isPortrait ? (
            <img
              src={work.featuredImage?.url}
              alt={work.title}
              style={{ maxHeight: '70vh', width: 'auto', maxWidth: '100%', display: 'block' }}
            />
          ) : (
            <img
              src={work.featuredImage?.url || 'https://via.placeholder.com/1200x675'}
              alt={work.title}
              className="w-full block"
              style={{ maxHeight: '70vh', objectFit: 'cover' }}
            />
          )}
        </div>

        {hasLiveLink && (
          <div className="mt-5">
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors group"
            >
              <FiGlobe size={15} />
              Visit Live Website
              <FiExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}
      </section>

      <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">

          <div className="detail-body space-y-10">
            <div>
              <div className="w-10 h-0.5 bg-gray-900 mb-6" />
              <p className="text-gray-700 text-lg leading-relaxed">{work.description}</p>
            </div>

            {work.results && work.results.length > 0 && (
              <div className="detail-results">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Key Results</h2>
                <ul className="space-y-3">
                  {work.results.map((result, index) => (
                    <li key={index} className="detail-result-item flex items-start gap-3 text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasCaseStudy && (
              <div className="detail-casestudy space-y-6">
                <div className="w-10 h-0.5 bg-gray-200" />
                <h2 className="text-xl font-bold text-gray-900">Case Study</h2>
                {work.caseStudy.overview && (
                  <div className="detail-casestudy-block">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Overview</h3>
                    <p className="text-gray-700 leading-relaxed">{work.caseStudy.overview}</p>
                  </div>
                )}
                {work.caseStudy.challenge && (
                  <div className="detail-casestudy-block">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">{work.caseStudy.challenge}</p>
                  </div>
                )}
                {work.caseStudy.solution && (
                  <div className="detail-casestudy-block">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Solution</h3>
                    <p className="text-gray-700 leading-relaxed">{work.caseStudy.solution}</p>
                  </div>
                )}
                {work.caseStudy.results && (
                  <div className="detail-casestudy-block">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Results</h3>
                    <p className="text-gray-700 leading-relaxed">{work.caseStudy.results}</p>
                  </div>
                )}
              </div>
            )}

            {hasTestimonial && (
              <div className="border-l-4 border-gray-900 pl-6 py-2">
                <p className="text-gray-700 text-lg italic leading-relaxed mb-3">"{work.caseStudy.testimonial.quote}"</p>
                <p className="text-sm font-bold text-gray-900">{work.caseStudy.testimonial.author}</p>
                {work.caseStudy.testimonial.position && (
                  <p className="text-xs text-gray-500">{work.caseStudy.testimonial.position}</p>
                )}
              </div>
            )}

            {work.tags && work.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, index) => (
                    <span key={index} className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="detail-sidebar space-y-6">
            <div className="border border-gray-200 rounded-2xl p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">Project Info</h3>
              <div className="space-y-4">
                {work.client && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Client</p>
                    <p className="text-gray-900 font-semibold">{work.client}</p>
                  </div>
                )}
                {work.year && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Year</p>
                    <p className="text-gray-900 font-semibold">{work.year}</p>
                  </div>
                )}
                {work.category && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Service</p>
                    <p className="text-gray-900 font-semibold">{getCategoryName(work.category)}</p>
                  </div>
                )}
              </div>

              {hasLiveLink && (
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors group"
                >
                  <FiGlobe size={14} />
                  Visit Live Website
                  <FiExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

            {hasInstagram && (
              <div className="border border-gray-200 rounded-2xl p-6">
                <InstagramEmbed instagramReel={work.instagramReel} />
              </div>
            )}

            {work.tags && work.tags.length > 0 && (
              <div className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {hasGallery && (
        <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="w-10 h-0.5 bg-gray-200 mb-8" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Gallery</h2>
          <div className="detail-gallery columns-1 md:columns-2 gap-5 space-y-5">
            {work.gallery.map((img, index) => (
              <div key={index} className="detail-gallery-item break-inside-avoid overflow-hidden rounded-xl">
                <img
                  src={img.url}
                  alt={img.caption || `${work.title} gallery ${index + 1}`}
                  className="w-full h-auto block"
                />
                {img.caption && (
                  <p className="text-xs text-gray-500 px-3 pb-3 pt-2">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedWorks.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">More Work</p>
                <h2 className="text-2xl font-black text-gray-900">Related Projects</h2>
              </div>
              <Link to="/works" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                All Works
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedWorks.map((rw) => (
                <motion.div
                  key={rw._id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100"
                  onClick={() => navigate(`/works/${rw.slug}`)}
                >
                  <img
                    src={rw.featuredImage?.url || 'https://via.placeholder.com/800x600'}
                    alt={rw.title}
                    className="w-full h-auto block"
                    style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-gray-300 text-xs mb-1">{rw.client}</p>
                      <h3 className="text-white font-bold text-lg">{rw.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-white text-sm">
                        <span>View Case Study</span>
                        <FiArrowRight />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">{rw.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Let's Collaborate</p>
              <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
                Ready to Build Something Like This?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">Let's create your next success story together.</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all group"
              >
                Start Your Project
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WorkDetail;