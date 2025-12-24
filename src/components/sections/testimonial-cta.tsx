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
const defaultData: TestimonialCTASectionData = {
  _key: 'default-cta',
  _type: 'testimonialCTASection',
  badge: 'Get Started',
  titleLine1: 'Built for Investors Who Want',
  titleLine2: 'Structure and Clarity',
  description: 'Whether you are looking for actionable market intelligence, a disciplined community, or strategic advisory support, Gamma Capital is designed to help you operate with confidence in complex markets.',
  primaryCTA: {
    text: 'Join Discord Memberships',
    href: '/memberships',
    variant: 'primary',
  },
  secondaryCTA: {
    text: 'Explore Our Solutions',
    href: '/solutions',
    variant: 'secondary',
  },
};

interface TestimonialCTAProps {
  data?: TestimonialCTASectionData;
}

export default function TestimonialCTA({ data }: TestimonialCTAProps) {
  // Use CMS data or fallback to defaults
  const content = data ?? defaultData;

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
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-[#f4f4f5] to-[#fafafa] py-16 md:py-28 px-6 md:px-12 border-t border-[#e4e4e7]">
      <div className="max-w-[900px] mx-auto text-center">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e4e4e7] rounded-full mb-8 shadow-sm">
          <span className="text-[12px] font-medium text-[#71717a] tracking-wide">{content.badge}</span>
        </div>
        <h2 ref={titleRef} className="text-[32px] md:text-[48px] font-medium tracking-[-0.02em] leading-[1.15] mb-6 text-[#0a0a0b]">
          {content.titleLine1}<br />
          {content.titleLine2 && (
            <span className="bg-clip-text text-transparent italic font-['Playfair_Display'] bg-gradient-to-r from-[#52525b] via-[#0d9488] to-[#14b8a6]">
              {content.titleLine2}
            </span>
          )}
        </h2>
        {content.description && (
          <p ref={paragraphRef} className="text-[16px] md:text-[17px] text-[#71717a] font-normal leading-relaxed max-w-2xl mx-auto mb-12">
            {content.description}
          </p>
        )}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          {content.primaryCTA && (
            <Link
              href={content.primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 bg-[#0d9488] text-white px-8 py-4 rounded-xl text-[15px] font-semibold hover:bg-[#0f766e] transition-colors shadow-lg shadow-[#0d9488]/20"
            >
              {content.primaryCTA.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {content.secondaryCTA && (
            <Link
              href={content.secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0a0a0b] px-8 py-4 rounded-xl text-[15px] font-medium border border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-[#f4f4f5] transition-colors"
            >
              {content.secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}