import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiArrowLeft, FiMapPin, FiClock, FiBriefcase, FiArrowRight, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import baseurl from '../services/base';

const ACCENT = '#4F8EF7';
const API_URL = baseurl;

export default function JobDetail() {
  const { id } = useParams();
  const containerRef = useRef(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', portfolio: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/careers/${id}`)
      .then(r => setJob(r.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!job) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.jd-title', { y: '106%', skewY: 2 }, { y: '0%', skewY: 0, duration: 1.1, delay: 0.1, ease: 'power4.out' });
      gsap.fromTo('.jd-meta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
      gsap.utils.toArray('.jd-block').forEach((el, i) =>
        gsap.fromTo(el, { y: 32, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.65, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      );
    }, containerRef);
    return () => ctx.revert();
  }, [job]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/careers/${id}/apply`, form);
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please email us directly at hello@secondwave.in");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: `${ACCENT}30`, borderTopColor: ACCENT }} />
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4">
      <h2 className="font-black text-3xl mb-4">Role Not Found</h2>
      <Link to="/careers" className="text-white/40 hover:text-white text-sm flex items-center gap-2 transition-colors">
        <FiArrowLeft size={14} /> Back to Careers
      </Link>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] overflow-x-hidden">
      <section className="relative w-full pt-28 pb-16 px-4 sm:px-6 md:px-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <Link to="/careers" className="inline-flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors mb-10 group">
            <FiArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> All Openings
          </Link>
          <div className="flex flex-wrap gap-2 mb-5">
            {job.department && (
              <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {job.department}
              </span>
            )}
            {job.isNew && (
              <span className="text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${ACCENT}20`, color: ACCENT }}>New</span>
            )}
          </div>
          <div className="overflow-hidden mb-4">
            <h1 className="jd-title font-black text-white uppercase leading-none tracking-tighter" style={{ fontSize: 'clamp(2.4rem, 8vw, 7rem)' }}>
              {job.title}
            </h1>
          </div>
          <div className="jd-meta flex flex-wrap items-center gap-5 mt-4">
            {job.location && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <FiMapPin size={13} style={{ color: ACCENT }} /> {job.location}
              </span>
            )}
            {job.type && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <FiClock size={13} style={{ color: ACCENT }} /> {job.type}
              </span>
            )}
            {job.experience && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <FiBriefcase size={13} style={{ color: ACCENT }} /> {job.experience}
              </span>
            )}
            {job.salary && (
              <span className="font-black text-white/60 text-sm">{job.salary}</span>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          <div className="space-y-8">
            {job.overview && (
              <div className="jd-block">
                <h2 className="font-black text-white uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <span style={{ color: ACCENT }}>01</span> Overview
                </h2>
                <p className="text-white/45 text-sm leading-relaxed">{job.overview}</p>
              </div>
            )}

            {job.responsibilities?.length > 0 && (
              <div className="jd-block rounded-2xl p-6 sm:p-8" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="font-black text-white uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                  <span style={{ color: ACCENT }}>02</span> What You'll Do
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/45 text-sm leading-relaxed">
                      <FiCheck size={14} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements?.length > 0 && (
              <div className="jd-block rounded-2xl p-6 sm:p-8" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="font-black text-white uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                  <span style={{ color: ACCENT }}>03</span> What We're Looking For
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/45 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.niceToHave?.length > 0 && (
              <div className="jd-block">
                <h2 className="font-black text-white uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <span style={{ color: ACCENT }}>04</span> Nice to Have
                </h2>
                <ul className="space-y-2">
                  {job.niceToHave.map((r, i) => (
                    <li key={i} className="text-white/30 text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-white/15 mt-1">+</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.perks?.length > 0 && (
              <div className="jd-block rounded-2xl p-6 sm:p-8" style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}20` }}>
                <h2 className="font-black text-white uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                  <span style={{ color: ACCENT }}>05</span> Perks & Benefits
                </h2>
                <ul className="space-y-3">
                  {job.perks.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/50 text-sm leading-relaxed">
                      <FiCheck size={14} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="jd-block rounded-2xl p-6 sm:p-8" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-black text-white uppercase text-xs tracking-widest mb-6">Apply Now</h2>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${ACCENT}20` }}>
                    <FiCheck size={20} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-black text-white text-sm mb-2">Application Sent!</h3>
                  <p className="text-white/30 text-xs leading-relaxed">We'll review your application and get back to you within 5 business days.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  {[
                    { name: 'name', placeholder: 'Your Name', type: 'text', required: true },
                    { name: 'email', placeholder: 'Email Address', type: 'email', required: true },
                    { name: 'phone', placeholder: 'Phone Number', type: 'tel', required: false },
                    { name: 'portfolio', placeholder: 'Portfolio / LinkedIn URL', type: 'url', required: false },
                  ].map(f => (
                    <input key={f.name} type={f.type} placeholder={f.placeholder} required={f.required}
                      value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-colors"
                      style={{ background: '#1a1a1a', borderColor: 'rgba(255,255,255,0.08)' }}
                      onFocus={e => e.target.style.borderColor = ACCENT}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  ))}
                  <textarea placeholder="Tell us why you're a great fit..." rows={4}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-colors resize-none"
                    style={{ background: '#1a1a1a', borderColor: 'rgba(255,255,255,0.08)' }}
                    onFocus={e => e.target.style.borderColor = ACCENT}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  <button type="submit" disabled={submitting}
                    className="w-full text-white font-black rounded-xl py-3.5 text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
                    style={{ background: ACCENT }}>
                    {submitting ? 'Sending...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>

            <div className="jd-block rounded-2xl p-5" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/20 text-xs leading-relaxed text-center">
                Questions? Email us at{' '}
                <a href="mailto:hello@secondwave.in" style={{ color: ACCENT }}>hello@secondwave.in</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spinA { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}