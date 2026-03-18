import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSend, FiMapPin, FiMail, FiPhone, FiArrowRight, FiInstagram, FiLinkedin } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#4F8EF7';

export default function Contact() {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-word', { y: '108%', skewY: 2 }, { y: '0%', skewY: 0, duration: 1.1, stagger: 0.08, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.hero-sub', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.9, ease: 'power3.out' });
      gsap.fromTo('.contact-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.contact-card', start: 'top 82%' } });
      gsap.fromTo('.contact-field', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.contact-form', start: 'top 80%' } });
      gsap.fromTo('.info-item', { x: -25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-info', start: 'top 82%' } });
      gsap.fromTo('.process-card', { y: 45, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.process-grid', start: 'top 80%' } });
    }, pageRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', company: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div ref={pageRef} className="bg-[#0a0a0a] overflow-x-hidden">

      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79,142,247,0.06) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#0a0a0a]" />
        <div className="relative z-10 text-center px-4 pt-24">
          <span className="inline-block text-[10px] tracking-[0.45em] uppercase font-bold mb-5 px-4 py-1.5 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30` }}>Get In Touch</span>
          <div className="overflow-hidden mb-5">
            <h1 className="font-black text-white leading'none tracking-tighter" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
              {"Let's Create".split(' ').map((w, i) => (
                <span key={i} className="hero-word inline-block mr-[0.18em] last:mr-0">{w}</span>
              ))}
            </h1>
          </div>
          <p className="hero-sub text-white/40 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Share a little about your brand and goals. We'll respond within one business day with next steps.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/18 text-[9px] tracking-[0.35em] uppercase">Connect</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="contact-card grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">

            <form onSubmit={handleSubmit} className="contact-form space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="contact-field">
                  <label className="block text-[10px] font-black tracking-[0.25em] text-black/40 uppercase mb-2">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Your full name"
                    className="w-full rounded-xl bg-black/3 border border-black/10 px-4 py-3.5 text-black text-sm focus:outline-none transition-all placeholder-black/25"
                    onFocus={e => e.target.style.borderColor = `${ACCENT}60`}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
                </div>
                <div className="contact-field">
                  <label className="block text-[10px] font-black tracking-[0.25em] text-black/40 uppercase mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="you@company.com"
                    className="w-full rounded-xl bg-black/3 border border-black/10 px-4 py-3.5 text-black text-sm focus:outline-none transition-all placeholder-black/25"
                    onFocus={e => e.target.style.borderColor = `${ACCENT}60`}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
                </div>
              </div>
              <div className="contact-field">
                <label className="block text-[10px] font-black tracking-[0.25em] text-black/40 uppercase mb-2">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange}
                  placeholder="Brand or company name"
                  className="w-full rounded-xl bg-black/3 border border-black/10 px-4 py-3.5 text-black text-sm focus:outline-none transition-all placeholder-black/25"
                  onFocus={e => e.target.style.borderColor = `${ACCENT}60`}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
              </div>
              <div className="contact-field">
                <label className="block text-[10px] font-black tracking-[0.25em] text-black/40 uppercase mb-2">What do you need help with?</label>
                <textarea name="message" rows={5} value={formData.message} onChange={handleChange}
                  placeholder="Tell us about your project, timelines and success metrics."
                  className="w-full rounded-xl bg-black/3 border border-black/10 px-4 py-3.5 text-black text-sm focus:outline-none transition-all resize-none placeholder-black/25"
                  onFocus={e => e.target.style.borderColor = `${ACCENT}60`}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'} />
              </div>
              <div className="contact-field flex items-center gap-4">
                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-2.5 text-white font-black rounded-full px-8 py-4 text-xs tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105 disabled:opacity-60 disabled:scale-100"
                  style={{ background: ACCENT }}>
                  {sending ? 'Sending...' : sent ? 'Sent!' : 'Submit Brief'}
                  <FiSend size={13} />
                </button>
                <p className="text-black/30 text-xs">We'll respond within 24 hours</p>
              </div>
            </form>

            <div className="contact-info space-y-8 pt-2">
              {[
                { Icon: FiMail, label: 'Email Us', val: 'info@secondwave.in', href: 'mailto:info@secondwave.in' },
                { Icon: FiPhone, label: 'Call Us', val: '+91 90725 32221', href: 'tel:+919072532221' },
                { Icon: FiMapPin, label: 'Location', val: 'Kochi, Kerala, India', href: null },
              ].map(({ Icon, label, val, href }, i) => (
                <div key={i} className="info-item flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-black/8" style={{ background: `${ACCENT}12` }}>
                    <Icon size={16} style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.25em] text-black/35 uppercase mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-black font-semibold text-sm hover:underline">{val}</a>
                    ) : (
                      <p className="text-black font-semibold text-sm">{val}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="info-item pt-2 border-t border-black/8">
                <p className="text-[10px] font-black tracking-[0.25em] text-black/35 uppercase mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { Icon: FiInstagram, href: 'https://www.instagram.com/secondwave.ads', label: 'Instagram' },
                    { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  ].map(({ Icon, href, label }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-10 h-10 rounded-xl border border-black/8 flex items-center justify-center text-black/35 hover:text-white hover:border-transparent transition-all"
                      style={{ '--hover-bg': ACCENT }}
                      onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(0,0,0,0.35)'; }}>
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.4em] text-white/22 uppercase font-bold mb-2 block">Our Process</span>
            <h2 className="font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>How We Collaborate</h2>
          </div>
          <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Discovery Call', desc: 'We discuss your goals, challenges, and vision for the project in detail.' },
              { num: '02', title: 'Strategy', desc: 'We develop a tailored strategy based on your specific needs and market.' },
              { num: '03', title: 'Execution', desc: 'Our team brings the strategy to life with precision and creativity.' },
              { num: '04', title: 'Growth', desc: 'We measure results and optimize for continuous improvement and scaling.' },
            ].map((item, i) => (
              <div key={i} className="process-card rounded-2xl p-6 sm:p-7 border border-white/8 hover:border-white/18 transition-all group">
                <div className="font-black text-white/6 leading-none mb-4 select-none" style={{ fontSize: '3.5rem' }}>{item.num}</div>
                <div className="w-7 h-0.5 mb-4 transition-all duration-300 group-hover:w-12" style={{ background: ACCENT }} />
                <h3 className="font-black text-white text-base mb-2">{item.title}</h3>
                <p className="text-white/28 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-black/8 p-10 sm:p-14 text-center" style={{ background: '#0a0a0a' }}>
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block" style={{ color: ACCENT }}>Not Ready Yet?</span>
            <h2 className="font-black text-white uppercase leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
              Explore Our<br />Work First
            </h2>
            <p className="text-white/30 text-sm sm:text-base leading-relaxed max-w-sm mx-auto mb-8">
              See how we've helped brands across Kerala achieve remarkable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/works" className="inline-flex items-center justify-center gap-2.5 text-white font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105 group" style={{ background: ACCENT }}>
                View Portfolio <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2.5 border border-white/15 text-white/55 font-black rounded-full px-8 py-4 text-sm tracking-widest uppercase hover:border-white/30 hover:text-white transition-all">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}