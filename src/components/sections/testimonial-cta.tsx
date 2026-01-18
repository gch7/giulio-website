'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import type { TestimonialCTASectionData } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Default content (fallback when no CMS data)


interface TestimonialCTAProps {
  data?: TestimonialCTASectionData;
}

export default function TestimonialCTA({ data }: TestimonialCTAProps) {
  // Strict CMS mode
  if (!data) return null;

  const content = data;

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      defaults: { ease: "power3.out" }
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        "-=0.4"
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-[#F8F9FB] to-white py-16 md:py-28 px-6 md:px-12 border-t border-[#E5E7EB]">
      <div className="max-w-[900px] mx-auto text-center">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full mb-8 shadow-sm">
          <span className="text-[12px] font-medium text-[#6B7280] tracking-wide">{content.badge}</span>
        </div>
        <h2 ref={titleRef} className="text-[32px] md:text-[48px] font-display font-medium tracking-[-0.02em] leading-[1.15] mb-6 text-[#111827]">
          {content.titleLine1}<br />
          {content.titleLine2 && (
            <span className="bg-clip-text text-transparent italic font-display bg-gradient-to-r from-[#111827] via-[#2563EB] to-[#1E3A8A]">
              {content.titleLine2}
            </span>
          )}
        </h2>
        {content.description && (
          <p ref={paragraphRef} className="text-[16px] md:text-[17px] text-[#6B7280] font-normal leading-relaxed max-w-2xl mx-auto mb-12">
            {content.description}
          </p>
        )}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          {content.primaryCTA && (
            <Link
              href={content.primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#1E3A8A] transition-colors shadow-lg shadow-[#2563EB]/20"
            >
              {content.primaryCTA.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {content.secondaryCTA && (
            <Link
              href={content.secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#111827] px-8 py-4 rounded-xl text-[15px] font-medium border border-[#E5E7EB] hover:border-[#6B7280] hover:bg-[#F8F9FB] transition-colors"
            >
              {content.secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}