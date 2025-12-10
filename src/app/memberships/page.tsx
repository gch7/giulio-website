"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";

gsap.registerPlugin(ScrollTrigger);

const plans = {
  explorer: {
    name: 'Explorer',
    tagline: 'For those beginning their investment journey.',
    priceMonthly: 49,
    priceAnnual: 470,
    cta: { label: 'Get Started', href: '#join' },
    features: [
      'ACCESS TO GENERAL DISCUSSION CHANNELS',
      'WEEKLY MARKET RECAP SUMMARIES',
      'EDUCATIONAL RESOURCES LIBRARY',
      'COMMUNITY Q&A SESSIONS'
    ]
  },
  analyst: {
    name: 'Analyst',
    tagline: 'For active traders seeking real-time insights.',
    priceMonthly: 149,
    priceAnnual: 1430,
    cta: { label: 'Join Now', href: '#join' },
    features: [
      'EVERYTHING IN EXPLORER',
      'REAL-TIME TRADE ALERTS',
      'DAILY MARKET ANALYSIS',
      'PRIORITY SUPPORT ACCESS',
      'MONTHLY STRATEGY WEBINARS',
      'RISK MANAGEMENT FRAMEWORKS'
    ]
  },
  institutional: {
    name: 'Institutional',
    tagline: 'Comprehensive access for serious investors.',
    priceMonthly: 499,
    priceAnnual: 4790,
    cta: { label: 'Contact Sales', href: '/contact' },
    features: [
      'EVERYTHING IN ANALYST',
      '1-ON-1 MONTHLY STRATEGY CALL',
      'CUSTOM PORTFOLIO ANALYSIS',
      'DIRECT MESSAGING WITH ANALYSTS',
      'EARLY ACCESS TO RESEARCH',
      'EXCLUSIVE INSTITUTIONAL INSIGHTS'
    ]
  }
};

const faqs = [
  {
    question: "What is included in the Discord membership?",
    answer: "Your membership includes access to private Discord channels with real-time market insights, trade alerts, educational content, and direct interaction with our team of analysts.",
  },
  {
    question: "Can I cancel my membership anytime?",
    answer: "Yes, you can cancel your membership at any time. Your access will continue until the end of your current billing period.",
  },
  {
    question: "How do I access the Discord server?",
    answer: "After completing your purchase, you'll receive an email with an exclusive invite link to our private Discord server within 24 hours.",
  },
  {
    question: "Is this financial advice?",
    answer: "No. The information shared in our Discord is for educational purposes only. We do not provide personalized financial advice. Always do your own research and consult with a licensed financial advisor.",
  },
];

type PlanKey = 'explorer' | 'analyst' | 'institutional';
type BillingType = 'monthly' | 'annual';

