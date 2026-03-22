import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiMapPin, FiClock, FiBriefcase, FiArrowDown } from 'react-icons/fi';
import axios from 'axios';
import baseurl from '../services/base';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';
const API_URL = baseurl;

const PERKS = [
  { icon: '🎨', title: 'Creative Freedom', desc: 'Work on real brands that shape culture — no bureaucracy, just bold ideas.' },
  { icon: '🚀', title: 'Fast Growth', desc: "We move fast. You'll learn more here in 6 months than most do in 2 years." },
  { icon: '🌊', title: 'Ride the Wave', desc: 'Be part of Kochi\'s most exciting creative agency at the peak of its growth.' },
  { icon: '🤝', title: 'Real Impact', desc: 'Your work goes live — on billboards, feeds, screens across Kerala and beyond.' },
];

export default function Careers() {
  const containerRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`${API_URL}/careers`).then(r => {
      setJobs(Array.isArray(r.data) ? r.data : []);
    }).catch(() => setJobs([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.c-title', { y: '106%', skewY: 2 }, { y: '0%', skewY: 0, duration: 1.2, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.c-sub', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: 'power3.out' });

      gsap.utils.toArray('.ru').forEach(el =>
        gsap.fromTo(el, { y: 48, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      );
      gsap.utils.toArray('.perk-card').forEach((el, i) =>
        gsap.fromTo(el, { y: 36, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' },
        })
      );
      gsap.utils.toArray('.job-card').forEach((el, i) =>
        gsap.fromTo(el, { x: -24, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.55, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        })
      );
    }, containerRef);
    return () => ctx.revert();
  }, [jobs]);

  const departments = ['all', ...new Set(jobs.map(j => j.department).filter(Boolean))];
  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.department === filter);
  const published = filtered.filter(j => j.isPublished !== false);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] overflow-x-hidden">
      <section className="relative w-full bg-black overflow-hidden" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${ACCENT}0f 0%, rgba(0,0,0,0.95) 100%)` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4 pt-24">
          <span className="inline-block text-[10px] tracking-[0.4em] uppercase font-bold mb-6 px-3 py-1 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30` }}>
            Join the Wave
          </span>
          <div className="overflow-hidden mb-5">
            <h1 className="c-title font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(2.8rem, 11vw, 10rem)' }}>
              CAREERS.
            </h1>
          </div>
          <p className="c-sub text-white/40 text-sm max-w-md leading-relaxed mb-10">
            We're building Kochi's most creative digital agency. If you're obsessed with craft, driven by results, and ready to ride the second wave — we want you.
          </p>
          <a href="#openings" className="inline-flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors">
            See Openings <FiArrowDown size={12} className="animate-bounce" />
          </a>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-14 sm:py-20 px-4 sm:px-6 md:px-8" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="ru font-black text-white uppercase" style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}>Why SecondWave?</h2>
            <p className="ru text-white/30 text-sm mt-3 max-w-lg mx-auto">Real work. Real growth. A team that gives a damn.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((p, i) => (
              <div key={i} className="perk-card rounded-2xl p-6 border transition-all hover:scale-[1.02]" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="text-2xl mb-4">{p.icon}</div>
                <h3 className="font-black text-white text-sm mb-2 uppercase tracking-wide">{p.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="bg-[#0f0f0f] py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-2 block">Now Hiring</span>
              <h2 className="ru font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}>Open Roles</h2>
            </div>
            {departments.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {departments.map(d => (
                  <button key={d} onClick={() => setFilter(d)}
                    className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all"
                    style={{
                      background: filter === d ? ACCENT : 'transparent',
                      borderColor: filter === d ? ACCENT : 'rgba(255,255,255,0.1)',
                      color: filter === d ? '#fff' : 'rgba(255,255,255,0.35)',
                    }}>
                    {d === 'all' ? 'All' : d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: `${ACCENT}30`, borderTopColor: ACCENT }} />
            </div>
          ) : published.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-white/25 text-sm">No openings right now — check back soon.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 mt-5 text-white font-black text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all hover:opacity-90" style={{ background: ACCENT }}>
                Send Open Application <FiArrowRight size={11} />
              </Link>
            </div>
          ) : (
            <div className="divide-y rounded-2xl overflow-hidden border" style={{ background: '#141414', borderColor: 'rgba(255,255,255,0.06)', divideColor: 'rgba(255,255,255,0.06)' }}>
              {published.map((job) => (
                <Link key={job._id} to={`/careers/${job._id}`}
                  className="job-card group flex flex-col sm:flex-row sm:items-center gap-4 px-6 sm:px-8 py-6 transition-colors hover:bg-white/5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {job.isNew && (
                        <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: `${ACCENT}20`, color: ACCENT }}>New</span>
                      )}
                      {job.department && (
                        <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {job.department}
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-white group-hover:text-[#4F8EF7] transition-colors uppercase leading-tight mb-2"
                      style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}>
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4">
                      {job.location && (
                        <span className="flex items-center gap-1.5 text-white/30 text-xs">
                          <FiMapPin size={11} /> {job.location}
                        </span>
                      )}
                      {job.type && (
                        <span className="flex items-center gap-1.5 text-white/30 text-xs">
                          <FiClock size={11} /> {job.type}
                        </span>
                      )}
                      {job.experience && (
                        <span className="flex items-center gap-1.5 text-white/30 text-xs">
                          <FiBriefcase size={11} /> {job.experience}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {job.salary && (
                      <span className="text-white/40 text-xs font-semibold hidden sm:block">{job.salary}</span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[#4F8EF7] text-[10px] font-black tracking-widest uppercase group-hover:gap-3 transition-all">
                      Apply <FiArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="overflow-hidden mb-4">
            <h2 className="ru font-black text-white uppercase leading-[0.88] tracking-tighter" style={{ fontSize: 'clamp(2.2rem, 7vw, 6rem)' }}>
              DON'T SEE<br />YOUR ROLE?
            </h2>
          </div>
          <p className="text-white/25 text-sm leading-relaxed max-w-sm mx-auto mb-8">
            We're always looking for exceptional talent. Send us your portfolio and tell us how you'd ride the wave.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2.5 text-white font-black rounded-full px-9 py-3.5 text-xs tracking-widest uppercase transition-all hover:scale-105 hover:opacity-90"
            style={{ background: ACCENT }}>
            Get In Touch <FiArrowRight size={12} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes spinA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
      `}</style>
    </div>
  );
}