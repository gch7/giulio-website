"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";

const subjectOptions = [
  { value: '', label: 'Select a topic' },
  { value: 'memberships', label: 'Discord Memberships' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'general', label: 'General Inquiry' },
];

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const selectedLabel = subjectOptions.find(opt => opt.value === formData.subject)?.label || 'Select a topic';

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      leftColRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.9 }
    )
    .fromTo(
      formRef.current,
      { opacity: 0, x: 50, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9 },
      "-=0.6"
    );

    if (formRef.current) {
      const formFields = formRef.current.querySelectorAll('.form-field');
      tl.fromTo(
        formFields,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.5"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <NavigationHeader />
      <main>
        <section ref={sectionRef} className="w-full bg-[#0a0a0b] py-24 px-6 md:px-12">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div ref={leftColRef}>
                <h1 className="text-[36px] md:text-[44px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-white">
                  Get in <span className="text-[#71717a]">Touch</span>
                </h1>
                <p className="text-[17px] text-[#52525b] font-normal leading-relaxed mb-10">
                  Have questions about our services or want to discuss how we can help you? We&apos;d love to hear from you.
                </p>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1a1a1d] border border-[#27272a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#c9a227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white mb-1">Email</h3>
                      <a href="mailto:contact@gammacapital.com" className="text-[14px] text-[#c9a227] hover:underline">
                        contact@gammacapital.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={formRef} className="bg-[#111113] border border-[#27272a] rounded-xl p-7 md:p-8">
                <h2 className="text-[20px] font-semibold text-white mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="form-field">
                    <label htmlFor="name" className="block text-[13px] font-medium text-[#a1a1aa] mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#27272a] rounded-lg bg-[#0a0a0b] text-[14px] text-white placeholder-[#52525b] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/50 focus:border-[#c9a227]/50 transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="block text-[13px] font-medium text-[#a1a1aa] mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#27272a] rounded-lg bg-[#0a0a0b] text-[14px] text-white placeholder-[#52525b] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/50 focus:border-[#c9a227]/50 transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div ref={dropdownRef} className="form-field relative">
                    <label className="block text-[13px] font-medium text-[#a1a1aa] mb-2">Subject</label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full px-4 py-3 border rounded-lg bg-[#0a0a0b] text-[14px] text-left flex items-center justify-between transition-colors ${
                        isDropdownOpen 
                          ? 'border-[#c9a227]/50 ring-1 ring-[#c9a227]/50' 
                          : 'border-[#27272a] hover:border-[#3f3f46]'
                      } ${formData.subject ? 'text-white' : 'text-[#52525b]'}`}
                    >
                      <span>{selectedLabel}</span>
                      <svg 
                        className={`w-4 h-4 text-[#71717a] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-50 w-full mt-2 py-1 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl shadow-black/40 overflow-hidden">
                        {subjectOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, subject: option.value });
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-[14px] text-left transition-colors ${
                              formData.subject === option.value
                                ? 'bg-[#c9a227]/10 text-[#c9a227]'
                                : 'text-[#a1a1aa] hover:bg-[#27272a] hover:text-white'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <input type="hidden" name="subject" value={formData.subject} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="message" className="block text-[13px] font-medium text-[#a1a1aa] mb-2">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#27272a] rounded-lg bg-[#0a0a0b] text-[14px] text-white placeholder-[#52525b] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/50 focus:border-[#c9a227]/50 transition-colors resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <button type="submit" className="form-field w-full bg-white text-[#0a0a0b] py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#e4e4e7] transition-colors mt-2">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}