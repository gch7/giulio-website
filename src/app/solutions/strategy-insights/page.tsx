'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";

gsap.registerPlugin(ScrollTrigger);

export default function StrategyInsightsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
      { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
      "-=0.4"
    )
    .fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    );

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
              <span className="w-1.5 h-1.5 bg-[#9a7b1a] rounded-full"></span>
              <span className="text-[12px] font-medium text-[#9a7b1a] tracking-wide uppercase">Market Intelligence</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#0a0a0b]">
              Strategy<br />
              <span className="text-[#71717a]">Insights</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#71717a] font-normal leading-relaxed max-w-xl mx-auto">
              Actionable market intelligence and data-driven analysis to help you make informed investment decisions with confidence.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#fafafa] py-12 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "Market Analysis",
                  description: "Deep-dive research into market trends, sector rotations, and macroeconomic factors affecting your investments.",
                },
                {
                  title: "Technical Signals",
                  description: "Chart-based analysis identifying key support, resistance, and momentum shifts across multiple timeframes.",
                },
                {
                  title: "Risk Assessment",
                  description: "Comprehensive risk analysis helping you understand potential downside and optimal position sizing.",
                },
                {
                  title: "Opportunity Spotting",
                  description: "Identification of high-probability setups and emerging opportunities across various asset classes.",
                },
              ].map((item, index) => (
                <div key={index} className="border border-[#e4e4e7] rounded-xl p-7 bg-white card-hover">
                  <div className="w-10 h-10 bg-[#f4f4f5] border border-[#e4e4e7] rounded-lg flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-[#9a7b1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0a0a0b] mb-3">{item.title}</h3>
                  <p className="text-[14px] text-[#71717a] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="w-full bg-[#f4f4f5] py-20 px-6 md:px-12 border-t border-[#e4e4e7]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#0a0a0b] mb-5">Access Our Insights</h2>
            <p className="text-[16px] text-[#71717a] mb-8">
              Get full access to our market intelligence through our Discord membership or consulting services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/memberships" 
                className="bg-[#0a0a0b] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#27272a] transition-colors"
              >
                Join Discord
              </Link>
              <Link 
                href="/consulting" 
                className="bg-transparent text-[#0a0a0b] px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-white transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}