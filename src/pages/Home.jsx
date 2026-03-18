import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowDown, FiPlus, FiMinus, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

const SERVICES = [
  { label: 'BRANDING',              link: '/branding',              desc: 'We craft powerful brand identities that connect emotionally with your audience and position your business for lasting success.' },
  { label: 'DIGITAL MARKETING',     link: '/production',            desc: 'From SEO to content marketing, we drive qualified traffic and turn your online presence into a lead-generating machine.' },
  { label: 'WEBSITE DEVELOPMENT',   link: '/web-development',       desc: 'We build custom, blazing-fast websites that are visually stunning and engineered to convert visitors into customers.' },
  { label: 'PERFORMANCE MARKETING', link: '/performance-marketing', desc: 'Data-driven ad campaigns on Meta, Google & TikTok that maximise ROI and deliver real, measurable business growth.' },
  { label: 'SOCIAL MEDIA',          link: '/social-media-marketing',desc: 'We build engaged communities and grow your brand\'s presence with strategic content, reels, and campaigns.' },
  { label: 'PRODUCTION',            link: '/production',            desc: 'From concept to final cut — photography, videography, and creative production that makes your brand impossible to ignore.' },
];

const WORKS = [
  { image: '/branding.jpg', label: 'Brand Identity',    client: 'Sacred Saga',   tag: 'Branding'    },
  { image: '/perfo.jpg',    label: 'Campaign Strategy', client: 'Samsung Kerala', tag: 'Performance' },
  { image: '/bran.png',     label: 'Visual Identity',   client: 'Baleni',        tag: 'Design'      },
  { image: '/sm.jpg',       label: 'Social Growth',     client: 'MCKKutty',      tag: 'Social'      },
  { image: '/web.png',      label: 'Web Platform',      client: 'Mywork',        tag: 'Development' },
  { image: '/mark.png',     label: 'Marketing Suite',   client: 'GreenSync',     tag: 'Marketing'   },
];

const CLIENTS_ROW1 = ['Samsung','Capkon','GreenSync','AMS','11Grams','Mywork','Baleni','Sacred Saga','Samsung','Capkon','GreenSync','AMS'];
const CLIENTS_ROW2 = ['Plum Stories','MCKKutty','Design Dialects','Adobe','Shopify','Oracle','Google','Meta','Plum Stories','MCKKutty','Design Dialects','Adobe'];

const TESTIMONIALS = [
  { quote: 'We have been working with SecondWave for our advertising and digital marketing needs, and they have consistently exceeded our expectations.', name: 'Ar. Siraj', role: 'Founder & Chief Architect', company: 'Sacred Saga' },
  { quote: 'SecondWave has consistently delivered exceptional designs and marketing solutions that have exceeded our expectations. We highly recommend their services.', name: 'MC Nasar', role: 'Chairman & Managing Director', company: 'MCKKutty' },
  { quote: 'Their out-of-the-box ideas and innovative campaigns helped us stand out in a crowded market, generating significant brand awareness.', name: 'Neshma Abdurrahman', role: 'Founder', company: 'Design Dialects' },
  { quote: 'SecondWave is a dedicated agency. They go above and beyond to understand our goals and deliver tailored solutions that yield fantastic results.', name: 'Arshad', role: 'Founder', company: 'Baleni' },
];

const FAQS = [
  { q: 'What digital marketing services do you offer?', a: 'We offer SEO, Social Media Marketing, PPC Advertising, Content Marketing, Performance Marketing, Website Design & Development, Branding, and Video Production — all tailored to your specific business goals.' },
  { q: 'Why should I choose SecondWave?', a: 'We are a results-driven agency based in Kochi, Kerala with 9+ years of experience. We create custom strategies that help businesses succeed online locally and nationally.' },
  { q: 'How do I know if your services are right for my business?', a: 'We take time to understand your goals, audience, and budget first. Then we build a personalized strategy — there\'s no one-size-fits-all approach here.' },
  { q: 'What makes SecondWave different from other agencies?', a: 'We combine deep creative expertise with data-driven performance marketing. We don\'t just make things look good — we make sure they perform and deliver real ROI.' },
  { q: 'How much do your digital marketing services cost?', a: 'Our packages are flexible — from startups to established brands. Contact us for a free consultation and a custom quote tailored to your needs.' },
];

