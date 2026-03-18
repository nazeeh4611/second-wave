import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight, FiArrowUpRight, FiCamera, FiTrendingUp,
  FiCode, FiHeart, FiStar, FiUsers, FiMonitor, FiFilm
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

const SERVICES = [
  { icon: FiCamera,    num: '01', title: 'Branding',              tagline: 'Identity · Strategy · Voice',  desc: 'Create unforgettable brand identities that captivate your audience and leave lasting impressions. From logo design to comprehensive brand guidelines.', features: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Brand Voice'],                    image: '/serbran.webp', path: '/branding'               },
  { icon: FiTrendingUp,num: '02', title: 'SEO',                   tagline: 'Organic · Rankings · ROI',     desc: 'Dominate search engine rankings with data-driven SEO strategies. Sustainable organic growth with higher conversions and maximum ROI.',                 features: ['Keyword Research', 'Technical SEO', 'Link Building', 'Local SEO'],               image: '/serseo.webp',  path: '/seo'                    },
  { icon: FiCode,      num: '03', title: 'Web Development',       tagline: 'React · Next.js · Shopify',    desc: 'Build powerful, responsive websites that turn visitors into customers. Lightning-fast performance, seamless UX, and scalable solutions built for growth.', features: ['Custom Development', 'E-commerce', 'Web Apps', 'Maintenance'],                  image: '/serweb.webp',  path: '/web-development'        },
  { icon: FiMonitor,   num: '04', title: 'Performance Marketing', tagline: 'Meta · Google · TikTok',       desc: 'Data-driven advertising campaigns that maximize ROI. Advanced targeting with creative excellence to deliver measurable results.',                      features: ['Paid Search', 'Social Ads', 'Retargeting', 'Conversion Optimization'],          image: '/serper.webp',  path: '/performance-marketing'  },
  { icon: FiHeart,     num: '05', title: 'Social Media',          tagline: 'Content · Growth · Loyalty',  desc: 'Build thriving communities and drive engagement. Content that sparks conversations and turns followers into loyal customers.',                          features: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Paid Social'],image: '/sersoc.webp',  path: '/social-media-marketing' },
  { icon: FiStar,      num: '06', title: 'Creative',              tagline: 'Design · Direction · Story',  desc: 'Innovative creative solutions that drive brand growth. Design thinking meets marketing expertise for campaigns that truly stand out.',                  features: ['Creative Direction', 'Content Creation', 'Art Direction', 'Copywriting'],        image: '/sercre.webp',  path: '/creative'               },
  { icon: FiFilm,      num: '07', title: 'Production',            tagline: 'Video · Photo · Sound',       desc: 'Professional video and audio production that brings your vision to life. Cinematic quality that captivates and communicates powerfully.',             features: ['Video Production', 'Photography', 'Post-Production', 'Animation'],              image: '/servid.webp',  path: '/production'             },
  { icon: FiUsers,     num: '08', title: 'Digital PR',            tagline: 'Media · Influence · Reach',   desc: 'Strategic PR campaigns that build relationships with media and influencers. Get featured in top publications and build lasting brand authority.',     features: ['Media Relations', 'Influencer Outreach', 'Brand Reputation', 'Press Releases'], image: '/serdig.webp',  path: '/digital-pr'             },
];

export default function Services() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-word',
        { y: '108%', skewY: 2 },
        { y: '0%', skewY: 0, duration: 1.1, stagger: 0.08, delay: 0.2, ease: 'power4.out' }
      );
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-badge',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.15, ease: 'back.out(1.6)' }
      );
      gsap.utils.toArray('.ru').forEach(el =>
        gsap.fromTo(el, { y: 48, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      );
      gsap.utils.toArray('.svc-card').forEach((el, i) =>
        gsap.fromTo(el, { y: 50, opacity: 0, scale: 0.94 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.65, delay: (i % 3) * 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' },
        })
      );
      gsap.fromTo('.process-card', { y: 50, opacity: 0, scale: 0.93 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.process-grid', start: 'top 80%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#0a0a0a] overflow-x-hidden">

      {/* ── STYLES (GPU-composited only, no max-height) ── */}
      <style>{`
        .svc-card { will-change: transform; }
        .svc-img {
          opacity: 0.6;
          transform: scale(1);
          transition: opacity 350ms ease, transform 500ms ease;
          will-change: transform, opacity;
        }
        .svc-card:hover .svc-img {
          opacity: 0.85;
          transform: scale(1.07);
        }
        .svc-reveal {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 200ms ease, transform 200ms ease;
          will-change: transform, opacity;
        }
        .svc-card:hover .svc-reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .svc-bar {
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .svc-card:hover .svc-bar {
          opacity: 1;
        }
        .svc-icon {
          transition: background 200ms ease, border-color 200ms ease, color 200ms ease;
        }
        .svc-tagline {
          transition: color 200ms ease;
        }
        .svc-card:hover .svc-tagline { color: rgba(79,142,247,0.75); }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=85"
            alt="" className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 50%, #0a0a0a 100%)' }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-16">
          <span className="hero-badge inline-block text-[10px] tracking-[0.45em] uppercase font-bold mb-6 px-4 py-1.5 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30` }}>
            What We Do
          </span>
          <div className="overflow-hidden mb-6">
            <h1 className="font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
              {'Our Services'.split(' ').map((w, i) => (
                <span key={i} className="hero-word inline-block mr-[0.18em] last:mr-0">{w}</span>
              ))}
            </h1>
          </div>
          <p className="hero-sub text-white/40 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to elevate your brand through innovation, creativity, and strategic excellence.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/18 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="bg-[#0a0a0a] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-2 block ru">All Services</span>
              <h2 className="ru font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>What We Offer</h2>
            </div>
            <p className="ru text-white/28 text-xs sm:text-sm leading-relaxed max-w-xs">
              Hover any card to explore what we do and how we can help your brand grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={i}
                  to={s.path}
                  className="svc-card group relative overflow-hidden rounded-2xl flex flex-col cursor-pointer"
                  style={{ background: '#111', minHeight: 340 }}
                >
                  {/* image layer */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <img src={s.image} alt={s.title} className="svc-img w-full h-full object-cover" />
                    {/* gradient always present for readability */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.68) 45%, rgba(5,5,5,0.15) 100%)' }}
                    />
                  </div>

                  {/* ghost number */}
                  <div className="absolute top-4 right-5 z-10 pointer-events-none select-none">
                    <span className="font-black text-white/10 leading-none" style={{ fontSize: '2.2rem' }}>{s.num}</span>
                  </div>

                  {/* left accent bar */}
                  <div className="svc-bar absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full z-20" style={{ background: ACCENT }} />

                  {/* content */}
                  <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-7">

                    {/* icon */}
                    <div
                      className="svc-icon w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                      style={{ background: `${ACCENT}15`, borderColor: `${ACCENT}30`, color: ACCENT }}
                    >
                      <Icon size={15} />
                    </div>

                    {/* tagline */}
                    <span className="svc-tagline text-[9px] font-bold tracking-widest uppercase mb-2 text-white/28">
                      {s.tagline}
                    </span>

                    {/* title — always visible */}
                    <h3
                      className="font-black text-white uppercase leading-tight"
                      style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.6rem)' }}
                    >
                      {s.title}
                    </h3>

                    {/* reveal block — desc + features, GPU-only transition */}
                    <div className="svc-reveal mt-3 flex flex-col gap-3 flex-1">
                      <p className="text-white/45 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.features.map((f, fi) => (
                          <span
                            key={fi}
                            className="text-[9px] px-2.5 py-1 rounded-full border font-medium"
                            style={{ color: `${ACCENT}90`, borderColor: `${ACCENT}25`, background: `${ACCENT}08` }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* bottom row — always visible */}
                    <div
                      className="flex items-center justify-between mt-5 pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: ACCENT }}>
                        Explore
                      </span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                        <FiArrowUpRight size={13} color="white" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK — white ── */}
      <section className="bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-black/30 uppercase font-bold mb-2 block ru">Our Approach</span>
              <h2 className="ru font-black text-black uppercase leading-none" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>How We Work</h2>
            </div>
            <p className="ru text-black/35 text-xs sm:text-sm leading-relaxed max-w-xs">
              A clear, collaborative process designed to deliver results from day one.
            </p>
          </div>
          <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Discovery',  desc: 'Deep dive into your brand, goals, and audience to craft the best possible solutions.' },
              { num: '02', title: 'Strategy',   desc: 'Develop data-driven strategies ensuring every decision is backed by real market insights.' },
              { num: '03', title: 'Execution',  desc: 'Creative execution with continuous optimization for perfect delivery and maximum impact.' },
              { num: '04', title: 'Growth',     desc: 'Measure, iterate, and scale — helping your brand achieve sustainable long-term success.' },
            ].map((item, i) => (
              <div key={i} className="process-card group rounded-2xl p-6 sm:p-7 border border-black/8 hover:border-black/18 transition-all hover:-translate-y-1">
                <div className="font-black text-black/7 leading-none mb-4 select-none" style={{ fontSize: '3.5rem' }}>{item.num}</div>
                <div className="w-7 h-0.5 mb-4 group-hover:w-12 transition-all duration-300" style={{ background: ACCENT }} />
                <h3 className="font-black text-black text-base sm:text-lg mb-2">{item.title}</h3>
                <p className="text-black/40 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US — dark ── */}
      <section className="bg-[#0a0a0a] py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-3 block ru">Why SecondWave</span>
            <h2 className="ru font-black text-white uppercase leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Results You<br />Can Measure
            </h2>
            <p className="ru text-white/35 text-sm leading-relaxed mb-8 max-w-sm">
              We don't just make things look good — we obsess over making sure they perform and deliver real, measurable ROI for your business in Kochi and beyond.
            </p>
            <Link to="/contact"
              className="ru inline-flex items-center gap-2.5 text-white font-black rounded-full px-7 py-3.5 text-xs tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105 group"
              style={{ background: ACCENT }}>
              Start a Project <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: '720+', label: 'Projects Delivered', accent: true  },
              { num: '9+',   label: 'Years Experience',   accent: false },
              { num: '98%',  label: 'Client Satisfaction',accent: false },
              { num: '125+', label: 'Partnerships',       accent: true  },
            ].map((s, i) => (
              <div key={i} className="ru rounded-2xl p-5 sm:p-6 border transition-all hover:scale-[1.02]"
                style={{
                  background: s.accent ? `${ACCENT}10` : 'rgba(255,255,255,0.03)',
                  borderColor: s.accent ? `${ACCENT}25` : 'rgba(255,255,255,0.07)',
                }}>
                <div className="font-black text-white leading-none mb-1.5" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}>{s.num}</div>
                <div className="text-white/28 text-[10px] tracking-widest uppercase font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — white ── */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden p-10 sm:p-14 text-center" style={{ background: '#0a0a0a' }}>
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block" style={{ color: ACCENT }}>Ready to Start?</span>
            <h2 className="font-black text-white uppercase leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
              Transform Your<br />Brand Today
            </h2>
            <p className="text-white/30 text-sm sm:text-base leading-relaxed max-w-sm mx-auto mb-8">
              Let's create something amazing together and take your brand to new heights in Kochi and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2.5 text-white font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105 group"
                style={{ background: ACCENT }}>
                Start Your Project <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/works"
                className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/55 font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase hover:border-white/30 hover:text-white transition-all">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}