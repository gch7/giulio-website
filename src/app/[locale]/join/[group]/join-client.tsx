'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';
import {
  translations,
  buildDiscordAuthUrl,
  type SupportedLocale,
  type SupportedGroup,
} from '@/lib/join-config';

interface JoinClientProps {
  locale: SupportedLocale;
  group: SupportedGroup;
}

export default function JoinClient({ locale, group }: JoinClientProps) {
  const t = translations[locale];
  const discordUrl = buildDiscordAuthUrl(locale, group);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.hero-animate');
      tl.fromTo(
        heroElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
      );
    }

    if (stepsRef.current) {
      const stepElements = stepsRef.current.querySelectorAll('.step-item');
      tl.fromTo(
        stepElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      );
    }
  }, []);

  const steps = [
    { icon: Users, title: t.step1Title, description: t.step1Description },
    { icon: Shield, title: t.step2Title, description: t.step2Description },
    { icon: Zap, title: t.step3Title, description: t.step3Description },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#0A1A2F] to-[#111827] flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div ref={heroRef} className="max-w-xl w-full text-center">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 text-[#60A5FA] text-[11px] font-bold uppercase tracking-wider mb-8">
            {t.badge}
          </div>

          {/* Title */}
          <h1 className="hero-animate text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4">
            {t.title}
            <span className="block text-[#2563EB]">{t.titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="hero-animate text-lg text-[#9CA3AF] mb-10 max-w-md mx-auto leading-relaxed">
            {t.description}
          </p>

          {/* CTA Button */}
          <div className="hero-animate">
            <Link
              href={discordUrl}
              className="inline-flex items-center gap-3 bg-[#5865F2] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#4752C4] transition-all shadow-lg shadow-[#5865F2]/20 hover:shadow-xl hover:shadow-[#5865F2]/30"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              {t.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-[13px] text-[#6B7280]">{t.ctaSubtext}</p>
          </div>
        </div>
      </main>

      {/* Steps Section */}
      <section className="py-12 px-6 border-t border-white/10">
        <div ref={stepsRef} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="step-item flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[#2563EB]/20 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-[#60A5FA]" />
                </div>
                <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[14px] text-[#9CA3AF] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
