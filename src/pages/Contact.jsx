// src/pages/Contact.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSend, FiMapPin, FiDollarSign, FiMail, FiTarget, FiArrowRight } from 'react-icons/fi';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [splineError, setSplineError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const onSplineLoad = (spline) => {
    console.log('Spline loaded');
    setSplineError(false);
  };

  const onSplineError = () => {
    setSplineError(true);
    console.warn('Spline scene failed to load');
  };

  useEffect(() => {
    // Kill any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      // Hero animations - matching Services page
      gsap.fromTo('.contact-hero-title span',
        { y: 120, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.1, ease: 'power4.out', stagger: { amount: 0.5 }, delay: 0.2 }
      );

      gsap.fromTo('.contact-hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, delay: 1, ease: 'power3.out' }
      );

      // Form card animation
      gsap.fromTo('.contact-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form fields animation
      gsap.fromTo('.contact-field',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-info-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Process steps animations
      gsap.fromTo('.process-step',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  // Spline scene URL - matching Services page
  const splineSceneUrl = "https://prod.spline.design/6WqtzBLlcF7kYt9W/scene.splinecode";

  return (
    <div ref={sectionRef} className="relative overflow-x-hidden bg-white min-h-screen">
      {/* Spline Background - EXACT same placement as Services page */}
      <div className="absolute inset-0 w-full h-screen opacity-30 pointer-events-none">
        <Spline
        scene="https://prod.spline.design/EGGb-LCYchBVxVDG/scene.splinecode" 
        onLoad={onSplineLoad}
          onError={onSplineError}
        />
      </div>

      {/* Hero Section - matching Services page structure */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-200 rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700">
            <span className="w-2 h-2 rounded-full bg-gray-800 animate-pulse" />
            Get In Touch
            <FiSend className="text-gray-800" />
          </div>
          
          <h1 className="contact-hero-title font-black text-gray-900 mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span className="inline-block">Let's</span>{' '}
            <span className="inline-block text-gray-800">Create</span>
          </h1>
          
          <p className="contact-hero-subtitle text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Share a little about your brand and goals. We'll respond within one business day with next steps.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">CONNECT</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-800 to-transparent" />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="contact-card max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-gray-800 transition-all duration-300 hover:shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {/* Form Fields */}
                <div className="md:col-span-2 space-y-6" ref={formRef}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="contact-field text-left">
                      <label className="block text-xs font-bold tracking-[0.2em] text-gray-700 uppercase mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="contact-field text-left">
                      <label className="block text-xs font-bold tracking-[0.2em] text-gray-700 uppercase mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="contact-field text-left">
                    <label className="block text-xs font-bold tracking-[0.2em] text-gray-700 uppercase mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                      placeholder="Brand or company name"
                    />
                  </div>

                  <div className="contact-field text-left">
                    <label className="block text-xs font-bold tracking-[0.2em] text-gray-700 uppercase mb-2">
                      What do you need help with?
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-300 placeholder:text-gray-400 resize-none"
                      placeholder="Tell us about your project, timelines and success metrics."
                    />
                  </div>

                  <div className="contact-field flex flex-col sm:flex-row gap-4 items-center justify-start">
                    <button
                      onClick={handleSubmit}
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                    >
                      <span>Submit Brief</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-gray-500">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="contact-info space-y-8 text-left">
                  <div className="contact-info-item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800">
                        <FiMail />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 tracking-[0.2em] uppercase">
                        Direct Line
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm pl-13">hello@secondwave.studio</p>
                  </div>

                  <div className="contact-info-item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800">
                        <FiDollarSign />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 tracking-[0.2em] uppercase">
                        Typical Budgets
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm pl-13">Retainers from $4k / month</p>
                    <p className="text-gray-500 text-xs pl-13 mt-1">
                      Project-based work available
                    </p>
                  </div>

                  <div className="contact-info-item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800">
                        <FiMapPin />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 tracking-[0.2em] uppercase">
                        Location
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm pl-13">Dubai, Remote-friendly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - matching Services page */}
      <section className="process-section py-20 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-gray-800 uppercase mb-3">
              Our Process
            </span>
            <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl">
              How We <span className="text-gray-800">Collaborate</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery Call', desc: 'We discuss your goals, challenges, and vision for the project.' },
              { number: '02', title: 'Strategy', desc: 'We develop a tailored strategy based on your specific needs.' },
              { number: '03', title: 'Execution', desc: 'Our team brings the strategy to life with precision and creativity.' },
              { number: '04', title: 'Growth', desc: 'We measure results and optimize for continuous improvement.' }
            ].map((item, index) => (
              <div key={index} className="process-step text-center group">
                <div className="text-5xl font-black text-gray-300 mb-4 group-hover:text-gray-400 transition-colors">
                  {item.number}
                </div>
                <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - matching Services page */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.2) 0%, transparent 50%)'
            }} />
            
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6 backdrop-blur-sm">
                <FiTarget />
                Not Ready to Talk?
              </div>
              
              <h2 className="font-black mb-4 text-white" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                Explore Our Work First
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Take a look at our portfolio to see how we've helped other brands achieve remarkable results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all group"
                >
                  <span>View Portfolio</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-bold hover:bg-white/10 hover:border-white transition-all text-white"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;