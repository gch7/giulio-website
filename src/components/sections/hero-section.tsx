'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, TrendingUp, Activity, Shield } from 'lucide-react';
import type { HeroSectionData } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Default content (fallback when no CMS data)
const defaultData: HeroSectionData = {
  _key: 'default-hero',
  _type: 'heroSection',
  badge: 'Institutional Intelligence',
  titleLine1: 'Institutional-Grade Market Intelligence',
  titleLine2: 'and Strategy Design',
  description: 'Gamma Capital helps investors navigate complex markets through structured analysis, options-driven insights, and disciplined strategy frameworks. We combine institutional methodology, real-time market intelligence, and a private Discord community to support better decision-making across market conditions.',
  primaryCTA: {
    text: 'Join Discord Memberships',
    href: '/memberships',
    variant: 'primary',
    showArrow: true,
  },
  secondaryCTA: {
    text: 'Explore Our Solutions',
    href: '/solutions',
    variant: 'secondary',
  },
  featureCards: [],
  stats: [],
};

// Key bullets for the hero section
const keyBullets = [
  {
    icon: TrendingUp,
    text: 'Options flow, volatility dynamics, and institutional market signals',
  },
  {
    icon: Activity,
    text: 'Structured strategy insights across derivatives, yield and risk management',
  },
  {
    icon: Shield,
    text: 'Premium Discord access, education, and professional consulting',
  },
];

interface HeroSectionProps {
  data?: HeroSectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  // Use CMS data or fallback to defaults
  const content = data ?? defaultData;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4 }
    );

    if (titleRef.current) {
      const titles = titleRef.current.querySelectorAll('h1');
      tl.fromTo(
        titles,
        { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.5,
          stagger: 0.08
        },
        "-=0.2"
      );
    }

    tl.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.3"
    );

    if (bulletsRef.current) {
      tl.fromTo(
        bulletsRef.current.children,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 },
        "-=0.2"
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.05 },
        "-=0.15"
      );
    }

    tl.fromTo(
      supportingRef.current,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.25 },
      "-=0.1"
    );
  }, []);

  return (
    <div className="relative w-full">
      <section ref={sectionRef} className="sm:px-6 lg:px-8 w-full max-w-5xl mx-auto pt-8 md:pt-20 px-4 pb-10 md:pb-24 relative">
        <div style={{ zIndex: 1 }}>
          <div ref={badgeRef} className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#52525b] bg-[#0a0a0b]/5 border-[#0a0a0b]/10">
              <Activity className="h-3.5 w-3.5 text-[#0d9488]" />
              {content.badge}
            </span>
          </div>

          <div ref={titleRef} className="text-center max-w-4xl mt-8 mx-auto">
            <h1 className="md:text-5xl lg:text-6xl text-3xl font-semibold text-[#0a0a0b] tracking-tight leading-[1.1]">
              <span className="block">{content.titleLine1}</span>
              <span className="block mt-2 bg-clip-text text-transparent italic font-['Playfair_Display'] bg-gradient-to-r from-[#52525b] via-[#0d9488] to-[#14b8a6]">
                {content.titleLine2}
              </span>
            </h1>
          </div>

          <div ref={paragraphRef} className="text-center max-w-3xl mt-8 mx-auto">
            <p className="text-base md:text-lg text-[#52525b] leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Key Bullets */}
          <div ref={bulletsRef} className="flex flex-col gap-4 mt-10 max-w-2xl mx-auto">
            {keyBullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#0d9488]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <bullet.icon className="w-3.5 h-3.5 text-[#0d9488]" />
                </div>
                <span className="text-[15px] text-[#3f3f46] leading-relaxed">{bullet.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
            {content.primaryCTA && (
              <div className="relative inline-block group">
                <button
                  ref={buttonRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={(e) => e.currentTarget.style.setProperty('--o', '1')}
                  onMouseLeave={(e) => e.currentTarget.style.setProperty('--o', '0')}
                  className="btn-glow relative z-10 overflow-hidden transition-transform duration-150 ease-out active:scale-[0.98] bg-[#0d9488] text-white border-[#0d9488] border rounded-xl py-3.5 px-8 shadow-lg shadow-[#0d9488]/20"
                >
                  <Link href={content.primaryCTA.href} className="relative z-10 inline-flex items-center gap-2 font-semibold text-[14px]">
                    {content.primaryCTA.text}
                    {content.primaryCTA.showArrow && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    )}
                  </Link>
                  <span className="pointer-events-none absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80 transition-[left,right] duration-500 ease-out group-hover:left-0 group-hover:right-0" />
                  <span className="glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
                </button>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-52 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(60% 100% at 50% 50%, rgba(13,148,136,.35), rgba(13,148,136,.18) 35%, transparent 70%)',
                    filter: 'blur(10px) saturate(120%)'
                  }}
                />
              </div>
            )}

            {content.secondaryCTA && (
              <Link
                href={content.secondaryCTA.href}
                className="bg-white text-[#0a0a0b] px-8 py-3.5 rounded-xl text-[14px] font-medium border border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-[#f4f4f5] transition-colors"
              >
                {content.secondaryCTA.text}
              </Link>
            )}
          </div>

          {/* Supporting Line */}
          <p ref={supportingRef} className="text-center text-[13px] text-[#a1a1aa] mt-4 md:mt-6 italic">
            No hype, no noise — just structured, data-driven insight.
          </p>
        </div>
      </section>
    </div>
  );
}