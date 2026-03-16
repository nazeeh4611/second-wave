import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FiArrowDown, FiPlus, FiMinus, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────────── */
const SERVICES_LEFT = [
  { label: 'BRANDING', link: '/branding', desc: 'Our branding services create a strong, memorable identity that connects emotionally and drives loyalty.' },
  { label: 'DIGITAL MARKETING', link: '/production', desc: 'We specialize in SEO, social media marketing, content creation, and performance campaigns.' },
  { label: 'WEBSITE DEVELOPMENT', link: '/web-development', desc: 'We build custom websites that are visually engaging, fast, and functionally robust.' },
];
const SERVICES_RIGHT = [
  { label: 'PERFORMANCE MARKETING', link: '/performance-marketing', desc: 'Targeted ad campaigns on Meta, Google & TikTok that generate measurable ROI.' },
  { label: 'SOCIAL MEDIA', link: '/social-media-marketing', desc: 'Build strong online communities and grow brand presence with strategic content.' },
  { label: 'PRODUCTION', link: '/production', desc: 'Delivering top-quality video, photography, and creative production services.' },
];

const CLIENTS = [
  'Client Co.', 'Samsung', 'Client 3', 'GreenSync', 'CAPKON',
  'Do Next', 'AMS', 'Accelerate', '11GRAMS', 'Client 10',
];

const TESTIMONIALS = [
  {
    quote: 'We have been working with SecondWave for our advertising and digital marketing needs, and they have consistently exceeded our expectations.',
    name: 'Ar. Siraj',
    role: 'Founder & Chief Architect',
    company: 'Sacred Saga',
  },
  {
    quote: 'SecondWave transformed our brand presence completely. Their creativity and strategic approach have helped us achieve remarkable results in our marketing campaigns.',
    name: 'Ahmed Al Rashid',
    role: 'Founder',
    company: 'NovaBrand',
  },
  {
    quote: 'Their out-of-the-box ideas and innovative campaigns helped us stand out in a crowded market, generating significant brand awareness. Truly a creative powerhouse.',
    name: 'Sarah Mitchell',
    role: 'CEO',
    company: 'GrowthLab',
  },
];

const FAQS = [
  { q: 'What digital marketing services do you offer?', a: 'We offer a wide range of services including SEO, Social Media Marketing, PPC Advertising, Content Marketing, Website Design & Development, and Performance Marketing — all tailored to your business goals.' },
  { q: 'Why should I choose SecondWave?', a: 'We are a results-driven agency with 9+ years of experience. We understand your unique business goals and craft personalized strategies that deliver real, measurable results.' },
  { q: 'How do I know if your digital marketing services are right for my business?', a: 'We take time to understand your business goals first. We then create a personalized strategy that works specifically for your needs and target audience.' },
  { q: 'What makes SecondWave different from other agencies?', a: 'Our deep creative expertise combined with data-driven performance marketing makes us unique. We don\'t just make things look good — we make sure they perform.' },
  { q: 'How much do your digital marketing services cost?', a: 'Prices vary depending on your goals, target audience, and platforms. We offer packages for startups to enterprise brands. Contact us for a free consultation and custom quote.' },
];
/* ─────────────────────────────────────────────────────────── */

