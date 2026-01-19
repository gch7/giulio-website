"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Mail, ChevronDown, Send, Loader2, CheckCircle, AlertCircle, Clock, UserCheck, MessageSquare, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { ContactPage, SiteSettings, UIStrings } from '@/types/sanity';

// Icon mapping for CMS-driven icons
const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  Clock,
  MessageSquare,
  ShieldCheck,
};

// Default data removed
const defaultAreaOptions: { value: string; label: string }[] = [];
const defaultExpectations: { icon: string; text: string }[] = [];

interface ContactPageClientProps {
  pageData?: ContactPage | null;
  siteSettings?: SiteSettings | null;
  uiStrings?: UIStrings | null;
}

export default function ContactPageClient({ pageData, siteSettings, uiStrings }: ContactPageClientProps) {
  // Use CMS data (empty string fallbacks - CMS is source of truth)
  const heroTitle = pageData?.heroTitle ?? '';
  const heroDescription = pageData?.heroDescription ?? '';
  const heroHighlight = pageData?.heroHighlight ?? '';
  const introHeading = pageData?.introHeading ?? '';
  const introDescription = pageData?.introDescription ?? '';
  const introEmailLabel = pageData?.introEmailLabel ?? '';
  const introEmail = pageData?.introEmail ?? '';
  const formTitle = pageData?.formTitle ?? '';
  const formSubtitle = pageData?.formSubtitle ?? '';
  const successTitle = pageData?.formSuccessTitle ?? uiStrings?.formSuccessTitle;
  const successMessage = pageData?.formSuccessMessage;
  const errorTitle = pageData?.formErrorTitle ?? uiStrings?.formErrorTitle;
  const errorMessage = pageData?.formErrorMessage ?? '';
  const expectationsHeading = pageData?.expectationsHeading ?? '';
  const disclaimer = pageData?.disclaimer ?? '';

  // Form Labels & Placeholders (CMS cascade: page-specific -> global uiStrings)
  const formNameLabel = pageData?.formNameLabel ?? uiStrings?.formNameLabel ?? '';
  const formNamePlaceholder = pageData?.formNamePlaceholder ?? uiStrings?.formNamePlaceholder ?? '';
  const formEmailLabel = pageData?.formEmailLabel ?? uiStrings?.formEmailLabel ?? '';
  const formEmailPlaceholder = pageData?.formEmailPlaceholder ?? uiStrings?.formEmailPlaceholder ?? '';
  const formCountryLabel = pageData?.formCountryLabel ?? uiStrings?.formCountryLabel ?? '';
  const formCountryPlaceholder = pageData?.formCountryPlaceholder ?? uiStrings?.formCountryPlaceholder ?? '';
  const formInterestLabel = pageData?.formInterestLabel ?? uiStrings?.formInterestLabel ?? '';
  const formInterestPlaceholder = pageData?.formInterestPlaceholder ?? uiStrings?.formInterestPlaceholder ?? '';
  const formMessageLabel = pageData?.formMessageLabel ?? uiStrings?.formMessageLabel ?? '';
  const formMessagePlaceholder = pageData?.formMessagePlaceholder ?? uiStrings?.formMessagePlaceholder ?? '';
  const formButtonText = pageData?.formButtonText ?? uiStrings?.formSubmitButton;
  const formButtonSubmittingText = pageData?.formButtonSubmittingText ?? uiStrings?.formSubmittingText;
  const requiredError = uiStrings?.formRequiredError ?? '';
  const emailError = uiStrings?.formEmailError ?? '';

  const areaOfInterestOptions = [
    { value: '', label: formInterestPlaceholder },
    ...(pageData?.areaOfInterestOptions || [])
  ];

  const expectationItems = pageData?.expectationItems || [];

  // Parse hero title for brand highlighting
  const parseHeroTitle = (title: string) => {
    const parts = title.split(/\{brand\}|\{\/brand\}/);
    if (parts.length === 3) {
      return { before: parts[0], brand: parts[1], after: parts[2] };
    }
    return { before: title, brand: '', after: '' };
  };
  const parsedTitle = parseHeroTitle(heroTitle);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    areaOfInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = requiredError;
    if (!formData.email.trim()) {
      newErrors.email = requiredError;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = emailError;
    }
    if (!formData.country.trim()) newErrors.country = requiredError;
    if (!formData.areaOfInterest) newErrors.areaOfInterest = requiredError;
    if (!formData.message.trim()) newErrors.message = requiredError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLabel = areaOfInterestOptions.find(opt => opt.value === formData.areaOfInterest)?.label || formInterestPlaceholder;

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
      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="w-full bg-[#fafafa] pt-20 pb-10 md:pt-32 md:pb-16 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto text-center">
            <h1 className="hero-animate text-[36px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#111827]">
              {parsedTitle.before}<span className="text-[#2563EB]">{parsedTitle.brand}</span>{parsedTitle.after}
            </h1>
            <p className="hero-animate text-[17px] md:text-[19px] text-[#6B7280] font-normal leading-relaxed max-w-[700px] mx-auto">
              {heroDescription}
              <br /><br />
              <span className="text-[#374151] font-medium">{heroHighlight}</span>
            </p>
          </div>
        </section>

        {/* INTRO SECTION - How We Can Help */}
        <section ref={introRef} className="w-full bg-[#F8F9FB] py-8 md:py-12 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="intro-animate text-[28px] md:text-[32px] font-display font-medium tracking-[-0.02em] leading-[1.2] mb-5 text-[#111827]">
              {introHeading}
            </h2>
            <p className="intro-animate text-[16px] md:text-[17px] text-[#6B7280] font-normal leading-relaxed mb-6 whitespace-pre-line">
              {introDescription}
            </p>
            <div className="intro-animate inline-flex items-center gap-3 px-5 py-3 bg-white border border-[#E5E7EB] rounded-lg">
              <Mail className="w-5 h-5 text-[#2563EB]" />
              <span className="text-[15px] text-[#374151]">{introEmailLabel}</span>
              <a href={`mailto:${introEmail}`} className="text-[15px] text-[#2563EB] font-medium hover:underline">
                {introEmail}
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section ref={formSectionRef} className="w-full bg-[#F8F9FB] py-8 md:py-12 px-6 md:px-12">
          <div className="max-w-[600px] mx-auto">
            <div className="form-card bg-white border border-[#E5E7EB] rounded-xl p-7 md:p-10 shadow-sm">
              <div className="mb-8">
                <h2 className="text-[22px] md:text-[24px] font-display font-semibold text-[#111827] mb-2">{formTitle}</h2>
                <p className="text-[15px] text-[#6B7280]">
                  {formSubtitle}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-[#2563EB]">{successTitle}</p>
                    <p className="text-[13px] text-[#2563EB]/80">{successMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-red-600">{errorTitle}</p>
                    <p className="text-[13px] text-red-500">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Full Name */}
                <div className="form-field">
                  <label htmlFor="name" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    {formNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-4 py-3 border rounded-lg bg-[#F8F9FB] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB]'}`}
                    placeholder={formNamePlaceholder}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div className="form-field">
                  <label htmlFor="email" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    {formEmailLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-4 py-3 border rounded-lg bg-[#F8F9FB] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB]'}`}
                    placeholder={formEmailPlaceholder}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Country of Residence */}
                <div className="form-field">
                  <label htmlFor="country" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    {formCountryLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ ...formData, country: e.target.value });
                      if (errors.country) setErrors({ ...errors, country: '' });
                    }}
                    className={`w-full px-4 py-3 border rounded-lg bg-[#F8F9FB] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all ${errors.country ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB]'}`}
                    placeholder={formCountryPlaceholder}
                  />
                  {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
                </div>

                {/* Area of Interest Dropdown */}
                <div ref={dropdownRef} className="form-field relative">
                  <label className="block text-[13px] font-medium text-[#52525b] mb-2">
                    {formInterestLabel} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 border rounded-lg bg-[#F8F9FB] text-[14px] text-left flex items-center justify-between transition-all ${isDropdownOpen
                      ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30'
                      : errors.areaOfInterest ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                      } ${formData.areaOfInterest ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}
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
                            if (errors.areaOfInterest) setErrors({ ...errors, areaOfInterest: '' });
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-[14px] text-left transition-colors ${formData.areaOfInterest === option.value
                            ? 'bg-[#2563EB]/10 text-[#2563EB]'
                            : 'text-[#6B7280] hover:bg-[#F8F9FB] hover:text-[#111827]'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <input type="hidden" name="areaOfInterest" value={formData.areaOfInterest} />
                  {errors.areaOfInterest && <p className="mt-1 text-xs text-red-500">{errors.areaOfInterest}</p>}
                </div>

                {/* Message */}
                <div className="form-field">
                  <label htmlFor="message" className="block text-[13px] font-medium text-[#52525b] mb-2">
                    {formMessageLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg bg-[#F8F9FB] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all resize-none ${errors.message ? 'border-red-500 bg-red-50' : 'border-[#E5E7EB]'}`}
                    placeholder={formMessagePlaceholder}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.areaOfInterest}
                  className="form-field w-full bg-[#2563EB] text-white py-3.5 rounded-lg text-[15px] font-semibold hover:bg-[#1E3A8A] transition-all mt-2 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {formButtonSubmittingText}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {formButtonText}
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
              {expectationsHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expectationItems.map((item, index) => {
                const IconComponent = iconMap[item.icon ?? ''] ?? UserCheck;
                return (
                  <div
                    key={index}
                    className="expectation-item flex items-start gap-4 p-4 bg-white border border-[#E5E7EB] rounded-lg"
                  >
                    <div className="w-9 h-9 bg-[#2563EB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <p className="text-[15px] text-[#52525b] leading-relaxed pt-1.5">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPLIANCE / DISCLAIMER SECTION */}
        <section className="w-full bg-[#fafafa] py-8 pb-12 md:py-12 md:pb-20 px-6 md:px-12">
          <div className="max-w-[750px] mx-auto text-center">
            <p className="text-[13px] text-[#a1a1aa] leading-relaxed whitespace-pre-line">
              {disclaimer}
            </p>
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
