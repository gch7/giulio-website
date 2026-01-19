'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { BarChart3, Users, Building2, Network, ArrowRight, TrendingUp, Shield, type LucideIcon } from 'lucide-react';
import type { SolutionsPage, SiteSettings, UIStrings } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Users,
  Building2,
  Network,
  TrendingUp,
  Shield,
};

interface SolutionsPageClientProps {
  pageData?: SolutionsPage | null;
  siteSettings?: SiteSettings | null;
  uiStrings?: UIStrings | null;
}

export default function SolutionsPageClient({ pageData, siteSettings, uiStrings }: SolutionsPageClientProps) {
  const heroBadge = pageData?.heroBadge ?? '';
  const heroTitle = pageData?.heroTitle ?? '';
  const heroSubtitle = pageData?.heroSubtitle ?? '';
  const heroDescription = pageData?.heroDescription ?? '';
  const solutions = pageData?.solutions || [];
  const ctaTitle = pageData?.ctaTitle ?? '';
  const ctaDescription = pageData?.ctaDescription ?? '';
  const primaryCtaText = pageData?.primaryCtaText ?? '';
  const primaryCtaLink = uiStrings?.contactRoute ?? '/contact';
  const secondaryCtaText = pageData?.secondaryCtaText ?? '';
  const secondaryCtaLink = uiStrings?.membershipsRoute ?? '/memberships';
  const exploreLabel = uiStrings?.exploreLabel ?? '';
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
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
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
      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main>
        <section ref={heroRef} className="w-full bg-[#fafafa] py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto text-center">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-8">
              <TrendingUp className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[12px] font-medium text-[#2563EB] tracking-wide uppercase">{heroBadge}</span>
            </div>
            <h1 ref={titleRef} className="text-[36px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1.1] mb-6 text-[#111827]">
              {heroTitle.replace(heroSubtitle, '')}
              <span className="text-[#6B7280]">{heroSubtitle}</span>
            </h1>
            <p ref={paragraphRef} className="text-[17px] text-[#6B7280] font-normal leading-relaxed max-w-xl mx-auto">
              {heroDescription}
            </p>
          </div>
        </section>

        <section className="w-full bg-[#fafafa] pb-12 md:pb-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div ref={cardsRef} className="flex flex-col gap-6">
              {solutions.map((solution, index) => {
                const IconComponent = iconMap[solution.icon || ''] || BarChart3;
                const hasLink = !!solution.href;

                const CardContent = (
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${solution.color}15` }}
                      >
                        <div style={{ color: solution.color }}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-[20px] font-semibold text-[#111827] mb-2">{solution.title}</h3>
                      <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">{solution.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(solution.features || []).map((feature, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F9FB] border border-[#E5E7EB] rounded-full text-[12px] text-[#374151]"
                          >
                            <Shield className="w-3 h-3 text-[#2563EB]" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {hasLink && (
                      <div className="flex-shrink-0 lg:self-center">
                        <div className="inline-flex items-center gap-2 text-[#2563EB] font-medium text-[14px] group-hover:gap-3 transition-all">
                          <span>{exploreLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                );

                if (hasLink) {
                  return (
                    <Link
                      key={index}
                      href={solution.href!} // We know it exists because of the check
                      className="group relative border border-[#E5E7EB] rounded-xl p-8 bg-white hover:border-[#2563EB]/30 hover:shadow-md transition-all duration-300"
                    >
                      {CardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={index}
                    className="group relative border border-[#E5E7EB] rounded-xl p-8 bg-white"
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="w-full bg-[#f4f4f5] py-12 md:py-20 px-6 md:px-12 border-t border-[#E5E7EB]">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-medium text-[#111827] mb-5">{ctaTitle}</h2>
            <p className="text-[16px] text-[#6B7280] mb-8">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={primaryCtaLink}
                className="bg-[#0A1A2F] text-white px-7 py-3.5 rounded-md text-[14px] font-semibold hover:bg-[#1E3A8A] transition-colors"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaLink}
                className="bg-transparent text-[#111827] px-7 py-3.5 rounded-md text-[14px] font-medium border border-[#E5E7EB] hover:border-[#6B7280] hover:bg-white transition-colors"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
