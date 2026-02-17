// src/pages/Contact.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.contact-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.contact-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    gsap.fromTo(
      '.contact-field',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 40%'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="contact-heading text-4xl md:text-5xl font-bold mb-4">
            Ready to <span className="gradient-text">ride the wave</span>?
          </h1>
          <p className="text-gray-400 text-lg">
            Share a little about your brand and goals. We will respond within one business day with next steps.
          </p>
        </div>

        <div className="contact-card glass-morphism rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="contact-field text-left">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#9FE870]"
                  placeholder="Your full name"
                />
              </div>
              <div className="contact-field text-left">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#9FE870]"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="contact-field text-left">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                Company
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#9FE870]"
                placeholder="Brand or company name"
              />
            </div>

            <div className="contact-field text-left">
              <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                What do you need help with?
              </label>
              <textarea
                rows="4"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#9FE870] resize-none"
                placeholder="Tell us about your project, timelines and success metrics."
              />
            </div>

            <div className="contact-field flex justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full font-semibold text-sm hover:shadow-[0_0_30px_rgba(153,69,255,0.7)] transition-shadow">
                Submit brief
              </button>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-sm font-semibold text-white/80 tracking-[0.2em] uppercase mb-2">
                Direct line
              </h3>
              <p className="text-gray-300 text-sm">hello@secondwave.studio</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/80 tracking-[0.2em] uppercase mb-2">
                Typical budgets
              </h3>
              <p className="text-gray-300 text-sm">Retainers from $4k / month</p>
              <p className="text-gray-500 text-xs mt-1">Project-based work available for launches and sprints.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/80 tracking-[0.2em] uppercase mb-2">
                Location
              </h3>
              <p className="text-gray-300 text-sm">Dubai, Remote-friendly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
