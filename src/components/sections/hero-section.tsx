'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Threads from '../Threads';
import { Rocket, ArrowRight, BarChart3, Users, ChevronRight, Building2, Network } from 'lucide-react';
import type { HeroSectionData, ServiceCard as ServiceCardType } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for CMS-driven icons
const iconMap = {
  BarChart3: BarChart3,
  Users: Users,
  Building2: Building2,
  Network: Network,
  Rocket: Rocket,
  Discord: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
};

// Default content (fallback when no CMS data)
const defaultData: HeroSectionData = {
  _key: 'default-hero',
  _type: 'heroSection',
  badge: 'Institutional Intelligence',
  titleLine1: 'Market Intelligence for',
  titleLine2: 'Sophisticated Investors',
  description: 'Gamma Capital delivers institutional-grade research, exclusive community access, and personalized consulting to elevate your investment strategy.',
  primaryCTA: {
    text: 'View Memberships',
    href: '/memberships',
    variant: 'primary',
    showArrow: true,
  },
  secondaryCTA: {
    text: 'Book Consultation',
    href: '/consulting',
    variant: 'secondary',
  },
  featureCards: [
    {
      _key: 'card-1',
      icon: 'BarChart3',
      title: 'Strategy Insights',
      description: 'Data-driven market analysis and actionable intelligence for informed decisions.',
      href: '/solutions/strategy-insights',
      linkText: 'Learn more',
    },
    {
      _key: 'card-2',
      icon: 'Discord',
      title: 'Discord Community',
      description: 'Real-time alerts, market discussions, and direct access to our research team.',
      href: '/memberships',
      linkText: 'View plans',
    },
    {
      _key: 'card-3',
      icon: 'Users',
      title: 'Advisory Services',
      description: 'Portfolio review, strategy design, and risk framework development.',
      href: '/consulting',
      linkText: 'Get started',
    },
  ],
  stats: [
    { _key: 'stat-1', value: '500+', label: 'Active Members' },
    { _key: 'stat-2', value: '$2.1B', label: 'AUM Advised' },
    { _key: 'stat-3', value: '12+', label: 'Years Experience' },
    { _key: 'stat-4', value: '94%', label: 'Client Retention' },
  ],
};

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
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    );

    if (titleRef.current) {
      const titles = titleRef.current.querySelectorAll('h1, h2');
      tl.fromTo(
        titles,
        { opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          stagger: 0.15
        },
        "-=0.5"
      );
    }

    tl.fromTo(
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

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');

      gsap.fromTo(
        statItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const numbers = statsRef.current.querySelectorAll('.stat-number');
      numbers.forEach((num) => {
        const text = num.textContent || '';
        const match = text.match(/[\d.]+/);
        if (match) {
          const endValue = parseFloat(match[0]);
          const prefix = text.slice(0, text.indexOf(match[0]));
          const suffix = text.slice(text.indexOf(match[0]) + match[0].length);

          gsap.fromTo(
            { val: 0 },
            { val: endValue },
            {
              val: endValue,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              onUpdate: function () {
                const currentVal = this.targets()[0].val;
                const formatted = endValue % 1 === 0
                  ? Math.round(currentVal).toLocaleString()
                  : currentVal.toFixed(1);
                (num as HTMLElement).textContent = prefix + formatted + suffix;
              }
            }
          );
        }
      });
    }
  }, []);

  // Helper to get icon component
  const getIcon = (iconName?: string) => {
    if (!iconName) return BarChart3;
    return iconMap[iconName as keyof typeof iconMap] || BarChart3;
  };

  return (
    <div className="relative w-full min-h-[1100px]">
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <Threads
          color={[0.4, 0.4, 0.45]}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      <section ref={sectionRef} className="sm:px-6 lg:px-8 md:py-24 w-full max-w-7xl mx-auto pt-16 px-4 pb-20 relative" style={{ zIndex: 1 }}>
        <div style={{ zIndex: 1 }}>
          <div ref={badgeRef} className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#52525b] bg-[#0a0a0b]/5 border-[#0a0a0b]/10">
              <Rocket className="h-3.5 w-3.5 text-[#0d9488]" />
              {content.badge}
            </span>
          </div>

          <div ref={titleRef} className="text-center max-w-3xl mt-6 mx-auto">
            <h1 className="md:text-6xl text-4xl font-semibold text-[#0a0a0b] tracking-tight">{content.titleLine1}</h1>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#0a0a0b] mt-1">
              <span className="bg-clip-text text-transparent italic font-['Playfair_Display'] bg-gradient-to-r from-[#52525b] via-[#0d9488] to-[#14b8a6]">
                {content.titleLine2}
              </span>
            </h2>
            <p ref={paragraphRef} className="mt-6 text-base md:text-lg text-[#52525b] max-w-xl mx-auto">
              {content.description}
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {content.primaryCTA && (
                <div className="relative inline-block group">
                  <button
                    ref={buttonRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={(e) => e.currentTarget.style.setProperty('--o', '1')}
                    onMouseLeave={(e) => e.currentTarget.style.setProperty('--o', '0')}
                    className="btn-glow relative z-10 overflow-hidden transition-transform duration-150 ease-out active:scale-[0.98] text-[#0a0a0b] bg-white/60 border-[#0a0a0b]/20 border rounded-xl py-3.5 px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                  >
                    <Link href={content.primaryCTA.href} className="relative z-10 inline-flex items-center gap-2 font-semibold text-[14px]">
                      {content.primaryCTA.text}
                      {content.primaryCTA.showArrow && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                      )}
                    </Link>
                    <span className="pointer-events-none absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-[#0a0a0b] to-transparent opacity-80 transition-[left,right] duration-500 ease-out group-hover:left-0 group-hover:right-0" />
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
                  className="bg-transparent text-[#0a0a0b] px-7 py-3.5 rounded-xl text-[14px] font-medium border border-[#e4e4e7] hover:border-[#a1a1aa] hover:bg-[#f4f4f5] transition-colors"
                >
                  {content.secondaryCTA.text}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        {content.featureCards && content.featureCards.length > 0 && (
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mt-20">
            {content.featureCards.map((card: ServiceCardType) => {
              const IconComponent = getIcon(card.icon);
              return (
                <Link
                  key={card._key}
                  href={card.href}
                  className="group relative border border-[#0a0a0b]/10 rounded-xl p-7 bg-white/60 backdrop-blur-xl hover:border-[#0a0a0b]/20 hover:bg-white/80 card-hover flex flex-col h-full transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#0a0a0b]/5 border border-[#0a0a0b]/10 rounded-lg flex items-center justify-center mb-5">
                    <div className="text-[#0d9488]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-[18px] font-semibold leading-[1.3] mb-2 tracking-tight text-[#0a0a0b]">
                    {card.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#71717a] mb-5 flex-1">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#0d9488] font-medium text-[13px]">
                    <span>{card.linkText || 'Learn more'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {content.stats && content.stats.length > 0 && (
          <div ref={statsRef} className="mt-20 pt-16 border-t border-[#e4e4e7]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {content.stats.map((stat) => (
                <div key={stat._key} className="text-center stat-item">
                  <div className="text-[32px] md:text-[40px] font-semibold text-[#0a0a0b] tracking-tight stat-number">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-[#a1a1aa] mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}