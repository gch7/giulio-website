"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Mail, ChevronDown, Send, Loader2, CheckCircle, AlertCircle, Clock, UserCheck, MessageSquare, ShieldCheck } from 'lucide-react';

const areaOfInterestOptions = [
  { value: '', label: 'Select an area of interest' },
  { value: 'discord-memberships', label: 'Discord Memberships' },
  { value: 'consulting-portfolio-review', label: 'Consulting & Portfolio Review' },
  { value: 'strategy-design', label: 'Strategy Design' },
  { value: 'options-derivatives', label: 'Options & Derivatives' },
  { value: 'structured-products', label: 'Structured Products' },
  { value: 'real-estate-other-assets', label: 'Real Estate & Other Assets' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'partnerships-other', label: 'Partnerships / Other' },
];

const expectationItems = [
  {
    icon: UserCheck,
    text: 'Every request is reviewed personally',
  },
  {
    icon: Clock,
    text: 'We typically respond within 1–2 business days',
  },
  {
    icon: MessageSquare,
    text: 'Not all requests may receive a response',
  },
  {
    icon: ShieldCheck,
    text: 'Consulting engagements are subject to availability and fit',
  },
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    areaOfInterest: '',
    message: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const expectationsRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', country: '', areaOfInterest: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLabel = areaOfInterestOptions.find(opt => opt.value === formData.areaOfInterest)?.label || 'Select an area of interest';

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Hero animation
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.hero-animate');
      tl.fromTo(
        heroElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
      );
    }

    // Intro animation
    if (introRef.current) {
      const introElements = introRef.current.querySelectorAll('.intro-animate');
      tl.fromTo(
        introElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );
    }

    // Form section animation
    if (formSectionRef.current) {
      tl.fromTo(
        formSectionRef.current.querySelector('.form-card'),
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        "-=0.3"
      );

      const formFields = formSectionRef.current.querySelectorAll('.form-field');
      tl.fromTo(
        formFields,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
        "-=0.4"
      );
    }

    // Expectations animation
    if (expectationsRef.current) {
      const expectationItems = expectationsRef.current.querySelectorAll('.expectation-item');
      tl.fromTo(
        expectationItems,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader />
      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="w-full bg-[#fafafa] pt-20 pb-10 md:pt-32 md:pb-16 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto text-center">
            <h1 className="hero-animate text-[36px] md:text-[48px] lg:text-[56px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Get in Touch with <span className="text-[#0d9488]">Gamma Capital</span>
            </h1>
            <p className="hero-animate text-[17px] md:text-[19px] text-[#71717a] font-normal leading-relaxed max-w-[700px] mx-auto">
              Whether you are interested in our Discord memberships, consulting services, or a strategic collaboration, you can contact us here.
              <br /><br />
              <span className="text-[#52525b] font-medium">We review every request carefully and respond selectively.</span>
            </p>
          </div>
        </section>

        {/* INTRO SECTION - How We Can Help */}
        <section ref={introRef} className="w-full bg-[#fafafa] py-8 md:py-12 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="intro-animate text-[28px] md:text-[32px] font-medium tracking-[-0.02em] leading-[1.2] mb-5 text-[#0a0a0b]">
              How to Contact Us
            </h2>
            <p className="intro-animate text-[16px] md:text-[17px] text-[#71717a] font-normal leading-relaxed mb-6">
              Gamma Capital works with investors, professionals and partners who value clarity, structure and disciplined decision-making.
              <br /><br />
              Use the form below to reach us regarding memberships, consulting, or other professional inquiries.
            </p>
            <div className="intro-animate inline-flex items-center gap-3 px-5 py-3 bg-white border border-[#e4e4e7] rounded-lg">
              <Mail className="w-5 h-5 text-[#0d9488]" />
              <span className="text-[15px] text-[#52525b]">For general communication:</span>
              <a href="mailto:contact@gammacap.ch" className="text-[15px] text-[#0d9488] font-medium hover:underline">
                contact@gammacap.ch
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section ref={formSectionRef} className="w-full bg-[#fafafa] py-8 md:py-12 px-6 md:px-12">
          <div className="max-w-[600px] mx-auto">
            <div className="form-card bg-white border border-[#e4e4e7] rounded-xl p-7 md:p-10 shadow-sm">
              <div className="mb-8">
                <h2 className="text-[22px] md:text-[24px] font-semibold text-[#0a0a0b] mb-2">Contact Request</h2>
                <p className="text-[15px] text-[#71717a]">
                  Please provide a few details so we can better understand your request and respond appropriately.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0d9488] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-[#0d9488]">Request submitted successfully!</p>
                    <p className="text-[13px] text-[#0d9488]/80">We&apos;ll review your request and get back to you within 1–2 business days.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-red-600">Failed to submit request</p>
                    <p className="text-[13px] text-red-500">Please try again or email us directly at contact@gammacap.ch</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Full Name */}
                <div className="form-field">
                  <label htmlFor="name" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e4e4e7] rounded-lg bg-[#fafafa] text-[14px] text-[#0a0a0b] placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="form-field">
                  <label htmlFor="email" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e4e4e7] rounded-lg bg-[#fafafa] text-[14px] text-[#0a0a0b] placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Country of Residence */}
                <div className="form-field">
                  <label htmlFor="country" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    Country of Residence <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e4e4e7] rounded-lg bg-[#fafafa] text-[14px] text-[#0a0a0b] placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all"
                    placeholder="e.g., Switzerland, United States, etc."
                    required
                  />
                </div>

                {/* Area of Interest Dropdown */}
                <div ref={dropdownRef} className="form-field relative">
                  <label className="block text-[13px] font-medium text-[#52525b] mb-2">
                    Area of Interest <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 border rounded-lg bg-[#fafafa] text-[14px] text-left flex items-center justify-between transition-all ${isDropdownOpen
                      ? 'border-[#0d9488] ring-2 ring-[#0d9488]/30'
                      : 'border-[#e4e4e7] hover:border-[#a1a1aa]'
                      } ${formData.areaOfInterest ? 'text-[#0a0a0b]' : 'text-[#a1a1aa]'}`}
                  >
                    <span>{selectedLabel}</span>
                    <ChevronDown className={`w-4 h-4 text-[#71717a] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 py-1 bg-white border border-[#e4e4e7] rounded-lg shadow-lg overflow-hidden max-h-[280px] overflow-y-auto">
                      {areaOfInterestOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, areaOfInterest: option.value });
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-[14px] text-left transition-colors ${formData.areaOfInterest === option.value
                            ? 'bg-[#0d9488]/10 text-[#0d9488]'
                            : 'text-[#52525b] hover:bg-[#f4f4f5] hover:text-[#0a0a0b]'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <input type="hidden" name="areaOfInterest" value={formData.areaOfInterest} required />
                </div>

                {/* Message */}
                <div className="form-field">
                  <label htmlFor="message" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-[#e4e4e7] rounded-lg bg-[#fafafa] text-[14px] text-[#0a0a0b] placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all resize-none"
                    placeholder="Briefly describe your situation, objectives, or question."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.areaOfInterest}
                  className="form-field w-full bg-[#0d9488] text-white py-3.5 rounded-lg text-[15px] font-semibold hover:bg-[#0f766e] transition-all mt-2 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* EXPECTATIONS SECTION */}
        <section ref={expectationsRef} className="w-full bg-[#fafafa] py-10 md:py-16 px-6 md:px-12">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[24px] md:text-[28px] font-medium tracking-[-0.02em] leading-[1.2] mb-8 text-[#0a0a0b] text-center">
              What to Expect After Contacting Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expectationItems.map((item, index) => (
                <div
                  key={index}
                  className="expectation-item flex items-start gap-4 p-4 bg-white border border-[#e4e4e7] rounded-lg"
                >
                  <div className="w-9 h-9 bg-[#0d9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[#0d9488]" />
                  </div>
                  <p className="text-[15px] text-[#52525b] leading-relaxed pt-1.5">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLIANCE / DISCLAIMER SECTION */}
        <section className="w-full bg-[#fafafa] py-8 pb-12 md:py-12 md:pb-20 px-6 md:px-12">
          <div className="max-w-[750px] mx-auto text-center">
            <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
              Gamma Capital does not provide brokerage services, does not execute trades on behalf of clients, and does not offer legal or tax advice. All information and consulting services are provided for educational and strategic purposes only.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
