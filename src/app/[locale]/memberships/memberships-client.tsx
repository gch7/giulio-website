"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { ArrowRight, Check, ChevronDown, Loader2, Zap, Eye, Users, BookOpen, Target, Sparkles, Clock, Shield, TrendingUp, Bell, MessageSquare, GraduationCap, Award, ChevronRight, type LucideIcon } from 'lucide-react';
import type { MembershipsPage, SiteSettings, UIStrings } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for CMS-driven icons
const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Eye,
  Bell,
  MessageSquare,
  GraduationCap,
  Target,
  Zap,
  Users,
  BookOpen,
  Award,
  Clock,
  Shield,
};

const defaultInsideFeatures = []; // Removed
const defaultKeyBenefits = []; // Removed
const defaultIncludedFeatures = []; // Removed
const defaultEducationalItems = []; // Removed
const defaultAdditionalIncluded = []; // Removed
const defaultPlans = []; // Removed
const defaultAccessSteps = []; // Removed
const defaultFaqs = []; // Removed
const defaultComingSoon = []; // Removed

interface MembershipsPageClientProps {
  pageData?: MembershipsPage | null;
  siteSettings?: SiteSettings | null;
  uiStrings?: UIStrings | null;
}

export default function MembershipsPageClient({ pageData, siteSettings, uiStrings }: MembershipsPageClientProps) {
  // Extract CMS data (empty string fallbacks - CMS is source of truth)
  const heroBadge = pageData?.heroBadge ?? '';
  const heroTitle = pageData?.heroTitle ?? '';
  const heroSubtitle = pageData?.heroSubtitle ?? '';
  const heroDescription = pageData?.heroDescription ?? '';
  const heroPrimaryCta = pageData?.heroPrimaryCta ?? '';
  const heroSecondaryCta = pageData?.heroSecondaryCta ?? '';

  const insideSectionTitle = pageData?.insideSectionTitle ?? '';
  const insideSectionDescription = pageData?.insideSectionDescription ?? '';
  const insideFeatures = pageData?.insideFeatures || [];

  const benefitsSectionTitle = pageData?.benefitsSectionTitle ?? '';
  const keyBenefits = pageData?.keyBenefits || [];

  const includedSectionTitle = pageData?.includedSectionTitle ?? '';
  const includedFeatures = pageData?.includedFeatures || [];
  const educationalMiniCourseTitle = pageData?.educationalMiniCourseTitle ?? '';
  const educationalItems = pageData?.educationalItems || [];
  const additionalIncluded = pageData?.additionalIncluded || [];
  const includedTagline = pageData?.includedTagline ?? '';

  const pricingSectionTitle = pageData?.pricingSectionTitle ?? '';
  const pricingSectionDescription = pageData?.pricingSectionDescription ?? '';
  const plans = pageData?.plans || [];
  const popularBadgeText = pageData?.popularBadgeText ?? '';

  const accessSectionTitle = pageData?.accessSectionTitle ?? '';
  const accessSteps = pageData?.accessSteps || [];
  const accessTagline = pageData?.accessTagline ?? '';

  const faqSectionTitle = pageData?.faqSectionTitle ?? '';
  const faqs = pageData?.faqs || [];

  const comingSoonTitle = pageData?.comingSoonTitle ?? uiStrings?.comingSoonTitle ?? '';
  const comingSoonDescription = pageData?.comingSoonDescription ?? '';
  const comingSoonFeatures = pageData?.comingSoonFeatures || [];
  const comingSoonNote = pageData?.comingSoonNote ?? '';

  const finalCtaTitle = pageData?.finalCtaTitle ?? '';
  const finalCtaDescription = pageData?.finalCtaDescription ?? '';
  const finalCtaButton = pageData?.finalCtaButton ?? '';

  // Checkout state text (CMS cascade: page-specific -> global UI strings)
  const checkoutProcessingText = uiStrings?.checkoutProcessingText ?? uiStrings?.systemLoading ?? '';
  const checkoutErrorText = uiStrings?.checkoutErrorText ?? uiStrings?.systemError ?? '';

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);


  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const insideRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const includedRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const accessRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const comingSoonRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const handleCheckout = async (planId: string) => {
    setIsLoading(planId);
    setCheckoutError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setCheckoutError(checkoutErrorText);
        setIsLoading(null);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(checkoutErrorText);
      setIsLoading(null);
    }
  };

  // Removed misplaced code block

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.25"
      );

    // Inside Discord section
    if (insideRef.current) {
      gsap.fromTo(
        insideRef.current.querySelectorAll('.animate-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: insideRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Benefits section
    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.querySelectorAll('.benefit-card'),
        { opacity: 0, y: 25, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Included section
    if (includedRef.current) {
      gsap.fromTo(
        includedRef.current.querySelectorAll('.animate-item'),
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: includedRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Pricing section
    if (pricingRef.current) {
      gsap.fromTo(
        pricingRef.current.querySelectorAll('.pricing-card'),
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Access steps
    if (accessRef.current) {
      gsap.fromTo(
        accessRef.current.querySelectorAll('.access-step'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: accessRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // FAQ section
    if (faqRef.current) {
      const faqItems = faqRef.current.querySelectorAll('.faq-item');
      gsap.fromTo(
        faqItems,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Coming soon section
    if (comingSoonRef.current) {
      gsap.fromTo(
        comingSoonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: comingSoonRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Final CTA
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 92%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main>
        {/* SECTION 1 - Hero */}
        <section ref={heroRef} className="w-full bg-[#fafafa] py-10 md:py-24 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto text-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-5 md:mb-8">
              <svg className="w-4 h-4 text-[#2563EB]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="text-[12px] font-medium text-[#2563EB] tracking-wide uppercase">{heroBadge}</span>
            </div>
            <h1 ref={titleRef} className="text-[32px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.15] mb-6 text-[#111827]">
              {heroTitle}<br />
              <span className="text-[#6B7280]">{heroSubtitle}</span>
            </h1>
            <p ref={paragraphRef} className="text-[15px] md:text-[18px] text-[#71717a] font-normal leading-relaxed max-w-2xl mx-auto mb-6 md:mb-10">
              {heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={scrollToPricing}
                className="inline-flex items-center justify-center gap-2 bg-[#0A1A2F] text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
              >
                {heroPrimaryCta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="#inside"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#111827] px-7 py-3.5 rounded-xl text-[14px] font-medium border border-[#E5E7EB] hover:border-[#6B7280] hover:bg-[#F8F9FB] transition-colors"
              >
                {heroSecondaryCta}
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2 - What You Will Find Inside */}
        <section id="inside" ref={insideRef} className="w-full bg-white py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12 animate-item">
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0a0a0b] mb-4">
                {insideSectionTitle}
              </h2>
              <p className="text-[16px] text-[#71717a] max-w-2xl mx-auto">
                {insideSectionDescription}
              </p>
            </div>
            <div className="bg-[#F8F9FB] rounded-2xl p-8 border border-[#E5E7EB]">
              <p className="text-[14px] uppercase tracking-wide text-[#374151] font-medium mb-6 animate-item">
                {uiStrings?.insideChannelsLabel ?? ''}
              </p>
              <div className="space-y-4">
                {insideFeatures.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon ?? ''] ?? TrendingUp;
                  return (
                    <div key={index} className="flex items-start gap-4 animate-item">
                      <div className="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <p className="text-[15px] text-[#374151] leading-relaxed pt-2">
                        {feature.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - Key Benefits */}
        <section ref={benefitsRef} className="w-full bg-[#fafafa] py-10 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[36px] font-semibold text-[#111827] mb-4">
                {benefitsSectionTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {keyBenefits.map((benefit, index) => {
                const BenefitIcon = iconMap[benefit.icon ?? ''] ?? Target;
                return (
                  <div key={index} className="benefit-card bg-white rounded-2xl p-5 md:p-6 border border-[#E5E7EB] hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                      <BenefitIcon className="w-5 h-5 md:w-6 md:h-6 text-[#2563EB]" />
                    </div>
                    <h3 className="text-[16px] md:text-[18px] font-semibold text-[#111827] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-[#71717a] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4 - What's Included */}
        <section ref={includedRef} className="w-full bg-white py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#111827] mb-4">
                {includedSectionTitle}
              </h2>
            </div>
            <div className="bg-gradient-to-br from-[#0A1A2F] to-[#111827] rounded-2xl p-8 md:p-10 text-white">
              <div className="space-y-4 mb-8">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 animate-item">
                    <Check className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                    <span className="text-[15px] text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-xl p-6 mb-8 animate-item">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-[14px] font-semibold text-white">{educationalMiniCourseTitle}</span>
                </div>
                <div className="space-y-2 pl-7">
                  {educationalItems.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 animate-item">
                      <ChevronRight className="w-4 h-4 text-[#2563EB]" />
                      <span className="text-[14px] text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {additionalIncluded.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 animate-item">
                    <Check className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                    <span className="text-[15px] text-white/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center animate-item">
                <p className="text-[14px] text-white/60 italic">
                  {includedTagline}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 - Membership Tiers */}
        <section ref={pricingRef} id="pricing" className="w-full bg-[#F8F9FB] py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#111827] mb-4">
                {pricingSectionTitle}
              </h2>
              <p className="text-[16px] text-[#6B7280] max-w-xl mx-auto whitespace-pre-line">
                {pricingSectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`pricing-card relative bg-white rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl ${plan.popular
                    ? 'border-[#2563EB] shadow-lg ring-1 ring-[#2563EB]/20'
                    : 'border-[#E5E7EB] hover:border-[#2563EB]/40'
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#2563EB] text-white text-[11px] font-semibold uppercase tracking-wide rounded-full">
                        <Sparkles className="w-3 h-3" />
                        {popularBadgeText}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-[20px] font-semibold text-[#111827] mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-[42px] font-bold text-[#111827]">{plan.price}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Clock className="w-4 h-4 text-[#2563EB]" />
                      <span className="text-[13px] text-[#2563EB] font-medium">
                        {plan.trial} {uiStrings?.freeTrialSuffix ?? ''}
                      </span>
                    </div>
                  </div>

                  <p className="text-[14px] text-[#6B7280] text-center mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={isLoading === plan.id}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-[14px] font-semibold transition-all duration-200 ${plan.popular
                      ? 'bg-[#2563EB] text-white hover:bg-[#1E3A8A]'
                      : 'bg-[#0A1A2F] text-white hover:bg-[#27272a]'
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isLoading === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {checkoutProcessingText}
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {checkoutError && isLoading === plan.id && (
                    <p className="mt-3 text-[13px] text-red-500 text-center font-medium">
                      {checkoutError}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - How Access Works */}
        <section ref={accessRef} className="w-full bg-white py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#111827] mb-4">
                {accessSectionTitle}
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#2563EB]/50 to-transparent hidden md:block" />

              <div className="space-y-6">
                {accessSteps.map((step, index) => (
                  <div key={index} className="access-step flex gap-6 items-start">
                    <div className="relative z-10 w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2563EB]/20">
                      <span className="text-[16px] font-bold text-white">{step.step}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-[17px] font-semibold text-[#0a0a0b] mb-1">{step.title}</h3>
                      <p className="text-[15px] text-[#71717a]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="inline-flex items-center gap-2 text-[14px] text-[#2563EB] font-medium bg-[#2563EB]/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                {accessTagline}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 - FAQ */}
        <section ref={faqRef} className="w-full bg-[#f4f4f5] py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-semibold text-center mb-10 text-[#111827]">
              {faqSectionTitle}
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item border border-[#E5E7EB] rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F8F9FB] transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-[15px] font-medium text-[#111827] pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-[#2563EB]' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="px-6 pb-5">
                      <p className="text-[14px] text-[#71717a] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 - Coming Soon */}
        <section ref={comingSoonRef} className="w-full bg-[#F8F9FB] py-10 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[800px] mx-auto">
            <div className="bg-gradient-to-br from-[#F8F9FB] to-white rounded-2xl p-6 md:p-10 border border-[#2563EB]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h2 className="text-[22px] md:text-[28px] font-semibold text-[#111827]">
                  {comingSoonTitle}
                </h2>
              </div>

              <p className="text-[14px] md:text-[15px] text-[#6B7280] mb-5 whitespace-pre-line">
                {comingSoonDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {comingSoonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
                    <span className="text-[13px] md:text-[14px] text-[#374151]">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-[13px] md:text-[14px] text-[#2563EB] font-medium">
                {comingSoonNote}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 - Final CTA */}
        <section ref={ctaRef} className="w-full bg-gradient-to-b from-[#F8F9FB] to-[#F3F4F6] py-16 md:py-24 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#111827] mb-5 tracking-tight">
              {finalCtaTitle}
            </h2>
            <p className="text-[17px] text-[#6B7280] mb-10 max-w-xl mx-auto">
              {finalCtaDescription}
            </p>
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center justify-center gap-2 bg-[#0A1A2F] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#1E3A8A] transition-all duration-200 shadow-lg shadow-[#0A1A2F]/10 hover:shadow-xl hover:-translate-y-0.5"
            >
              {finalCtaButton}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