function ClientTrack({ names, direction = 'left', speed = 30 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const w = el.scrollWidth / 2;
    const anim = gsap.fromTo(el, { x: direction === 'left' ? 0 : -w }, { x: direction === 'left' ? -w : 0, duration: speed, repeat: -1, ease: 'none' });
    return () => anim.kill();
  }, [direction, speed]);
  const doubled = [...names, ...names];
  return (
    <div className="overflow-hidden w-full">
      <div ref={ref} className="flex items-center w-max">
        {doubled.map((name, i) => (
          <React.Fragment key={i}>
            <span className="font-black uppercase tracking-tight text-white/10 whitespace-nowrap px-5 sm:px-8" style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)' }}>{name}</span>
            <span className="font-black select-none text-base" style={{ color: ACCENT, opacity: 0.3 }}>✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const marqueeRef   = useRef(null);
  const faqTitleRef  = useRef(null);
  const faqAccRef    = useRef(null);
  const ctaRef       = useRef(null);

  const [openFaq, setOpenFaq]     = useState(null);
  const [testi, setTesti]         = useState(0);
  const [form, setForm]           = useState({ name: '', phone: '' });
  const [loading, setLoading]     = useState(true);
  const [testiAnim, setTestiAnim] = useState(false);

  useEffect(() => { setTimeout(() => setLoading(false), 80); }, []);

  const changeTesti = useCallback((i) => {
    if (i === testi) return;
    setTestiAnim(true);
    setTimeout(() => { setTesti(i); setTestiAnim(false); }, 260);
  }, [testi]);

  useEffect(() => {
    const t = setInterval(() => {
      setTestiAnim(true);
      setTimeout(() => { setTesti(p => (p + 1) % TESTIMONIALS.length); setTestiAnim(false); }, 260);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.h-title', { y: '106%', skewY: 2 }, { y: '0%', skewY: 0, duration: 1.2, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.h-sub',   { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: 'power3.out' });
      gsap.fromTo('.h-btn',   { opacity: 0, scale: 0.82, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 1.2, ease: 'back.out(1.8)' });
      gsap.fromTo('.h-social',{ opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.5, ease: 'power2.out' });
      gsap.fromTo('.h-scroll',{ opacity: 0 }, { opacity: 1, duration: 0.6, delay: 2.0 });
      if (marqueeRef.current) gsap.to(marqueeRef.current, { x: '-50%', duration: 26, repeat: -1, ease: 'none' });

      gsap.utils.toArray('.ru').forEach(el =>
        gsap.fromTo(el, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } })
      );
      gsap.utils.toArray('.ru-stagger').forEach(c =>
        gsap.fromTo(Array.from(c.children), { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: c, start: 'top 86%', toggleActions: 'play none none none' } })
      );
      gsap.utils.toArray('.svc-item').forEach((el, i) =>
        gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' } })
      );
      gsap.utils.toArray('.work-cell').forEach((el, i) =>
        gsap.fromTo(el, { scale: 0.93, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.65, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' } })
      );
      if (faqTitleRef.current)
        gsap.fromTo(faqTitleRef.current, { x: -55, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: faqTitleRef.current, start: 'top 84%' } });
      if (faqAccRef.current)
        gsap.fromTo(Array.from(faqAccRef.current.children), { x: 35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: faqAccRef.current, start: 'top 84%' } });
      if (ctaRef.current) {
        gsap.fromTo('.cta-title', { y: 55, opacity: 0, skewY: 1.5 }, { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 83%' } });
        gsap.fromTo('.cta-body', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 83%' } });
      }
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count, suffix = el.dataset.suffix || '', obj = { v: 0 };
        ScrollTrigger.create({ trigger: el, start: 'top 89%', once: true,
          onEnter: () => gsap.to(obj, { v: target, duration: 2.2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; } }) });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    alert('Thank you! We\'ll get back to you within 24 hours.');
    setForm({ name: '', phone: '' });
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: `${ACCENT}30`, borderTopColor: ACCENT }} />
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] overflow-x-hidden">

      {/* ── 1. HERO ── */}
      <section className="relative w-full bg-black overflow-hidden" style={{ height: '100dvh', minHeight: 560 }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
          <source src="https://pub-6070c66a49144147b12828af75c69a0c.r2.dev/100882-video-2160%20(1)%20(1)%20(1)%20(1)%20(1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.82) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <div className="overflow-hidden mb-5">
            <h1 className="h-title font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(2.8rem, 11vw, 11rem)' }}>SECOND WAVE.</h1>
          </div>
          <p className="h-sub text-white/45 text-xs sm:text-sm max-w-sm leading-relaxed mb-9">
            Kochi's leading digital marketing agency — riding the wave to transform your brand into an unforgettable experience.
          </p>
          <Link to="/contact" className="h-btn inline-flex items-center gap-2.5 text-white font-black rounded-full px-9 py-3.5 text-xs sm:text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: ACCENT }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 48px ${ACCENT}55`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            Enquire Now
          </Link>
          <div className="h-social flex items-center gap-4 mt-8">
            <a href="https://www.instagram.com/secondwave.ads" target="_blank" rel="noopener noreferrer" className="text-white/30 text-[9px] tracking-[0.25em] uppercase hover:text-white/65 transition-colors">Instagram</a>
            <span className="text-white/15">|</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/30 text-[9px] tracking-[0.25em] uppercase hover:text-white/65 transition-colors">Facebook</a>
          </div>
        </div>
        <div className="h-scroll absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
          <FiArrowDown className="text-white/25 animate-bounce" size={16} />
        </div>
      </section>

      {/* ── 2. MARQUEE ── */}
      <div className="overflow-hidden bg-[#0a0a0a]" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={marqueeRef} className="flex whitespace-nowrap py-4">
          {Array(8).fill(0).map((_, i) => (
            <span key={i} className="flex-shrink-0 font-black uppercase tracking-tighter mr-8" style={{ fontSize: 'clamp(1.8rem, 5.5vw, 5rem)', color: 'rgba(255,255,255,0.055)' }}>
              Stand out from the crowd.&nbsp;<span style={{ color: `${ACCENT}35` }}>✦</span>&nbsp;Let your brand speak.&nbsp;<span style={{ color: `${ACCENT}35` }}>✦</span>&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. ABOUT ── */}
      <section className="bg-[#0a0a0a] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="inline-block text-[10px] tracking-[0.4em] uppercase font-bold mb-4 px-3 py-1 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30` }}>Based in Kochi, Kerala</span>
            <h2 className="ru font-black text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}>
              Digital Marketing<br />Agency in Kochi,<br />Kerala
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              As a leading digital marketing agency in Kochi, we deliver outstanding results in branding and advertising. We offer SEO, social media marketing, PPC ads, content marketing, performance marketing, and website development.
            </p>
            <p className="text-white/22 text-xs sm:text-sm leading-relaxed mb-8">
              Our creative team blends strategy with storytelling to build brands that stand out, perform, and endure across Kerala, India, and beyond.
            </p>
            <Link to="/works" className="inline-flex items-center gap-2.5 text-white font-black rounded-full px-7 py-3.5 text-xs tracking-widest uppercase transition-all group hover:opacity-90 hover:scale-105" style={{ background: ACCENT }}>
              Our Works <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 ru-stagger">
            {[
              { count: 710, suffix: '',  label: 'Happy Clients',    accent: true  },
              { count: 9,   suffix: '+', label: 'Years Experience',  accent: false },
              { count: 720, suffix: '',  label: 'Projects Done',     accent: false },
              { count: 125, suffix: '+', label: 'Partnerships',      accent: true  },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-5 sm:p-6 border transition-all hover:scale-[1.02]"
                style={{ background: s.accent ? `${ACCENT}10` : 'rgba(255,255,255,0.03)', borderColor: s.accent ? `${ACCENT}25` : 'rgba(255,255,255,0.07)' }}>
                <div className="font-black text-white leading-none mb-1.5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }} data-count={s.count} data-suffix={s.suffix}>{s.count}{s.suffix}</div>
                <div className="text-white/30 text-[10px] tracking-widest uppercase font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. IMAGE STRIP ── */}
      <section className="bg-[#0a0a0a] px-4 sm:px-6 md:px-8 pb-3">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-2">
            {['/branding.jpg', '/perfo.jpg', '/bran.png'].map((src, i) => (
              <Link key={i} to="/works" className="group overflow-hidden rounded-xl bg-white/4" style={{ aspectRatio: '3/2' }}>
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </Link>
            ))}
          </div>
          <div className="mt-2 overflow-hidden rounded-xl bg-white/3" style={{ height: 100 }}>
            <Link to="/works" className="block w-full h-full">
              <img src="/mark.png" alt="" className="w-full h-full object-cover opacity-50 hover:opacity-70 transition-opacity duration-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. SERVICES — DO Studio dark card layout ── */}
      <section className="bg-[#0a0a0a] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="ru font-black text-white uppercase" style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}>OUR SERVICES</h2>
            <p className="ru text-white/30 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              We provide businesses with an expert team that guides them through establishing online marketing strategy.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden" style={{ background: '#141414' }}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_1fr]">

              <div>
                {SERVICES.slice(0, 3).map((s, i) => (
                  <Link key={i} to={s.link}
                    className="svc-item group block px-7 sm:px-10 py-7 sm:py-9 border-b border-white/6 hover:bg-white/3 transition-colors last:border-b-0 md:border-b md:last:border-b-0">
                    <h3 className="font-black text-white group-hover:text-[#4F8EF7] transition-colors uppercase leading-none mb-3"
                      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
                      {s.label}
                    </h3>
                    <p className="text-white/28 text-xs leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[#4F8EF7] text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <FiArrowRight size={10} />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="hidden md:flex flex-col items-center justify-center border-x border-white/6 py-10" style={{ background: '#0f0f0f' }}>
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `${ACCENT}22`, animation: 'spinA 16s linear infinite' }} />
                  <div className="absolute inset-4 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.07)', animation: 'spinA 10s linear infinite reverse' }} />
                  <div className="absolute inset-8 rounded-full" style={{ background: `${ACCENT}15` }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/lg.png" alt="SW" className="w-10 opacity-50" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                </div>
                <p className="text-white/12 text-[8px] tracking-widest uppercase font-bold mt-5 text-center leading-relaxed">SecondWave<br />Kochi</p>
                <Link to="/contact" className="mt-5 text-white font-black text-[9px] tracking-widest uppercase px-4 py-2 rounded-full transition-all hover:opacity-90" style={{ background: ACCENT }}>
                  Enquire
                </Link>
              </div>

              <div className="border-t md:border-t-0 border-white/6">
                {SERVICES.slice(3).map((s, i) => (
                  <Link key={i} to={s.link}
                    className="svc-item group block px-7 sm:px-10 py-7 sm:py-9 border-b border-white/6 hover:bg-white/3 transition-colors last:border-b-0">
                    <h3 className="font-black text-white group-hover:text-[#4F8EF7] transition-colors uppercase leading-none mb-3"
                      style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
                      {s.label}
                    </h3>
                    <p className="text-white/28 text-xs leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[#4F8EF7] text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <FiArrowRight size={10} />
                    </span>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 6. OUR WORKS — 3-col grid like DO Studio ── */}
      <section className="bg-[#0f0f0f] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-2 block">Portfolio</span>
              <h2 className="ru font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>Our Work</h2>
            </div>
            <Link to="/works" className="inline-flex items-center gap-2 text-white/40 text-xs font-black tracking-widest uppercase hover:text-white transition-colors group">
              View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3" style={{ gridTemplateRows: 'auto auto' }}>

            <Link to="/works" className="work-cell group relative overflow-hidden rounded-2xl bg-white/4" style={{ aspectRatio: '1/1' }}>
              <img src="/branding.jpg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-black text-xs sm:text-sm leading-tight block">Brand Identity</span>
                <span className="text-white/50 text-[9px] sm:text-[10px] mt-0.5 block">Sacred Saga</span>
              </div>
            </Link>

            <div className="work-cell row-span-2 overflow-hidden rounded-2xl relative flex flex-col" style={{ background: '#4F8EF7' }}>
              <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 p-4">
                <img src="/lg.png" alt="SecondWave" className="w-12 sm:w-18 md:w-20" style={{ filter: 'brightness(0)' }} />
                <p className="text-black/50 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase text-center hidden sm:block">
                  Kochi's Creative Agency
                </p>
                <Link to="/works" onClick={e => e.stopPropagation()} className="bg-black text-white font-black text-[8px] sm:text-[10px] tracking-widest uppercase px-4 sm:px-5 py-2 rounded-full hover:bg-neutral-900 transition-colors">
                  Our Works
                </Link>
              </div>
              <Link to="/works" className="block overflow-hidden" style={{ height: '42%' }}>
                <img src="/mark.png" alt="" className="w-full h-full object-cover opacity-60 hover:opacity-80 hover:scale-105 transition-all duration-500" />
              </Link>
            </div>

            <Link to="/works" className="work-cell group relative overflow-hidden rounded-2xl bg-white/4" style={{ aspectRatio: '1/1' }}>
              <img src="/bran.png" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-black text-xs sm:text-sm leading-tight block">Visual Identity</span>
                <span className="text-white/50 text-[9px] sm:text-[10px] mt-0.5 block">Baleni</span>
              </div>
            </Link>

            <Link to="/works" className="work-cell group relative overflow-hidden rounded-2xl bg-white/4" style={{ aspectRatio: '1/1' }}>
              <img src="/perfo.jpg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-black text-xs sm:text-sm leading-tight block">Campaign Strategy</span>
                <span className="text-white/50 text-[9px] sm:text-[10px] mt-0.5 block">Samsung Kerala</span>
              </div>
            </Link>

            <div className="flex flex-col gap-2 sm:gap-3">
              <Link to="/works" className="work-cell group relative overflow-hidden rounded-2xl bg-white/4 flex-1" style={{ aspectRatio: '2/1' }}>
                <img src="/sm.jpg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                  <span className="text-white font-black text-[10px] sm:text-xs block">Social Growth</span>
                </div>
              </Link>
              <Link to="/works" className="work-cell group relative overflow-hidden rounded-2xl bg-white/4 flex-1" style={{ aspectRatio: '2/1' }}>
                <img src="/web.png" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                  <span className="text-white font-black text-[10px] sm:text-xs block">Web Platform</span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. CLIENTS ── */}
      <section className="bg-[#0a0a0a] py-12 sm:py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-2 block">Trusted Partners</span>
              <h2 className="ru font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>Our Clients</h2>
            </div>
            <p className="text-white/25 text-xs sm:text-sm leading-relaxed max-w-xs">Brands across Kerala, India & beyond trust SecondWave.</p>
          </div>
        </div>
        <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <ClientTrack names={CLIENTS_ROW1} direction="left" speed={25} />
          </div>
          <div className="py-4">
            <ClientTrack names={CLIENTS_ROW2} direction="right" speed={30} />
          </div>
        </div>
        <div className="text-center mt-7">
          <button className="border border-white/10 text-white/28 font-semibold text-[11px] tracking-widest uppercase px-7 py-2.5 rounded-full hover:border-white/20 hover:text-white/45 transition-all">Load More</button>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ── */}
      <section className="bg-[#0f0f0f] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-2 block">Client Voices</span>
              <h2 className="ru font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)' }}>Testimonials</h2>
            </div>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => changeTesti(i)} className="rounded-full transition-all duration-300"
                  style={{ width: i === testi ? 24 : 8, height: 8, background: i === testi ? ACCENT : 'rgba(255,255,255,0.12)' }} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 p-7 sm:p-10 relative overflow-hidden transition-opacity duration-300" style={{ opacity: testiAnim ? 0 : 1, background: '#141414' }}>
            <span className="absolute font-black select-none leading-none pointer-events-none" style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: `${ACCENT}08`, top: '-0.8rem', left: '-0.2rem' }}>"</span>
            <div className="relative z-10">
              <p className="font-black text-white leading-snug mb-7" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', lineHeight: 1.4 }}>{TESTIMONIALS[testi].quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-white text-sm" style={{ background: ACCENT }}>
                  {TESTIMONIALS[testi].name[0]}
                </div>
                <div>
                  <div className="font-black text-white text-sm">{TESTIMONIALS[testi].name}</div>
                  <div className="text-white/32 text-xs mt-0.5">{TESTIMONIALS[testi].role} · {TESTIMONIALS[testi].company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="bg-[#0a0a0a] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-8 lg:gap-16 items-start">
            <div ref={faqTitleRef} className="lg:sticky lg:top-24">
              <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-3 block">Got Questions?</span>
              <h2 className="font-black text-white uppercase leading-[0.88] tracking-tighter" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}>
                FREQUENTLY<br />ASKED<br />QUESTIONS?
              </h2>
              <p className="text-white/22 text-xs sm:text-sm leading-relaxed mt-4 max-w-[260px]">Everything you need to know about working with SecondWave, Kochi.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 mt-5 text-white font-black rounded-full px-5 py-2.5 text-xs tracking-widest uppercase transition-all hover:opacity-90" style={{ background: ACCENT }}>
                Ask Us <FiArrowRight size={11} />
              </Link>
            </div>
            <div ref={faqAccRef} className="divide-y divide-white/8 min-w-0">
              {FAQS.map((f, i) => (
                <div key={i} className="py-4 sm:py-5">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-start justify-between gap-4 text-left group">
                    <span className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${openFaq === i ? 'text-[#4F8EF7]' : 'text-white/55 group-hover:text-white'}`}>{f.q}</span>
                    <span className={`flex-shrink-0 mt-0.5 transition-colors ${openFaq === i ? 'text-[#4F8EF7]' : 'text-white/20 group-hover:text-white/45'}`}>
                      {openFaq === i ? <FiMinus size={17} /> : <FiPlus size={17} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === i ? 220 : 0, opacity: openFaq === i ? 1 : 0 }}>
                    <p className="text-white/32 text-sm leading-relaxed pt-3">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section ref={ctaRef} className="bg-[#0f0f0f] py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="overflow-hidden mb-4">
            <h2 className="cta-title font-black text-white uppercase leading-[0.88] tracking-tighter" style={{ fontSize: 'clamp(2.4rem, 8.5vw, 7.5rem)' }}>
              READY TO<br />WORK<br />WITH US ?
            </h2>
          </div>
          <p className="cta-body text-white/25 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-sm mx-auto mb-8">
            Go beyond typical with SecondWave, Kochi. You're not just choosing a campaign — you're selecting a partner who understands your vision and delivers results.
          </p>
          <form onSubmit={onSubmit} className="cta-body max-w-[290px] mx-auto flex flex-col gap-3">
            <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full px-5 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none transition-colors"
              onFocus={e => e.target.style.borderColor = `${ACCENT}55`} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-full px-5 py-3.5 gap-2 transition-colors"
              onFocus={e => e.currentTarget.style.borderColor = `${ACCENT}55`} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
              <span className="text-white/22 text-sm font-bold flex-shrink-0">🇮🇳 +91</span>
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="flex-1 bg-transparent text-white text-sm placeholder-white/20 focus:outline-none" />
            </div>
            <button type="submit" className="w-full text-white font-black rounded-full py-3.5 text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: ACCENT }}>
              Get Started
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @keyframes spinA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}