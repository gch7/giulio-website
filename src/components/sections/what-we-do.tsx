'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BarChart3, Users, Building2, Network, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: BarChart3,
    title: 'Market Intelligence',
    description: 'Data-driven market analysis, research reports, and actionable insights for informed investment decisions.',
    href: '/solutions/strategy-insights',
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    title: 'Discord Memberships',
    description: 'Real-time trade alerts, market discussions, and exclusive community access with tiered membership options.',
    href: '/memberships',
  },
  {
    icon: Users,
    title: 'Consulting',
    description: 'Personalized portfolio reviews, strategy design, and risk framework development from experienced analysts.',
    href: '/consulting',
  },
  {
    icon: Building2,
    title: 'Real Estate Advisory',
    description: 'Strategic guidance for real estate investments, market analysis, and portfolio diversification.',
    href: '/solutions/real-estate',
  },
  {
    icon: Network,
    title: 'Strategic Network',
    description: 'Access to exclusive deal flow, institutional connections, and curated investment opportunities.',
    href: '/solutions/network',
  },
];

export default function WhatWeDo() {
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
          stagger: 0.1,
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

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 px-6 md:px-12 border-t border-[#e4e4e7]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-[#52525b] bg-[#0a0a0b]/5 border-[#0a0a0b]/10 mb-6">
            Our Solutions
          </span>
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.15] text-[#0a0a0b] mb-4">
            What We Do
          </h2>
          <p className="text-[17px] text-[#71717a] max-w-2xl mx-auto">
            Comprehensive investment solutions designed to give you an edge in today&apos;s complex markets.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="group relative border border-[#e4e4e7] rounded-xl p-7 bg-[#fafafa] hover:bg-white hover:border-[#0a0a0b]/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-11 h-11 bg-white border border-[#e4e4e7] rounded-lg flex items-center justify-center mb-5 group-hover:border-[#0d9488]/30 transition-colors">
                  <div className="text-[#0d9488]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-[17px] font-semibold text-[#0a0a0b] mb-2">{service.title}</h3>
                <p className="text-[14px] text-[#71717a] leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center gap-1.5 text-[#0d9488] text-[13px] font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#0a0a0b] border border-[#e4e4e7] px-6 py-3 rounded-lg hover:border-[#0a0a0b]/30 hover:bg-[#f4f4f5] transition-colors"
          >
            View All Solutions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