export default function Home() {
  const containerRef  = useRef(null);
  const marqueeRef    = useRef(null);
  const testiRef      = useRef(null);
  const faqTitleRef   = useRef(null);
  const faqAccRef     = useRef(null);
  const ctaRef        = useRef(null);
  const clientsRef    = useRef(null);

  const [openFaq, setOpenFaq]   = useState(null);
  const [testi, setTesti]       = useState(0);
  const [form, setForm]         = useState({ name: '', phone: '' });
  const [loading, setLoading]   = useState(true);
  const [testiAnim, setTestiAnim] = useState(false);

  useEffect(() => { setTimeout(() => setLoading(false), 80); }, []);

  /* change testimonial with fade */
  const changeTesti = useCallback((i) => {
    if (i === testi) return;
    setTestiAnim(true);
    setTimeout(() => { setTesti(i); setTestiAnim(false); }, 300);
  }, [testi]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {

      /* ── HERO ── */
      gsap.fromTo('.h-title',  { y: '110%', skewY: 3 }, { y: '0%', skewY: 0, duration: 1.2,  delay: 0.2,  ease: 'power4.out' });
      gsap.fromTo('.h-sub',    { opacity: 0, y: 28    }, { opacity: 1, y: 0,  duration: 0.9,  delay: 0.95, ease: 'power3.out' });
      gsap.fromTo('.h-btn',    { opacity: 0, scale: 0.82, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.75, delay: 1.2, ease: 'back.out(1.8)' });
      gsap.fromTo('.h-social', { opacity: 0, y: 10    }, { opacity: 1, y: 0,  duration: 0.6,  delay: 1.55, ease: 'power2.out' });
      gsap.fromTo('.h-scroll', { opacity: 0            }, { opacity: 1,        duration: 0.6,  delay: 2.1,  ease: 'power2.out' });

      /* ── MARQUEE ── */
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, { x: '-50%', duration: 24, repeat: -1, ease: 'none' });
      }

      /* ── GENERIC SCROLL REVEALS ── */
      gsap.utils.toArray('.ru').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' } }
        );
      });

      /* ── STAGGERED REVEALS ── */
      gsap.utils.toArray('.ru-stagger').forEach(container => {
        const children = container.children;
        gsap.fromTo(children,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      /* ── ABOUT HEADING ── */
      gsap.fromTo('.about-heading',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-heading', start: 'top 85%' } }
      );

      /* ── SERVICES GRID CELLS ── */
      gsap.utils.toArray('.svc-cell').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, delay: i * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
        );
      });

      /* ── CLIENTS ROW COUNT ── */
      gsap.utils.toArray('.client-cell').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, delay: i * 0.04, ease: 'power2.out',
            scrollTrigger: { trigger: clientsRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      /* ── TESTIMONIAL SECTION ── */
      if (testiRef.current) {
        gsap.fromTo(testiRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: testiRef.current, start: 'top 82%' } }
        );
      }

      /* ── FAQ TITLE SLIDE IN ── */
      if (faqTitleRef.current) {
        gsap.fromTo(faqTitleRef.current,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
            scrollTrigger: { trigger: faqTitleRef.current, start: 'top 82%' } }
        );
      }

      /* ── FAQ ACCORDION ITEMS ── */
      if (faqAccRef.current) {
        gsap.fromTo(faqAccRef.current.children,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: faqAccRef.current, start: 'top 82%' } }
        );
      }

      /* ── CTA SECTION ── */
      if (ctaRef.current) {
        gsap.fromTo('.cta-title',
          { y: 70, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power4.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' } }
        );
        gsap.fromTo('.cta-form',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' } }
        );
      }

      /* ── COUNTERS ── */
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count, suffix = el.dataset.suffix || '', obj = { v: 0 };
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true,
          onEnter: () => gsap.to(obj, { v: target, duration: 2.4, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; } }) });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setForm({ name: '', phone: '' });
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-10 h-10 border-2 border-[#c8f731]/30 border-t-[#c8f731] rounded-full animate-spin" />
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] overflow-x-hidden">

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="relative w-full bg-black overflow-hidden" style={{ height: '100dvh', minHeight: 580 }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
          <source src="https://pub-6070c66a49144147b12828af75c69a0c.r2.dev/100882-video-2160%20(1)%20(1)%20(1)%20(1)%20(1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <div className="overflow-hidden mb-6">
            <h1 className="h-title font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(3.2rem, 13vw, 12rem)' }}>
              SECOND WAVE.
            </h1>
          </div>
          <p className="h-sub text-white/45 text-xs sm:text-sm max-w-sm leading-relaxed mb-9">
            Riding the digital wave to transform your brand into an unforgettable experience through innovation, creativity, and strategic excellence.
          </p>
          <Link to="/contact"
            className="h-btn inline-flex items-center gap-2 bg-[#c8f731] text-black font-black rounded-full px-9 py-3.5 text-sm tracking-wider uppercase hover:bg-[#dbff3f] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(200,247,49,0.55)]">
            Enquire Now
          </Link>
          <div className="h-social flex items-center gap-5 mt-8">
            <a href="https://www.instagram.com/secondwave.ads" target="_blank" rel="noopener noreferrer"
              className="text-white/28 text-[10px] tracking-[0.25em] uppercase hover:text-white/60 transition-colors">Instagram</a>
            <span className="text-white/15">|</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="text-white/28 text-[10px] tracking-[0.25em] uppercase hover:text-white/60 transition-colors">Facebook</a>
          </div>
        </div>

        <div className="h-scroll absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
          <FiArrowDown className="text-white/25 animate-bounce" size={16} />
        </div>
      </section>

      {/* ══ 2. MARQUEE ═══════════════════════════════════════════ */}
      <div className="overflow-hidden bg-[#0a0a0a]" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={marqueeRef} className="flex whitespace-nowrap py-4">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="flex-shrink-0 font-black uppercase tracking-tighter mr-8"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', color: 'rgba(255,255,255,0.055)' }}>
              Stand out from the crowd.&nbsp;
              <span style={{ color: 'rgba(200,247,49,0.18)' }}>·</span>
              &nbsp;Let your brand speak.&nbsp;
              <span style={{ color: 'rgba(200,247,49,0.18)' }}>·</span>
              &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══ 3. ABOUT ══════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2 className="about-heading font-black text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.8rem)' }}>
              Digital Marketing Agency in UAE
            </h2>
            <p className="text-white/38 text-sm leading-relaxed mb-3 ru">
              As a leading digital marketing agency in the UAE, we are proud to deliver great results in branding and advertising. We offer SEO, social media marketing, PPC ads, content marketing, and website development.
            </p>
            <button className="text-[#c8f731] text-xs font-black tracking-widest uppercase hover:underline ru">Read More</button>

            {/* stats */}
            <div className="grid grid-cols-2 gap-5 mt-10 ru-stagger">
              {[{ count: 710, suffix: '', label: 'Happy Clients' }, { count: 9, suffix: '+', label: 'Years Experience' }, { count: 720, suffix: '', label: 'Projects Done' }, { count: 125, suffix: '+', label: 'Partnerships' }].map((s, i) => (
                <div key={i} className="border border-white/8 rounded-2xl p-5 hover:border-[#c8f731]/30 transition-colors">
                  <div className="font-black text-white leading-none mb-1"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                    data-count={s.count} data-suffix={s.suffix}>
                    {s.count}{s.suffix}
                  </div>
                  <div className="text-white/30 text-[10px] tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 ru">
            {['/branding.jpg', '/perfo.jpg', '/sm.jpg', '/web.png'].map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl bg-white/4 ${i === 1 ? 'mt-8' : ''} ${i === 3 ? '-mt-8' : ''}`}
                style={{ aspectRatio: '3/4' }}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-106 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. IMAGE STRIP ════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] px-5 sm:px-8 pb-2">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 ru">
            {['/branding.jpg', '/perfo.jpg', '/bran.png'].map((src, i) => (
              <Link key={i} to="/works" className="group overflow-hidden rounded-xl sm:rounded-2xl bg-white/4" style={{ aspectRatio: '3/2' }}>
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </Link>
            ))}
          </div>
          <div className="mt-2 overflow-hidden rounded-xl sm:rounded-2xl bg-white/3 ru" style={{ height: 155 }}>
            <Link to="/works" className="block w-full h-full">
              <img src="/mark.png" alt="" className="w-full h-full object-cover opacity-60 hover:opacity-80 hover:scale-102 transition-all duration-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 5. OUR SERVICES ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="ru font-black text-white uppercase" style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}>OUR SERVICES</h2>
            <p className="ru text-white/28 text-xs sm:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              We provide businesses with an expert team that guides them through establishing a powerful online presence and marketing strategy.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: '#111' }}>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_1fr]">

              {/* LEFT */}
              <div className="divide-y divide-white/8 border-b sm:border-b-0 sm:border-r border-white/8">
                {SERVICES_LEFT.map((s, i) => (
                  <Link key={i} to={s.link} className="svc-cell group block p-6 sm:p-8 hover:bg-white/3 transition-colors">
                    <h3 className="font-black text-white group-hover:text-[#c8f731] transition-colors uppercase tracking-tight text-sm sm:text-base mb-1.5">{s.label}</h3>
                    <p className="text-white/28 text-[11px] sm:text-xs leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[#c8f731] text-[10px] font-black tracking-widest uppercase mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <FiArrowRight size={10} />
                    </span>
                  </Link>
                ))}
              </div>

              {/* CENTER logo */}
              <div className="hidden sm:flex flex-col items-center justify-center border-r border-white/8 py-8" style={{ background: '#0d0d0d' }}>
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border border-white/8" style={{ animation: 'rotateSlow 18s linear infinite' }} />
                  <div className="absolute inset-2.5 rounded-full border border-[#c8f731]/15" style={{ animation: 'rotateSlow 12s linear infinite reverse' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/lg.png" alt="SW" className="w-10 opacity-55" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="divide-y divide-white/8">
                {SERVICES_RIGHT.map((s, i) => (
                  <Link key={i} to={s.link} className="svc-cell group block p-6 sm:p-8 hover:bg-white/3 transition-colors">
                    <h3 className="font-black text-white group-hover:text-[#c8f731] transition-colors uppercase tracking-tight text-sm sm:text-base mb-1.5">{s.label}</h3>
                    <p className="text-white/28 text-[11px] sm:text-xs leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[#c8f731] text-[10px] font-black tracking-widest uppercase mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <FiArrowRight size={10} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. WORKS GRID ════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] pb-16 sm:pb-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-3" style={{ gridTemplateRows: 'auto auto' }}>
            {/* row 1 col 1 */}
            <Link to="/works" className="svc-cell group overflow-hidden rounded-xl sm:rounded-2xl bg-white/4" style={{ aspectRatio: '1/1' }}>
              <img src="/branding.jpg" alt="" className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" />
            </Link>

            {/* row 1+2 col 2 — tall lime */}
            <div className="row-span-2 svc-cell overflow-hidden rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative" style={{ background: '#c8f731' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
                <img src="/lg.png" alt="SecondWave" className="w-14 sm:w-20" style={{ filter: 'brightness(0)' }} />
                <Link to="/works"
                  className="bg-black text-white font-black text-[9px] sm:text-[11px] tracking-widest uppercase px-4 py-2 rounded-full hover:bg-gray-900 transition-colors">
                  Our Works
                </Link>
              </div>
            </div>

            {/* row 1 col 3 */}
            <Link to="/works" className="svc-cell group overflow-hidden rounded-xl sm:rounded-2xl bg-white/4" style={{ aspectRatio: '1/1' }}>
              <img src="/bran.png" alt="" className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" />
            </Link>

            {/* row 2 col 1 */}
            <Link to="/works" className="svc-cell group overflow-hidden rounded-xl sm:rounded-2xl bg-white/4" style={{ aspectRatio: '1/1' }}>
              <img src="/perfo.jpg" alt="" className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" />
            </Link>

            {/* row 2 col 3 — two stacked */}
            <div className="flex flex-col gap-2">
              <Link to="/works" className="svc-cell group overflow-hidden rounded-xl sm:rounded-2xl bg-white/4" style={{ aspectRatio: '2/1' }}>
                <img src="/sm.jpg" alt="" className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" />
              </Link>
              <Link to="/works" className="svc-cell group overflow-hidden rounded-xl sm:rounded-2xl bg-white/4" style={{ aspectRatio: '2/1' }}>
                <img src="/web.png" alt="" className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. OUR CLIENTS ═══════════════════════════════════════ */}
      <section ref={clientsRef} className="bg-[#0a0a0a] py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 ru">
            <h2 className="font-black text-white uppercase" style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}>OUR CLIENTS</h2>
          </div>
          <div className="border border-white/8 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-5 divide-x divide-white/8 border-b border-white/8">
              {CLIENTS.slice(0, 5).map((c, i) => (
                <div key={i} className="client-cell flex items-center justify-center py-7 hover:bg-white/3 transition-colors">
                  <span className="text-white/30 font-black text-[9px] sm:text-[11px] tracking-widest uppercase text-center px-2">{c}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 divide-x divide-white/8">
              {CLIENTS.slice(5, 10).map((c, i) => (
                <div key={i} className="client-cell flex items-center justify-center py-7 hover:bg-white/3 transition-colors">
                  <span className="text-white/30 font-black text-[9px] sm:text-[11px] tracking-widest uppercase text-center px-2">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-7 ru">
            <button className="border border-white/12 text-white/35 font-semibold text-[11px] tracking-widest uppercase px-8 py-3 rounded-full hover:border-white/25 hover:text-white/55 transition-all">
              Load More
            </button>
          </div>
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS — FIXED ══════════════════════════════ */}
      <section ref={testiRef} style={{ background: '#c8f731' }} className="py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* quote card */}
          <div className="relative" style={{ opacity: testiAnim ? 0 : 1, transition: 'opacity 0.3s ease' }}>
            {/* giant opening quote */}
            <span
              className="absolute font-black select-none leading-none pointer-events-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 12rem)', color: 'rgba(0,0,0,0.08)', top: '-1.5rem', left: '-0.5rem' }}>
              "
            </span>

            <div className="relative z-10 pt-8 pb-6">
              <p className="font-black text-black leading-snug mb-8"
                style={{ fontSize: 'clamp(1.15rem, 3vw, 2rem)', lineHeight: 1.35 }}>
                {TESTIMONIALS[testi].quote}
              </p>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-black text-black text-sm sm:text-base">{TESTIMONIALS[testi].name}</div>
                  <div className="text-black/55 text-xs mt-0.5">{TESTIMONIALS[testi].role}</div>
                  <div className="text-black/40 text-[10px] mt-0.5">{TESTIMONIALS[testi].company}</div>
                </div>
                {/* closing quote bottom-right */}
                <span className="font-black select-none leading-none pointer-events-none flex-shrink-0"
                  style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'rgba(0,0,0,0.08)', lineHeight: 0.8 }}>
                  "
                </span>
              </div>
            </div>
          </div>

          {/* dot pagination */}
          <div className="flex items-center gap-2.5 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => changeTesti(i)}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === testi ? 28 : 9,
                  height: 9,
                  background: i === testi ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.22)',
                }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. FAQ ═══════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Mobile: stacked. Desktop: strict 2-col grid with overflow-hidden on left */}
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-start">

            {/* LEFT — title capped at 340px, never overflows into right col */}
            <div ref={faqTitleRef} className="lg:sticky lg:top-24 overflow-hidden">
              <h2 className="font-black text-white uppercase leading-[0.88] tracking-tighter break-words"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', wordBreak: 'break-word' }}>
                FREQUENTLY<br />ASKED<br />QUESTIONS?
              </h2>
              <p className="text-white/25 text-xs leading-relaxed mt-5">
                Everything you need to know about working with SecondWave.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 mt-6 bg-[#c8f731] text-black font-black rounded-full px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#dbff3f] transition-all hover:scale-105">
                Ask Us <FiArrowRight size={11} />
              </Link>
            </div>

            {/* RIGHT — accordion */}
            <div ref={faqAccRef} className="divide-y divide-white/8">
              {FAQS.map((f, i) => (
                <div key={i} className="py-5 sm:py-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-5 text-left group">
                    <span className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${openFaq === i ? 'text-[#c8f731]' : 'text-white/65 group-hover:text-white'}`}>
                      {f.q}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 text-white/25 group-hover:text-white/50 transition-colors">
                      {openFaq === i ? <FiMinus size={18} /> : <FiPlus size={18} />}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openFaq === i ? 240 : 0, opacity: openFaq === i ? 1 : 0 }}>
                    <p className="text-white/35 text-sm leading-relaxed pt-4">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ 10. READY TO WORK WITH US ════════════════════════════ */}
      <section ref={ctaRef} className="bg-[#0a0a0a] py-16 sm:py-28 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="overflow-hidden mb-4">
            <h2 className="cta-title font-black text-white uppercase leading-[0.88] tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 11vw, 9rem)' }}>
              READY TO<br />WORK<br />WITH US ?
            </h2>
          </div>
          <p className="cta-form text-white/28 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-10">
            Go beyond typical with SecondWave. You're not just choosing a campaign — you're selecting a partner who understands your vision.
          </p>

          <form onSubmit={onSubmit} className="cta-form max-w-xs mx-auto flex flex-col gap-3">
            <input
              type="text" placeholder="Name" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#111] border border-white/10 rounded-full px-5 py-3.5 text-white text-sm placeholder-white/18 focus:outline-none focus:border-[#c8f731]/45 transition-colors"
            />
            <div className="flex items-center bg-[#111] border border-white/10 rounded-full px-5 py-3.5 gap-2 focus-within:border-[#c8f731]/45 transition-colors">
              <span className="text-white/22 text-sm font-bold flex-shrink-0">🇦🇪 +971</span>
              <input
                type="tel" placeholder="Phone Number"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="flex-1 bg-transparent text-white text-sm placeholder-white/18 focus:outline-none"
              />
            </div>
            <button type="submit"
              className="w-full bg-[#c8f731] text-black font-black rounded-full py-3.5 text-sm tracking-widest uppercase hover:bg-[#dbff3f] transition-all hover:shadow-[0_0_50px_rgba(200,247,49,0.45)] hover:scale-[1.025]">
              Get Started
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hover\\:scale-106:hover { transform: scale(1.06); }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}