export default function MembershipsPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanKey>('analyst');
  const [billing, setBilling] = React.useState<BillingType>('monthly');

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const currentPlan = plans[selectedPlan];
  const price = billing === 'monthly' ? currentPlan.priceMonthly : currentPlan.priceAnnual;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9 },
      "-=0.4"
    )
    .fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    );

    gsap.fromTo(
      pricingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    if (faqRef.current) {
      const faqItems = faqRef.current.querySelectorAll('.faq-item');
      gsap.fromTo(
        faqItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <NavigationHeader />
      <main>
        <section ref={heroRef} className="w-full bg-[#fafafa] py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto text-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#9a7b1a]/10 border border-[#9a7b1a]/20 rounded-full mb-8">
              <svg className="w-4 h-4 text-[#9a7b1a]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="text-[12px] font-medium text-[#9a7b1a] tracking-wide uppercase">Discord Community</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Join Our Exclusive<br />
              <span className="text-[#71717a]">Discord Community</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#71717a] font-normal leading-relaxed max-w-xl mx-auto">
              Get real-time market insights, trade alerts, and connect with a community of sophisticated investors.
            </p>
          </div>
        </section>

        <section ref={pricingRef} className="w-full px-4 sm:px-6 lg:px-8 py-16 relative z-10" id="pricing">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-[#0a0a0b]/10 bg-white backdrop-blur shadow-sm">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0a0a0b]/5 blur-3xl"></div>
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#0a0a0b]/[0.03] blur-3xl"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                <div className="flex flex-col p-6 sm:p-10">
                  <h2 className="text-4xl sm:text-5xl font-semibold text-[#0a0a0b] tracking-tight mt-4">
                    Simple pricing
                    <span className="block">that grows with you</span>
                  </h2>

                  <p className="mt-4 text-base md:text-lg text-[#52525b] max-w-2xl">
                    Pick a plan today and switch anytime. Clear value across Explorer, Analyst, and Institutional.
                  </p>

                  <div className="mt-6">
                    <div className="inline-flex items-center gap-1 rounded-2xl border border-[#0a0a0b]/10 bg-[#0a0a0b]/[0.03] p-1 ring-1 ring-[#0a0a0b]/10">
                      <button 
                        onClick={() => setBilling('monthly')}
                        className={`px-3 py-1.5 text-[11px] rounded-lg uppercase tracking-tight transition ${
                          billing === 'monthly' 
                            ? 'text-[#0a0a0b] ring-1 ring-[#0a0a0b]/20 bg-white shadow-sm' 
                            : 'text-[#52525b] hover:text-[#0a0a0b]'
                        }`}
                      >
                        MONTHLY
                      </button>
                      <button 
                        onClick={() => setBilling('annual')}
                        className={`px-3 py-1.5 text-[11px] rounded-lg uppercase tracking-tight transition ${
                          billing === 'annual' 
                            ? 'text-[#0a0a0b] ring-1 ring-[#0a0a0b]/20 bg-white shadow-sm' 
                            : 'text-[#52525b] hover:text-[#0a0a0b]'
                        }`}
                      >
                        ANNUALLY
                      </button>
                    </div>
                  </div>

                  <div className="mt-10 space-y-3">
                    <button 
                      onClick={() => setSelectedPlan('explorer')}
                      className={`group hover:bg-[#0a0a0b]/[0.04] transition flex text-left bg-gradient-to-br from-[#0a0a0b]/[0.06] to-[#0a0a0b]/0 w-full rounded-2xl p-5 items-center justify-between ${
                        selectedPlan === 'explorer' ? 'bg-[#0a0a0b]/[0.06] ring-1 ring-[#0a0a0b]/20' : ''
                      }`}
                    >
                      <div>
                        <p className="text-[#0a0a0b] text-lg tracking-tight font-semibold">Explorer</p>
                        <p className="text-[12px] tracking-tight text-[#52525b] mt-1 uppercase">Launch fast, learn faster.</p>
                      </div>
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#0a0a0b]/5 ring-1 ring-[#0a0a0b]/10 text-[#52525b] group-hover:bg-[#0a0a0b]/10 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </span>
                    </button>

                    <button 
                      onClick={() => setSelectedPlan('analyst')}
                      className={`group hover:bg-[#0a0a0b]/[0.04] transition flex text-left bg-gradient-to-br from-[#0a0a0b]/[0.06] to-[#0a0a0b]/0 w-full rounded-2xl p-5 items-center justify-between ${
                        selectedPlan === 'analyst' ? 'bg-[#0a0a0b]/[0.06] ring-1 ring-[#0a0a0b]/20' : ''
                      }`}
                    >
                      <div>
                        <p className="text-[#0a0a0b] text-lg tracking-tight font-semibold">Analyst</p>
                        <p className="text-[12px] tracking-tight text-[#52525b] mt-1 uppercase">Grow with confidence.</p>
                      </div>
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#0a0a0b]/5 ring-1 ring-[#0a0a0b]/10 text-[#52525b] group-hover:text-[#0a0a0b] group-hover:bg-[#0a0a0b]/10 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </span>
                    </button>

                    <button 
                      onClick={() => setSelectedPlan('institutional')}
                      className={`group hover:bg-[#0a0a0b]/[0.04] transition flex text-left bg-gradient-to-br from-[#0a0a0b]/[0.06] to-[#0a0a0b]/0 w-full rounded-2xl p-5 items-center justify-between ${
                        selectedPlan === 'institutional' ? 'bg-[#0a0a0b]/[0.06] ring-1 ring-[#0a0a0b]/20' : ''
                      }`}
                    >
                      <div>
                        <p className="text-[#0a0a0b] text-lg tracking-tight font-semibold">Institutional</p>
                        <p className="text-[12px] tracking-tight text-[#52525b] mt-1 uppercase">Tailored for scale &amp; security.</p>
                      </div>
                      <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#0a0a0b]/5 ring-1 ring-[#0a0a0b]/10 text-[#52525b] group-hover:text-[#0a0a0b] group-hover:bg-[#0a0a0b]/10 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div className="mt-auto"></div>
                </div>

                <div className="flex flex-col p-6 sm:p-8 bg-gradient-to-br from-[#0a0a0b]/0 via-[#0a0a0b]/[0.06] to-[#0a0a0b]/0 max-w-xl rounded-2xl m-8 relative shadow-[inset_0_1px_0_rgba(0,0,0,0.02)] gap-6">
                  <div className="pointer-events-none absolute inset-0 opacity-[0.03] rounded-2xl"
                    style={{background: 'radial-gradient(900px 360px at 20% -10%, rgba(0,0,0,0.08) 15%, transparent 60%)'}}
                  ></div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="text-2xl text-[#0a0a0b] font-semibold tracking-tight text-center sm:text-left">{currentPlan.name}</h3>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
                    <div className="flex items-end gap-2 justify-center sm:justify-start">
                      <span className="text-6xl text-[#0a0a0b] tracking-tight">${price.toLocaleString()}</span>
                      <span className="text-[#52525b] mb-2 text-sm">{billing === 'monthly' ? '/month' : '/yr'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[12px] tracking-tight text-[#52525b] uppercase text-center sm:text-left">
                      {currentPlan.tagline.toUpperCase()}
                    </p>
                    {billing === 'annual' && (
                      <span className="inline-flex items-center rounded-full border border-[#9a7b1a]/30 bg-[#9a7b1a]/10 px-2 py-0.5 text-[11px] tracking-tight text-[#9a7b1a]">
                        Save 20%
                      </span>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-[#0a0a0b]/[0.06] to-[#0a0a0b]/0 rounded-2xl p-6 ring-1 ring-[#0a0a0b]/10">
                    <ul className="space-y-3 text-sm text-[#0a0a0b]">
                      {currentPlan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-[#9a7b1a]">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-4 border-t border-[#0a0a0b]/10 text-[12px] text-[#52525b] text-center sm:text-left">
                      Have special requirements? <Link href="/contact" className="underline decoration-[#0a0a0b]/30 hover:decoration-[#0a0a0b]">Talk to sales</Link>.
                    </div>

                    <div className="mt-6">
                      <Link 
                        href={currentPlan.cta.href}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0a0b] text-white hover:bg-[#27272a] h-11 px-5 ring-1 ring-[#0a0a0b]/20 text-sm font-medium transition shadow-sm"
                      >
                        {currentPlan.cta.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={faqRef} className="w-full bg-[#f4f4f5] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[28px] font-semibold text-center mb-10 text-[#0a0a0b]">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item border border-[#e4e4e7] rounded-lg bg-white overflow-hidden">
                  <button
                    className="w-full px-5 py-4 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-[15px] font-medium text-[#0a0a0b] pr-4">{faq.question}</span>
                    <svg 
                      className={`w-4 h-4 text-[#a1a1aa] flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4">
                      <p className="text-[14px] text-[#71717a] leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="w-full bg-[#fafafa] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0a0a0b] mb-5">Ready to Join?</h2>
            <p className="text-[16px] text-[#71717a] mb-8">
              Start your journey with Gamma Capital today and gain access to institutional-grade insights.
            </p>
            <Link href="/contact" className="inline-block bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors">
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}