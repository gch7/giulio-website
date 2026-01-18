'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BarChart3, Users, Briefcase, ArrowRight, type LucideIcon } from 'lucide-react';
import type { WhatWeDoSectionData, ServiceCard as ServiceCardType } from '@/types/sanity';

gsap.registerPlugin(ScrollTrigger);

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

// Icon mapping for CMS-driven icons
const iconMap: Record<string, LucideIcon | React.FC<{ className?: string }>> = {
  BarChart3: BarChart3,
  Users: Users,
  Briefcase: Briefcase,
  Discord: DiscordIcon,
};

interface WhatWeDoProps {
  data?: WhatWeDoSectionData;
}

export default function WhatWeDo({ data }: WhatWeDoProps) {
  // Strict CMS mode
  if (!data) return null;

  const content = data;
  const services = content.services || [];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Helper to get icon component
  const getIcon = (iconName?: string) => {
    if (!iconName) return BarChart3;
    return iconMap[iconName] || BarChart3;
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 md:py-24 px-6 md:px-12 border-t border-[#e4e4e7]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#6B7280] bg-[#0A1A2F]/5 border-[#0A1A2F]/10 mb-6">
            {content.badge}
          </span>
          <h2 className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-[1.15] text-[#111827] mb-6">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-[16px] md:text-[17px] text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          )}
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service: ServiceCardType) => {
            const IconComponent = getIcon(service.icon);
            return (
              <Link
                key={service._key}
                href={service.href}
                className="group relative border border-[#E5E7EB] rounded-2xl p-8 bg-gradient-to-b from-[#F8F9FB] to-white hover:border-[#2563EB]/30 hover:shadow-lg hover:shadow-[#2563EB]/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2563EB]/15 transition-colors">
                  <div className="text-[#2563EB]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-[18px] font-display font-semibold text-[#111827] mb-4 leading-tight">{service.title}</h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6 flex-1">{service.description}</p>
                <div className="flex items-center gap-1.5 text-[#2563EB] text-[13px] font-medium">
                  <span>{service.linkText || 'Learn more'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
